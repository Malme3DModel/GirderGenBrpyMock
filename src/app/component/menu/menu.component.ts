import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';
import { SceneService } from 'src/app/three/scene.service';
import { environment } from 'src/environments/environment';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';
import { pvTranlateService } from 'src/app/three/libs/pvTranlate.service';
import { pvRotateService } from 'src/app/three/libs/pvRotate.service';
import { pyVistaService } from 'src/app/three/libs/pyVista.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private http: HttpClient,
    private pv: pyVistaService,
    private scene: SceneService,
    public model: GirderPalamService,
    private girder: pvGirderService,
    private Rotate: pvRotateService,
    private Move: pvTranlateService) { }

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

  public goToLink() {
    window.open(
      "https://fresh-tachometer-148.notion.site/2e5a97e10bb14bfcbece8db66dfe5c66",
      "_blank"
    );
  }

  // ダーバーに送信する用のデータ作成する
  private getPostJson(): string {

    // パラメータを取得
    const palam = this.model.palam();
    const pOthers = palam['others'];
    const pDisplay = palam['display'];
    const Name_P = pOthers['Name_P'];
    const Name_R = pOthers['Name_R'];
    const Class_R = pOthers['Class_R'];
    const Milepost_B = pOthers['Milepost_B'] + 'km';
    const Milepost_E = pOthers['Milepost_E'] + 'km';
    const BP = pOthers['BP'];
    const EP = pOthers['EP'];
    const TFc = pDisplay['crossbeam']
    const TFm = pDisplay['mid']

    // シーンから obj ファイルを生成する
    const slabs = new Array();
    for (let i = 0; i < 1; i++) {
      const slab: any = this.scene.scene.getObjectByName("Slab_"+ String(i));
      if (slab == null){
        break;
      }
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
    const cross01s = new Array();
    for (let i = 0; i < 100; i++) {
      const cross01: any = this.scene.scene.getObjectByName("Ll_"+ String(i));
      if (cross01 == null){
        break;
      }
      let cross01_str: string = this.Exporter.parse(cross01);
      cross01s.push(cross01_str);
    }
    const cross02s = new Array();
    for (let i = 0; i < 100; i++) {
      const cross02: any = this.scene.scene.getObjectByName("Lu_"+ String(i));
      if (cross02 == null){
        break;
      }
      let cross02_str: string = this.Exporter.parse(cross02);
      cross02s.push(cross02_str);
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
    const mid_Ls = new Array();
    for (let i = 0; i < 100; i++) {
      const mid_L: any = this.scene.scene.getObjectByName("Cfl_"+ String(i));
      if (mid_L == null){
        break;
      }
      let mid_L_str: string = this.Exporter.parse(mid_L);
      mid_Ls.push(mid_L_str);
    }
    const mid_Rs = new Array();
    for (let i = 0; i < 100; i++) {
      const mid_R: any = this.scene.scene.getObjectByName("Cfr_"+ String(i));
      if (mid_R == null){
        break;
      }
      let mid_R_str: string = this.Exporter.parse(mid_R);
      mid_Rs.push(mid_R_str);
    }
    const mid_Ts = new Array();
    for (let i = 0; i < 100; i++) {
      const mid_T: any = this.scene.scene.getObjectByName("Cft_"+ String(i));
      if (mid_T == null){
        break;
      }
      let mid_T_str: string = this.Exporter.parse(mid_T);
      mid_Ts.push(mid_T_str);
    }
    const mid_Ds = new Array();
    for (let i = 0; i < 100; i++) {
      const mid_D: any = this.scene.scene.getObjectByName("Cfd_"+ String(i));
      if (mid_D == null){
        break;
      }
      let mid_D_str: string = this.Exporter.parse(mid_D);
      mid_Ds.push(mid_D_str);
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
    const gusset_04us = new Array();
    for (let i = 0; i < 100; i++) {
      const gusset_04u: any = this.scene.scene.getObjectByName("PL4u_"+ String(i));
      if (gusset_04u == null){
        break;
      }
      let gusset04u_str: string = this.Exporter.parse(gusset_04u);
      gusset_04us.push(gusset04u_str);
    }
    const gusset_04ls = new Array();
    for (let i = 0; i < 100; i++) {
      const gusset_04l: any = this.scene.scene.getObjectByName("PL4l_"+ String(i));
      if (gusset_04l == null){
        break;
      }
      let gusset04l_str: string = this.Exporter.parse(gusset_04l);
      gusset_04ls.push(gusset04l_str);
    }
    const pavements = new Array();
    for (let i = 0; i < 100; i++) {
      const pavement: any = this.scene.scene.getObjectByName("Pv_"+ String(i));
      if (pavement == null){
        break;
      }
      let pavement_str: string = this.Exporter.parse(pavement);
      pavements.push(pavement_str);
    }

    let crossbeam = '荷重分配横桁';
    if (TFc === true && TFm === false){
      crossbeam = '中間横桁'
    }

    // 付加情報と一緒に Json形式にまとめる
    const result: string = JSON.stringify({
      "body": {
        "ProjectName": Name_P,
        "RouteName": Name_R,
        "RoadClass": Class_R,
        "Milepost_B": Milepost_B,
        "Milepost_E": Milepost_E,
        "BP": BP,
        "EP": EP,

        "pavement": {
          "obj": [pavements],
          "Name":'舗装',
          "Name_s":['舗装'],
          "Class":'舗装',
          "Info":'',
          "Info_s":[],
          "Type":'車道',
        },

        "slab": {
          "obj": [slabs],
          "Name":'床版',
          "Name_s":['床版'],
          "Class":'床版',
          "Info":'A1/A2',
          "Info_s":[],
          "Type":'RC床版',
        },
        "beam": {
          "obj": [beams],
          "Name":'主桁',
          "Name_s":['主桁'],
          "Class":'主桁',
          "Info":'A1/A2',
          "Type":'',
        },
        "cross": {
          "obj": [cross01s, cross02s, gusset_04us, gusset_04ls],
          "Name":'横構',
          "Name_s":['下横構', '上横構', 'ガセットプレート（上横構）', 'ガセットプレート（下横構）'],
          "Class":'横構',
          "Info":'A1/A2',
          "Type":'',
        },
        "mid": {
          "obj": [mid_Ls, mid_Rs, mid_Ds, mid_Ts, gusset_01s, gusset_02s, gusset_03s],
          "Name":'対傾構',
          "Name_s":['左斜材', '右斜材','下弦材', '上弦材', 'ガセットプレート（斜材）', 'ガセットプレート（上弦材）', 'ガセットプレート（下弦材）'],
          "Class":'対傾構',
          "Info":'A1/A2',
          "Type":'',
        },
        "crossbeam": {
          "obj": [crossbeams, endbeams],
          "Name":'横桁',
          "Name_s":[crossbeam, '端横桁'],
          "Class":'横桁',
          "Info":'A1/A2',
          "Type":'',
        },
      }
    });
    return result;
  }

}
