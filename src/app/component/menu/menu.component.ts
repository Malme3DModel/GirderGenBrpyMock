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
    this.http.post(url, json_str, options)
      .subscribe((response: any) => {

        if (!('body' in response)) {
          if ('errorMessage' in response) {
            alert(response.errorMessage);
          } else {
            alert('unknown error');
          }
          return;
        }

        const text: string = response.body;
        // string -> file に変換して読み込ませる
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, 'test.obj');

      },
        (error) => {
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
