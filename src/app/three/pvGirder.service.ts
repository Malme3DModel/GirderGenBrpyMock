import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { SceneService } from './scene.service';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter'
import * as FileSaver from "file-saver";
import { pyVistaService } from 'src/app/three/libs/pyVista.service';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { ArrayH1Service } from 'src/app/three/Hsteel/Array_Hsteel01.service';
import { ArrayH2Service } from 'src/app/three/Hsteel/Array_Hsteel02.service';
import { ArrayH3Service } from 'src/app/three/Hsteel/Array_Hsteel03.service';
import { ArrayH4Service } from 'src/app/three/Hsteel/Array_Hsteel04.service';
import { ArrayLService } from './Lsteel/Array_Lsteel.service';
import { AddSlabService } from './Slab/pvSlab.service';
import { AddPavementService } from './Pavement/pvPavement.servis';
import { pvTranlateService } from './libs/pvTranlate.service';
import { pvRotateService } from './libs/pvRotate.service';
import { ArrayH3Service_u } from './Hsteel/Array_Hsteel03_u.service';
import { ArrayH3Service_l } from './Hsteel/Array_Hsteel03_l.service';
import { ArrayG1Service} from './Gusset/Array_Gusset01.service';
import { ArrayG2Service} from './Gusset/Array_Gusset02.service';
import { ArrayG3Service} from './Gusset/Array_Gusset03.service';
import { ArrayG4Service} from './Gusset/Array_Gusset04.service';
import { Vector3 } from 'three';

@Injectable({
  providedIn: 'root'
})
export class pvGirderService {

  private Exporter: OBJExporter = new OBJExporter();

  constructor(private scene: SceneService,
    private pv: pyVistaService,
    private ArrayH1: ArrayH1Service,
    private ArrayH2: ArrayH2Service,
    private ArrayH3_u: ArrayH3Service_u,
    private ArrayH3_l: ArrayH3Service_l,
    private ArrayH4: ArrayH4Service,
    private ArrayL: ArrayLService,
    private ArrayG1: ArrayG1Service,
    private ArrayG2: ArrayG2Service,
    private ArrayG3: ArrayG3Service,
    private ArrayG4: ArrayG4Service,
    private AddSlab: AddSlabService,
    private AddPavement: AddPavementService,
    private Rotate: pvRotateService,
    private Move: pvTranlateService
  ) {
  }

