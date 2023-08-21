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
import * as printJS  from "print-js";

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

  // モデルをダウンロードする
  public isLoading = false;

  private Exporter: OBJExporter = new OBJExporter();

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

  // 計算書作成
  public isCalculating = false;

  public calculate() {

    this.isCalculating = true;

    // ヘッダを用意
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'responseType': 'text' 
      })
    };

    const url: string = 'https://girdergenbrpyserver.azurewebsites.net/api/OnDataReady?code=Xw-pAwli2ZPrwi6ivtzOU1MaT6Sdn9ONtGo83DT_yzUTAzFuof2omg==';

    const jsonStr = JSON.stringify(this.model.palam());

    this.http
    .post(url, jsonStr, options)
    .subscribe(
      (response) => {
        printJS({ printable: response.toString(), type: "pdf", base64: true });
        this.isCalculating = false;
      },
      (error) => {
        this.isCalculating = false;
        alert(error.message);
      }
    );

  }

  // ヘルプ
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
    const TFp1 = pDisplay['pv1'];
    const TFp2 = pDisplay['pv2'];
    const TFp3 = pDisplay['pv3'];
    const TFs = pDisplay['slab'];
    const TFb = pDisplay['beam'];
    const TFm = pDisplay['mid'];
    const TFc_u = pDisplay['cross_u'];
    const TFc_l = pDisplay['cross_l'];
    const TFc = pDisplay['crossbeam'];
    const TFe = pDisplay['endbeam'];
    const TFg01 = pDisplay['gusset01'];
    const TFg02 = pDisplay['gusset02'];
    const TFg03 = pDisplay['gusset03'];
    const TFg04 = pDisplay['gusset04'];

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

    let pavName = [];
    if (TFp1 === true){
      const Name = '下層路盤';
      pavName.push(Name);
    }
    if (TFp2 === true){
      const Name = '上層路盤';
      pavName.push(Name);
    }
    if (TFp3 === true){
      const Name = '表層';
      pavName.push(Name);
    }

    let beamInfo = [];
    for (let i = 0; i < beams.length; i++) {
      const Info = "主桁-"+ String(i+1);
      beamInfo.push(Info);
    }
    let beamtype = new Array();
    for (let i = 0; i < beams.length; i++) {
      const Type = "主桁";
      beamtype.push(Type);
    }

    let crossName = new Array();
    if (TFc_l === true){
      for (let i = 0; i < cross01s.length; i++) {
        const Name = "下横構-" + String(i+1);
        crossName.push(Name);
      }
    }
    if (TFc_u === true){
      for (let i = 0; i < cross02s.length; i++) {
        const Name = "上横構-" + String(i+1);
        crossName.push(Name);
      }
    }
    if (TFc_l === true){
      if (TFg04 === true){
        for (let i = 0; i < gusset_04ls.length; i++) {
          const Name = "ガセットプレート下横構-" + String(i+1);
          crossName.push(Name);
        }
      }
    }
    if (TFc_u === true){
      if (TFg04 === true){
        for (let i = 0; i < gusset_04us.length; i++) {
          const Name = "ガセットプレート上横構-" + String(i+1);
          crossName.push(Name);
        }
      }
    }

    let midName = new Array();
    if (TFm === true){
      for (let i = 0; i < mid_Ds.length; i++) {
        const Name = "下弦材-" + String(i+1);
        midName.push(Name);
      }
      for (let i = 0; i < mid_Ts.length; i++) {
        const Name = "上弦材-" + String(i+1);
        midName.push(Name);
      }
      for (let i = 0; i < mid_Ls.length; i++) {
        const Name = "左斜材-" + String(i+1);
        midName.push(Name);
      }
      for (let i = 0; i < mid_Rs.length; i++) {
        const Name = "右斜材-" + String(i+1);
        midName.push(Name);
      }
    }
    if (TFg02 === true){
      for (let i = 0; i < gusset_03s.length; i++) {
        const Name = "ガセットプレート（下弦材）-" + String(i+1);
        midName.push(Name);
      }
    }
    if (TFg03 === true){
      for (let i = 0; i < gusset_02s.length; i++) {
        const Name = "ガセットプレート（上弦材）-" + String(i+1);
        midName.push(Name);
      }
    }
    if (TFg01 === true){
      for (let i = 0; i < gusset_01s.length; i++) {
        const Name = "ガセットプレート（斜材）-" + String(i+1);
        midName.push(Name);
      }
    }

    let crossbeam = '荷重分配横桁';
    if (TFc === true && TFm === false){
      crossbeam = '中間横桁'
    }
    let crossbeamName = new Array();
    if (TFc === true){
      for (let i = 0; i < crossbeams.length; i++) {
        const Name = crossbeam + "-" + String(i+1);
        crossbeamName.push(Name);
      }
    }
    if (TFe === true){
      for (let i = 0; i < endbeams.length; i++) {
        const Name = "端横桁-" + String(i+1);
        crossbeamName.push(Name);
      }
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

        /*
        記入例
        "model": {
          "obj": [models],
          // 階層3の情報
          "Name":'', // オブジェクト分類名
          "Info":'', // 判別情報
          "Type":'', // 種類・形式
          "Standard":"", // 規格・仕様
          // 階層4の情報
          "Name_s":[], // オブジェクト分類名
          "Info_s":[], // 判別情報
          "Standard_s":[], // 規格・仕様
        },
        */

        "pavement": {
          "obj": [pavements],
          // 階層3の情報
          "Name":'舗装', // オブジェクト分類名
          "Info":'車道', // 判別情報（車道・歩道）
          "Type":'', // 種類・形式
          "Standard":"", // 規格・仕様
          // 階層4の情報
          "Name_s":pavName, // オブジェクト名
          "Type_s":pavName, // オブジェクト分類名
          "Info_s":[], // 判別情報
          "Standard_s":[], // 規格・仕様(使用する材料など)
        },

        "slab": {
          "obj": [slabs],
          // 階層3の情報
          "Name":'床版', // オブジェクト分類名
          "Info":'A1/A2', // 判別情報（設置位置）
          "Type":'RC床版', // 種類・形式（例：鋼床版、PC床版、RC床版、合成床版）
          "Standard":"",// 規格・仕様
          // 階層4の情報
          "Name_s":['コンクリート'], // オブジェクト名
          "Type_s":['コンクリート'], // オブジェクト分類名
          "Info_s":[], // 判別情報
          "Standard_s":[], // 規格・仕様（使用する材料など）
        },
        "beam": {
          "obj": [beams],
          // 階層3の情報
          "Name":'主桁', // オブジェクト分類名
          "Info":beamInfo, // 判別情報（主桁番号）
          "Type":[], // 種類・形式
          "Standard":[], // 規格・仕様
          // 階層4の情報
          "Name_s":beamInfo, // オブジェクト名
          "Type_s":beamtype, // オブジェクト分類名
          "Info_s":[], // 判別情報
          "Standard_s":[], // 規格・仕様
        },
        "cross": {
          "obj": [cross01s, cross02s, gusset_04ls, gusset_04us],
          // 階層3の情報
          "Name":'横構', // オブジェクト分類名
          "Info":'A1/A2', // 判別情報
          "Type":'', // 種類・形式
          "Standard":"", // 規格・仕様
          // 階層4の情報
          "Name_s":crossName, // オブジェクト名
          "Type_s":['下横構', '上横構', 'ガセットプレート（下横構）', 'ガセットプレート（上横構）'], // オブジェクト分類名
          "Info_s":[], // 判別情報
          "Standard_s":[], // 規格・仕様
        },
        "mid": {
          "obj": [mid_Ds, mid_Ts, mid_Ls, mid_Rs, gusset_03s, gusset_02s, gusset_01s],
          // 階層3の情報
          "Name":'対傾構', // オブジェクト分類名
          "Info":'A1/A2', // 判別情報
          "Type":'', // 種類・形式
          "Standard":"", // 規格・仕様
          // 階層4の情報
          "Name_s":midName, // オブジェクト名
          "Type_s":['下弦材', '上弦材', '左斜材', '右斜材', 'ガセットプレート（下弦材）', 'ガセットプレート（上弦材）', 'ガセットプレート（斜材）'], // オブジェクト分類名
          "Info_s":[], // 判別情報
          "Standard_s":[], // 規格・仕様
        },
        "crossbeam": {
          "obj": [crossbeams, endbeams],
          // 階層3の情報
          "Name":'横桁', // オブジェクト分類名
          "Info":'A1/A2', // 判別情報
          "Type":'', // 種類・形式
          "Standard":"", // 規格・仕様
          // 階層4の情報
          "Name_s":crossbeamName, // オブジェクト名
          "Type_s":[crossbeam, '端横桁'], // オブジェクト分類名
          "Info_s":[], // 判別情報
          "Standard_s":[], // 規格・仕様
        },
      }
    });
    return result;
  }

}
