import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
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
    private scene: SceneService,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

  ngOnInit(): void {
  }

  public open(evt: any) {
    const file = evt.target.files[0];
    evt.target.value = "";
    this.fileToText(file)
      .then((text: string) => {
        const jsonData: {} = JSON.parse(text);
        this.model.set_palam(jsonData);
        this.girder.createGirder(this.model.palam());
      })
      .catch((err: any) => {
        alert(err);
      });
  }

  private fileToText(file: any): any {
    const reader = new FileReader();
    reader.readAsText(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
    });
  }

  // ファイルを保存
  public save(): void {
    const inputJson: string = JSON.stringify(this.model.palam());
    const blob = new window.Blob([inputJson], { type: "text/plain" });
    FileSaver.saveAs(blob, "test.json");
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
      console.log(response);
      // get に成功したら post する
      this.http.post(url, json_str, options)
        .subscribe((response: any) => {

          this.isLoading = false;

          let res: any = response;
          if(Array.isArray(res)){
            res = response[0];
          }
          if(typeof res === 'string'){
              res = JSON.parse(res);
          }


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
    const slabs = new Array();
    for (let i = 0; i < 1; i++) {
      const slab: any = this.scene.scene.getObjectByName("Slab");
      let slab_str: string = this.Exporter.parse(slab);
      slabs.push(slab_str);
    }
    const beams = new Array();
    for (let i = 0; i < 100; i++) {
      const beam: any = this.scene.scene.getObjectByName("Hsteel-01-"+ String(i));
      if (beam == null){
        break;
      }
      let beam_str: string = this.Exporter.parse(beam);
      beams.push(beam_str);
    }
    const crossbeams = new Array();
    for (let i = 0; i < 100; i++) {
      const crossbeam: any = this.scene.scene.getObjectByName("Cr_"+ String(i));
      if (crossbeam == null){
        break;
      }
      let crossbeam_str: string = this.Exporter.parse(crossbeam);
      crossbeams.push(crossbeam_str);
    }
    const mids01 = new Array();
    for (let i = 0; i < 100; i++) {
      const mid01: any = this.scene.scene.getObjectByName("Ll_"+ String(i));
      if (mid01 == null){
        break;
      }
      let mid01_str: string = this.Exporter.parse(mid01);
      mids01.push(mid01_str);
    }
    const mids02 = new Array();
    for (let i = 0; i < 100; i++) {
      const mid02: any = this.scene.scene.getObjectByName("Lu_"+ String(i));
      if (mid02 == null){
        break;
      }
      let mid02_str: string = this.Exporter.parse(mid02);
      mids02.push(mid02_str);
    }
    const endbeams = new Array();
    for (let i = 0; i < 100; i++) {
      const endbeam: any = this.scene.scene.getObjectByName("Cu_"+ String(i));
      if (endbeam == null){
        break;
      }
      let endbeam_str: string = this.Exporter.parse(endbeam);
      endbeams.push(endbeam_str);
    }
    const cross_Ls = new Array();
    for (let i = 0; i < 100; i++) {
      const cross_L: any = this.scene.scene.getObjectByName("Cfl_"+ String(i));
      if (cross_L == null){
        break;
      }
      let cross_L_str: string = this.Exporter.parse(cross_L);
      cross_Ls.push(cross_L_str);
    }
    const cross_Rs = new Array();
    for (let i = 0; i < 100; i++) {
      const cross_R: any = this.scene.scene.getObjectByName("Cfr_"+ String(i));
      if (cross_R == null){
        break;
      }
      let cross_R_str: string = this.Exporter.parse(cross_R);
      cross_Rs.push(cross_R_str);
    }
    const cross_Ts = new Array();
    for (let i = 0; i < 100; i++) {
      const cross_T: any = this.scene.scene.getObjectByName("Cft_"+ String(i));
      if (cross_T == null){
        break;
      }
      let cross_T_str: string = this.Exporter.parse(cross_T);
      cross_Ts.push(cross_T_str);
    }
    const cross_Ds = new Array();
    for (let i = 0; i < 100; i++) {
      const cross_D: any = this.scene.scene.getObjectByName("Cfd_"+ String(i));
      if (cross_D == null){
        break;
      }
      let cross_D_str: string = this.Exporter.parse(cross_D);
      cross_Ds.push(cross_D_str);
    }
    const gusset_01s = new Array();
    for (let i = 0; i < 100; i++) {
      const gusset_01: any = this.scene.scene.getObjectByName("PL1_"+ String(i));
      if (gusset_01 == null){
        break;
      }
      let gusset01_str: string = this.Exporter.parse(gusset_01);
      gusset_01s.push(gusset01_str);
    }
    const gusset_02s = new Array();
    for (let i = 0; i < 100; i++) {
      const gusset_02: any = this.scene.scene.getObjectByName("PL2_"+ String(i));
      if (gusset_02 == null){
        break;
      }
      let gusset02_str: string = this.Exporter.parse(gusset_02);
      gusset_02s.push(gusset02_str);
    }
    const gusset_03s = new Array();
    for (let i = 0; i < 100; i++) {
      const gusset_03: any = this.scene.scene.getObjectByName("PL3_"+ String(i));
      if (gusset_03 == null){
        break;
      }
      let gusset03_str: string = this.Exporter.parse(gusset_03);
      gusset_03s.push(gusset03_str);
    }



    // 付加情報と一緒に Json形式にまとめる
    const result: string = JSON.stringify({
      "body": {
        "ProjectName": "Test01",

        "slab": {
          "obj": slabs
        },
        "beam": {
          "obj": beams
        },
        "mid_l": {
          "obj": mids01
        },
        "mid_u": {
          "obj": mids02
        },
        "cross_L": {
          "obj": cross_Ls
        },
        "cross_R": {
          "obj": cross_Rs
        },
        "cross_T": {
          "obj": cross_Ts
        },
        "cross_D": {
          "obj": cross_Ds
        },
        "crossbeam": {
          "obj": crossbeams
        },
        "endbeam": {
          "obj": endbeams
        },
        "gusset01": {
          "obj": gusset_01s
        },
        "gusset02": {
          "obj": gusset_02s
        },
        "gusset03": {
          "obj": gusset_03s
        }
      }
    });
    return result;
  }

}