  public createGirder(plam: any): void {
    this.scene.clear();

    // 構成のパラメータ
    const pDisplay = plam['display'];
    const TFp = pDisplay['pavement'];
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

    // 床版のパラメータ
    const pSlab = plam['slab'];
    const b1 = pSlab['b1'];
    const b2 = pSlab['b2'];
    const b3 = pSlab['b3'];
    const i1 = pSlab['i1'] * 0.01;
    const i2 = pSlab['i2'] * 0.01;
    const j1 = pSlab['j1'] * 0.01;
    const j2 = pSlab['j2'] * 0.01;
    const SH = pSlab['SH'];
    const T1 = pSlab['T1'];
    const T2 = pSlab['T2'];
    const n = pSlab['n'];   // 1:n
    const Ss = pSlab['Ss']; // 端部から主桁中心までの離隔
    const S_B = b1 + b2 + b3 * 2.0;

    // 舗装のパラメータ
    const pPavement = plam['pavement'];
    const i3 = pPavement['i1'] * 0.01;
    const i4 = pPavement['i2'] * 0.01;
    const T3 = pPavement['T'];

    // 主桁のパラメータ
    const pBeam = plam['beam'];
    const amount_V = pBeam['amount_V']; // 主桁の本数
    const W = pBeam['W'] * 0.001;
    const D = pBeam['D'] * 0.001;
    const tw = pBeam['tw'] * 0.001;
    const tf = pBeam['tf'] * 0.001;
    const interval_V = (S_B - (2 * Ss)) / (amount_V - 1.0); // 主桁の配置間隔

    // 中間対傾構のパラメータ
    const pMid = plam['mid'];
    const RA = pMid['A'] * 0.001;
    const RB = pMid['B'] * 0.001;
    const Rt = pMid['t'] * 0.001;
    const LA = pMid['A'] * 0.001;
    const LB = pMid['B'] * 0.001;
    const Lt = pMid['t'] * 0.001;
    const TA = pMid['A'] * 0.001;
    const TB = pMid['B'] * 0.001;
    const Tt = pMid['t'] * 0.001;
    const DA = pMid['A'] * 0.001;
    const DB = pMid['B'] * 0.001;
    const Dt = pMid['t'] * 0.001;
    const H = pMid['H'] * 0.001;
    const s = pMid['s'] * 0.001; // 離隔
    const D2 = interval_V / 2.0 - s;
    const s_in = pMid['s_in'] * 0.001;
    const s_out = pMid['s_out'] * 0.001;
    const GA1 = pMid['GA1'] * 0.001;
    const GB1 = pMid['GB1'] * 0.001;
    const GC1 = pMid['GC1'] * 0.001;
    const GD1 = pMid['GD1'] * 0.001;
    const Gt1 = pMid['Gt1'] * 0.001;
    const GA2 = pMid['GA2'] * 0.001;
    const GB2 = pMid['GB2'] * 0.001;
    const GC2 = pMid['GC2'] * 0.001;
    const GD2 = pMid['GD2'] * 0.001;
    const Gt2 = pMid['Gt2'] * 0.001;
    const Gdx2 = pMid['Gdx2'] * 0.001;
    const GA3 = pMid['GA3'] * 0.001;
    const GB3 = pMid['GB3'] * 0.001;
    const GC3 = pMid['GC3'] * 0.001;
    const GD3 = pMid['GD3'] * 0.001;
    const Gt3 = pMid['Gt3'] * 0.001;
    const Gdx3 = pMid['Gdx3'] * 0.001;

    const dz = pMid['dz'] * 0.001; // ウェブから対傾構までの離隔

    // 横構のパラメータ
    const pCross = plam['cross'];
    const W2 = pCross['W2'] * 0.001;
    const D3 = pCross['D3'] * 0.001;
    const tf2 = pCross['tf2'] * 0.001;
    const tw2 = pCross['tw2'] * 0.001;
    const s_edge = pCross['s_edge'] * 0.001; // 端部における主桁からの離隔
    const s_middle = pCross['s_middle'] * 0.001;  // 中間部における主桁からの離隔
    const z = (dz + H + tf) - (W2 + tf2 * 2.0);
    const GA4 = pCross['GA4'] * 0.001;
    const GB4 = pCross['GB4'] * 0.001;
    const GC4 = pCross['GC4'] * 0.001;
    const GD4 = pCross['GD4'] * 0.001;
    const Gt4 = pCross['Gt4'] * 0.001;

    // 荷重分配横桁のパラメータ;
    const pCrossBeam = plam['crossbeam'];
    const W3 = pCrossBeam['W3'] * 0.001;
    const D4 = pCrossBeam['D4'] * 0.001;
    const tf3 = pCrossBeam['tf3'] * 0.001;
    const tw3 = pCrossBeam['tw3'] * 0.001;
    let amount = 0.0;
    if (TFc == true){
      amount = pCrossBeam['location2'];
    }
    const s_edge2 = pCrossBeam['s_edge2'] * 0.001; // 端部における主桁からの離隔
    const s_middle2 = pCrossBeam['s_middle2'] * 0.001; // 中間部における主桁からの離隔

    // 端横桁のパラメータ
    const pEndBeam = plam['endbeam'];
    const D5 = pEndBeam['D5'] * 0.001;
    const tf4 = pEndBeam['tf4'] * 0.001;
    const tw4 = pEndBeam['tw4'] * 0.001;
    const W4 = W + tf - dz;
    const s_edge3 = pEndBeam['s_edge3'] * 0.001; // 端部における主桁からの離隔
    const s_middle3 = pEndBeam['s_middle3'] * 0.001; // 中間部における主桁からの離隔



    // 共通のパラメータ
    const pOthers = plam['others'];
    const BPx = parseFloat(pOthers['BPx']);
    const BPy = parseFloat(pOthers['BPy']);
    const BPz = parseFloat(pOthers['BPz']);
    const EPx = parseFloat(pOthers['EPx']);
    const EPy = parseFloat(pOthers['EPy']);
    const EPz = parseFloat(pOthers['EPz']);
    const L = parseFloat(pOthers['L_01']); // 桁長
    const L2 = parseFloat(pOthers['L_02']); // 支間長
    const s_BP = (L - L2)/2.0; // 始点側端部から端横構までの離隔
    const s_EP = (L - L2)/2.0; // 終点側端部から端横構までの離隔
    const amount_H = parseFloat(pOthers['amount_H']); // 列数
    const interval_H = L2 / (amount_H - 1.0);  // 対傾構の配置間隔
    const z2 = tf * 2.0 + W + (b1 * i1 + T1 + (T2 - (Ss - b3) * j1));
    let z3 = 0.0;
    if (TFp === true){
      z3 += T3;
    }
    const y2 = (s_BP + s_EP) / 2.0;
    const column: number[] = new Array(); // 中間対傾構を配置する列番号（起点側から0）
    for (let i = 0; i < amount_H; i++) {
      column.push(i);
    }
    let location = column;
    let location2 :number[] = new Array();
    let m = (column.length - 1) / (amount + 1);
    for (let i = 0; i < amount; i++) {
      const A = column[Math.trunc(m)+1];
      location2.push(A);
      m += m;
    }
    for (let i = 0; i < location2.length; i++) {
      location = location.filter(item => item !== location2[i]);
    }
    if (TFe === true){
      location.shift(); // 先頭の要素を削除
      location.pop();   // 末尾の要素を削除
    }
    if (TFm === false && TFc === true){
      location2 = column;
      if (TFe === true){
        location2.shift(); // 先頭の要素を削除
        location2.pop();   // 末尾の要素を削除
      }
    }

    let Slab0 = new THREE.Group();
    let Pavement0 = new THREE.Group();
    let MainGirader = new THREE.Group();
    let IntermediateSwayBracing = new THREE.Group();
    let CrossBeam01_U = new THREE.Group();
    let CrossBeam01_L = new THREE.Group();
    let CrossBeam02 = new THREE.Group();
    let CrossBeam03 = new THREE.Group();
    let Gusset01 = new THREE.Group();
    let Gusset02 = new THREE.Group();
    let Gusset03 = new THREE.Group();
    let Gusset04_L = new THREE.Group();
    let Gusset04_U = new THREE.Group();

    if (TFb === true){
      MainGirader = this.ArrayH1.Array(L, D, W, tf, tw, s_BP, s_EP, amount_V, interval_V, j1, j2);
    }
    if (TFm === true){
      IntermediateSwayBracing = this.ArrayL.Array(RA, RB, Rt, LA, LB, Lt, TA, TB, Tt, DA, DB, Dt, H, D2, s, s_in, s_out, dz, tf, amount_H, amount_V, interval_H, interval_V, location);
    }
    if (TFc_u === true){
      CrossBeam01_U = this.ArrayH3_u.Array(D3, W2, tf2, tw2, s_edge, s_middle, amount_H, amount_V, interval_H, interval_V, z, false);
      if (TFg04 === true){
        Gusset04_U = this.ArrayG4.Array_u(GA4, GB4, GC4, GD4, Gt4, z, tw2, amount_H, amount_V, interval_H, interval_V,  false);
      }
    }
    if (TFc_l === true){
      CrossBeam01_L = this.ArrayH3_l.Array(D3, W2, tf2, tw2, s_edge, s_middle, amount_H, amount_V, interval_H, interval_V, dz, true);
      if (TFg04 === true){
        Gusset04_L = this.ArrayG4.Array_l(GA4, GB4, GC4, GD4, Gt4, dz, tw2, amount_H, amount_V, interval_H, interval_V,  true);
      }
    }
    if (TFc === true){
      CrossBeam02 = this.ArrayH2.Array(D4, W3, tf3, tw3, s_edge2, s_middle2, dz, amount_H, amount_V, interval_H, interval_V, location2);
    }
    if (TFe === true){
      CrossBeam03 = this.ArrayH4.Array(D5, W4, tf4, tw4, s_edge3, s_middle3, dz, L2, amount_V, interval_V);
    }
    if (TFg01 === true){
      Gusset01 = this.ArrayG1.Array(GA1, GB1, GC1, GD1, Gt1, dz, tf, amount_H, amount_V, interval_H, interval_V, location);
    }
    if (TFg02 === true){
      Gusset02 = this.ArrayG2.Array(GA2, GB2, GC2, GD2, Gt2, dz, Gdx2, tf, amount_H, amount_V, interval_H, interval_V, location);
    }
    if (TFg03 === true){
      Gusset03 = this.ArrayG3.Array(GA3, GB3, GC3, GD3, Gt3, dz, Gdx3, tf, H, amount_H, amount_V, interval_H, interval_V, location);
    }

    if (TFs === true){
      Slab0 = this.AddSlab.add_Slab(b1, b2, b3, i1, i2, j1, j2, SH, T1, T2, n, Ss, D, L, amount_V, interval_V);
    }
    if (TFp === true){
      Pavement0 = this.AddPavement.createPavement(b1, b2, i1, i2, i3, i4, T3, L);
    }

    const Girder_0 = new THREE.Group();
    Girder_0.add(MainGirader, CrossBeam01_U, CrossBeam01_L, IntermediateSwayBracing, CrossBeam02, CrossBeam03, Gusset01, Gusset02, Gusset03, Gusset04_U, Gusset04_L);
    const Girder = this.Move.MoveObject(Girder_0, [0.0, y2, -z2-T3]);

    const Slab = this.Move.MoveObject(Slab0, [0.0, 0.0, -T3]);
    const Pavement = this.Move.MoveObject(Pavement0, [0.0, 0.0, -T3]);

    const Model0= new THREE.Group();
    Model0.add(Slab, Girder, Pavement);

    const Cx = EPx - BPx;
    const Cy = EPy - BPy;
    const Cz = EPz - BPz;
    let thetax = 0.0;
    let thetaz = 0.0;

    if (Cz == 0){
      thetax = 0.0;
    } else {
      thetax = this.pv.degrees(Math.atan(Cz / Cy)) ;
    }

    if (Cx == 0){
      thetaz = 0.0;
    } else {
      thetaz = this.pv.degrees(Math.atan(Cx / Cy)) ;
    }

    const ModelR = this.Move.MoveObject(Model0, [BPx, BPy, BPz]);
    const Model = this.Rotate.rotate(ModelR, [BPx, BPy, BPz], thetax, 0.0, thetaz);


    const ABPx = BPx + 10;
    const ABPy = BPy - 5;
    const ABPy2 = BPy + 10;
    const ABPz = BPz + 5;

    const CBPx = Math.round(ABPx);
    const CBPx2 = Math.round(BPx);
    const CBPy = Math.round(ABPy);
    const CBPy2 = Math.round(BPy);
    const CBPz = Math.round(ABPz);
    const CBPz2 = Math.round(BPz);

    if (this.Cox == CBPx2 && this.Coy == CBPy2 && this.Coz == CBPz2){
    } else {
      this.scene.camera.position.set(CBPx, CBPy, CBPz);
      this.scene.controls.target.set(CBPx2, CBPy2, CBPz2);
      this.scene.controls.update();
      this.Cox = CBPx2;
      this.Coy = CBPy2;
      this.Coz = CBPz2;
    }

    this.scene.add(Model);
    this.scene.render();
  }

  private Cox: number = 0;
  private Coy: number = 0;
  private Coz: number = 0;

  download() {
    const result = this.Exporter.parse(this.scene.scene);
    const blob = new window.Blob([result], { type: "text/plain" });
    FileSaver.saveAs(blob, 'test.obj');
  }

}

