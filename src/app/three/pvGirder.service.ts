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
import { pvTranlateService } from './libs/pvTranlate.service';
import { pvRotateService } from './libs/pvRotate.service';
import { ArrayH3Service_u } from './Hsteel/Array_Hsteel03_u.service';
import { ArrayH3Service_l } from './Hsteel/Array_Hsteel03_l.service';
import { ArrayG1Service} from './Gusset/Array_Gusset01.service';
import { ArrayG2Service} from './Gusset/Array_Gusset02.service';
import { ArrayG3Service} from './Gusset/Array_Gusset03.service';

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
    private AddSlab: AddSlabService,
    private Rotate: pvRotateService,
    private Move: pvTranlateService
  ) {
  }

  public createGirder(plam: any): void {
    this.scene.clear();

    // 起終点座標を取得
    const pCoordinate = plam['coordinate'];
    const BPx = pCoordinate['BPx'];
    const BPy = pCoordinate['BPy'];
    const BPz = pCoordinate['BPz'];
    const EPx = pCoordinate['EPx'];
    const EPy = pCoordinate['EPy'];
    const EPz = pCoordinate['EPz'];

    // スラブのパラメータ
    const pSlab = plam['slab'];
    const b1 = pSlab['b1'];
    const b2 = pSlab['b2'];
    const b3 = pSlab['b3'];
    const i1 = pSlab['i1'];
    const i2 = pSlab['i2'];
    const SH = pSlab['SH'];
    const T1 = pSlab['T1'];
    const T2 = pSlab['T2'];
    const n = pSlab['n'];   // 1:n
    const Ss = pSlab['Ss']; // 端部から主桁中心までの離隔
    const S_B = b1 + b2 + b3 * 2.0;

    // 主桁のパラメータ
    const pBeam = plam['beam'];
    const amount_V = pBeam['amount_V']; // 主桁の本数
    const W = pBeam['W'];
    const D = pBeam['D'];
    const tw = pBeam['tw'];
    const tf = pBeam['tf'];
    const interval_V = (S_B - (2 * Ss)) / (amount_V - 1.0); // 主桁の配置間隔

    // 中間対傾構のパラメータ
    const pMid = plam['mid'];
    const RA = pMid['A'];
    const RB = pMid['B'];
    const Rt = pMid['t'];
    const LA = pMid['A'];
    const LB = pMid['B'];
    const Lt = pMid['t'];
    const TA = pMid['A'];
    const TB = pMid['B'];
    const Tt = pMid['t'];
    const DA = pMid['A'];
    const DB = pMid['B'];
    const Dt = pMid['t'];
    const H = pMid['H'];
    const s = pMid['s']; // 離隔
    const D2 = interval_V / 2.0 - s;
    const s_in = pMid['s_in'];
    const s_out = pMid['s_out'];

    const dz = pMid['dz']; // ウェブから対傾構までの離隔

    // 横構のパラメータ
    const pCross = plam['cross'];
    const W2 = pCross['W2'];
    const D3 = pCross['D3'];
    const tf2 = pCross['tf2'];
    const tw2 = pCross['tw2'];
    const s_edge = pCross['s_edge']; // 端部における主桁からの離隔
    const s_middle = pCross['s_middle'];  // 中間部における主桁からの離隔
    const z = (dz + H + tf) - (W2 + tf2 * 2.0);

    // 荷重分配横桁のパラメータ;
    const pCrossBeam = plam['crossbeam'];
    const W3 = pCrossBeam['W3'];
    const D4 = pCrossBeam['D4'];
    const tf3 = pCrossBeam['tf3'];
    const tw3 = pCrossBeam['tw3'];
    const location2: number[] = pCrossBeam['location2']; // 荷重分配横桁を配置する列番号（起点側から0）
    const s_edge2 = pCrossBeam['s_edge2']; // 端部における主桁からの離隔
    const s_middle2 = pCrossBeam['s_middle2']; // 中間部における主桁からの離隔

    // 端横桁のパラメータ
    const pEndBeam = plam['endbeam'];
    const D5 = pEndBeam['D5'];
    const tf4 = pEndBeam['tf4'];
    const tw4 = pEndBeam['tw4'];
    const W4 = W + tf - dz;
    const s_edge3 = pEndBeam['s_edge3']; // 端部における主桁からの離隔
    const s_middle3 = pEndBeam['s_middle3']; // 中間部における主桁からの離隔

    // ガセットプレート01のパラメータ
    const pGusset01 = plam['gusset01'];
    const GA1 = pGusset01['A'];
    const GB1 = pGusset01['B'];
    const GC1 = pGusset01['C'];
    const GD1 = pGusset01['D'];
    const Gt1 = pGusset01['t'];

    // ガセットプレート02のパラメータ
    const pGusset02 = plam['gusset02'];
    const GA2 = pGusset02['A'];
    const GB2 = pGusset02['B'];
    const GC2 = pGusset02['C'];
    const GD2 = pGusset02['D'];
    const Gt2 = pGusset02['t'];
    const Gdx2 = pGusset02['dx'];

    // ガセットプレート03のパラメータ
    const pGusset03 = plam['gusset03'];
    const GA3 = pGusset03['A'];
    const GB3 = pGusset03['B'];
    const GC3 = pGusset03['C'];
    const GD3 = pGusset03['D'];
    const Gt3 = pGusset03['t'];
    const Gdx3 = pGusset03['dx'];

    // その他配置に関するパラメータ
    const pOthers = plam['others'];
    const s_BP = pOthers['s_BP']; // 始点側端部から端横構までの離隔
    const s_EP = pOthers['s_EP']; // 終点側端部から端横構までの離隔
    const L = pOthers['L']; // 支間長
    const L2 = L + (s_BP + s_EP); // 桁長
    const amount_H = pOthers['amount_H']; // 列数
    const interval_H = L / (amount_H - 1.0);  // 対傾構の配置間隔
    const z2 = tf * 2.0 + W + T1 + T2;
    const y2 = (s_BP + s_EP) / 2.0;
    const column: number[] = new Array(); // 中間対傾構を配置する列番号（起点側から0）
    for (let i = 0; i < amount_H; i++) {
      column.push(i);
    }
    let location = column;
    for (let i = 0; i < location2.length; i++) {
      location = location.filter(item => item !== location2[i]);
    }
    location.shift(); // 先頭の要素を削除
    location.pop();   // 末尾の要素を削除

    const MainGirader = this.ArrayH1.Array(L2, D, W, tf, tw, s_BP, s_EP, amount_V, interval_V);
    const IntermediateSwayBracing = this.ArrayL.Array(RA, RB, Rt, LA, LB, Lt, TA, TB, Tt, DA, DB, Dt, H, D2, s, s_in, s_out, dz, tf, amount_H, amount_V, interval_H, interval_V, location);
    const CrossBeam01_T = this.ArrayH3_u.Array(D3, W2, tf2, tw2, s_edge, s_middle, amount_H, amount_V, interval_H, interval_V, dz, false);
    const CrossBeam01_D = this.ArrayH3_l.Array(D3, W2, tf2, tw2, s_edge, s_middle, amount_H, amount_V, interval_H, interval_V, z, true);
    const CrossBeam02 = this.ArrayH2.Array(D4, W3, tf3, tw3, s_edge2, s_middle2, dz, amount_H, amount_V, interval_H, interval_V, location2);
    const CrossBeam03 = this.ArrayH4.Array(D5, W4, tf4, tw4, s_edge3, s_middle3, dz, L, amount_V, interval_V);
    const Gusset01 = this.ArrayG1.Array(GA1, GB1, GC1, GD1, Gt1, dz, tf, amount_H, amount_V, interval_H, interval_V, location);
    const Gusset02 = this.ArrayG2.Array(GA2, GB2, GC2, GD2, Gt2, dz, Gdx2, tf, amount_H, amount_V, interval_H, interval_V, location);
    const Gusset03 = this.ArrayG3.Array(GA3, GB3, GC3, GD3, Gt3, dz, Gdx2, tf, H, amount_H, amount_V, interval_H, interval_V, location);


    const Slab = this.AddSlab.add_Slab(b1, b2, b3, i1, i2, SH, T1, T2, n, Ss, D, L2, amount_V, interval_V);
    Slab.name = "Slab";

    const Girder_0 = new THREE.Group();
    Girder_0.add(MainGirader, CrossBeam01_T, CrossBeam01_D, IntermediateSwayBracing, CrossBeam02, CrossBeam03, Gusset01, Gusset02, Gusset03);
    const Girder = this.Move.MoveObject(Girder_0, [0.0, y2, -z2]);

    const Model_0 = new THREE.Group();
    Model_0.add(Slab, Girder);

    const Cx = EPx - BPx;
    const Cy = EPy - BPy;
    const Cz = EPz - BPz;
    let thetax = 0.0;
    let thetay = 0.0;
    let thetaz = 0.0;

    if (Cz == 0){
      thetax = 0.0;
    } else {
      thetax = Math.round(this.pv.degrees(Math.atan(Cy / Cz)) * 10) / 10;
    }
    if (Cz == 0){
      thetay = 0.0;
    } else {
      thetay = Math.round(this.pv.degrees(Math.atan(Cx / Cz)) * 10) / 10;
    }
    if (Cz == 0){
      thetaz = 0.0;
    } else {
      thetaz = Math.round(this.pv.degrees(Math.atan(Cx / Cy)) * 10) / 10;
    }

    const Model_T = this.Move.MoveObject(Model_0, [BPx,BPy,BPz]);

    const Model = this.Rotate.rotate(Model_T, [BPx,BPy,BPz], thetax, thetay, thetaz)
    this.scene.add(Model);
    this.scene.render();
  }

  download() {
    const result = this.Exporter.parse(this.scene.scene);
    const blob = new window.Blob([result], { type: "text/plain" });
    FileSaver.saveAs(blob, 'test.obj');
  }


}
