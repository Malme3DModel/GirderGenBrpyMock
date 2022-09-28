import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { pvGirderService } from 'src/app/three/pvGirder.service';
import { SceneService } from 'src/app/three/scene.service';
import { environment } from 'src/environments/environment';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private http: HttpClient,
    private scene: SceneService) { }

  ngOnInit(): void {
  }

  public isLoading = false;

  private Exporter: OBJExporter = new OBJExporter();

  // モデルをダウンロードする
  public download() {

    // ヘッダを用意
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    // データを用意
    const json_str = this.getPostJson();
    const url: string = environment.url;

    // サーバーにポストする
    this.isLoading = true;
    this.http.get(url, options).subscribe((response: any) => {
      // AWS Lamdaサーバー休止状態からの起動が遅いんで、get で起こす
      console.log(response[0]);
      // get に成功したら post する
      this.http.post(url, json_str, options)
        .subscribe((response: any) => {

          this.isLoading = false;
          const res = JSON.parse(response[0]);
          if (!('body' in res)) {
            return;
          }

          const text: string = res.body;
          // string -> file に変換して読み込ませる
          const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
          FileSaver.saveAs(blob, 'test.ifc');

        },
          (error) => {
            this.isLoading = false;
            alert(error.message);
          });

    },
    (error) => {
      this.isLoading = false;
      alert(error.message);
    });


  }

  // ダーバーに送信する用のデータ作成する
  private getPostJson(): string {

    // シーンから obj ファイルを生成する
    const obj_str: string = this.Exporter.parse(this.scene.scene);

    // 付加情報と一緒に Json形式にまとめる
    const result: string = JSON.stringify({
      "body": {

        "obj": obj_str,

        "slab": {
          "obj": ""
        },
        "beam": {
          "obj": ""
        },
        "mid": {
          "obj": ""
        },
        "cross": {
          "obj": ""
        },
        "crossbeam": {
          "obj": ""
        },
        "endbeam": {
          "obj": ""
        },
        "others": {
          "obj": ""
        }
      }
    });
    return result;
  }

}
