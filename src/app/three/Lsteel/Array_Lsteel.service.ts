import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { pvRotateService } from '../libs/pvRotate.service';
import { pvTranlateService } from '../libs/pvTranlate.service';
import { LsteelService } from './pvLsteel.service';

@Injectable({
  providedIn: 'root'
})
export class ArrayLService {

  constructor(private Lsteel: LsteelService,
    private Rotate: pvRotateService,
    private Move: pvTranlateService) { }

  /// <summary>対傾構を横断方向に配置</summary>
  public Array(RA: number, RB: number, Rt: number, LA: number, LB: number, Lt: number,
    TA: number, TB: number, Tt: number, DA: number, DB: number, Dt: number,
    H: number, D: number, s: number, s_in: number, s_out: number, dz: number, tf: number,
    amount_H: number, amount_V: number, interval_H: number, interval_V: number,
    location: number[]): THREE.Group {

    // 対傾構の作成
    const Model = this.Lsteel.add_LSteel(RA, RB, Rt, LA, LB, Lt, TA, TB, Tt, DA, DB, Dt,
      H, D, s, s_in, s_out, dz, tf);
    const Pointlist0_R: number[][] = [];
    const Pointlist0_L: number[][] = [];
    const Pointlist0_T: number[][] = [];
    const Pointlist0_D: number[][] = [];
    const Pointlist_R: number[][] = [];
    const Pointlist_L: number[][] = [];
    const Pointlist_T: number[][] = [];
    const Pointlist_D: number[][] = [];
    
    const L_01 = Math.sqrt(H ** 2.0 + D ** 2.0) - (s_in + s_out);
    let y_R = 0.0;
    const z_R = ((s_in * H) / (L_01 + s_in + s_out)) + dz + tf;
    for (let i = 0; i < amount_H; i++) {
      let x_R = (s_in * D) / (L_01 + s_in + s_out) - (amount_V - 2.0) * interval_V / 2.0;
      for (let j = 0; j < amount_V - 1; j++) {
        const point = [x_R, y_R, z_R];
        Pointlist0_R.push(point);
        x_R += interval_V;
      }
      y_R += interval_H;
    }
    for (let i = 0; i < location.length; i++) {
      let p = location[i] * (amount_V - 1);
      for (let j = 0; j < (amount_V - 1); j++) {
        Pointlist_R.push(Pointlist0_R[p]);
        p += 1.0;
      }
    }

    let y_L = 0.0;
    const z_L = ((s_in * H) / (L_01 + s_in + s_out)) + dz + tf;
    for (let i = 0; i < amount_H; i++) {
      let x_L = -(s_in * D) / (L_01 + s_in + s_out) - (amount_V - 2.0) * interval_V / 2.0;
      for (let j = 0; j < amount_V - 1; j++) {
        const point = [x_L, y_L, z_L];
        Pointlist0_L.push(point);
        x_L += interval_V;
      }
      y_L += interval_H;
    }
    for (let i = 0; i < location.length; i++) {
      let p = location[i] * (amount_V - 1);
      for (let j = 0; j < (amount_V - 1); j++) {
        Pointlist_L.push(Pointlist0_L[p]);
        p += 1.0;
      }
    }

    const L_02 = D * 2.0 - (s * 2.0);
    let y_T = 0.0;
    const z_T = H + dz + tf;
    for (let i = 0; i < amount_H; i++) {
      let x_T = L_02 / 2.0 - (amount_V - 2.0) * interval_V / 2.0;
      for (let j = 0; j < amount_V - 1; j++) {
        const point = [x_T, y_T, z_T];
        Pointlist0_T.push(point);
        x_T += interval_V;
      }
      y_T += interval_H;
    }
    for (let i = 0; i < location.length; i++) {
      let p = location[i] * (amount_V - 1);
      for (let j = 0; j < (amount_V - 1); j++) {
        Pointlist_T.push(Pointlist0_T[p]);
        p += 1.0;
      }
    }

    let y_D = 0.0;
    const z_D = dz + tf;
    for (let i = 0; i < amount_H; i++) {
      let x_D = -(L_02 / 2.0) - (amount_V - 2.0) * interval_V / 2.0;
      for (let j = 0; j < amount_V - 1; j++) {
        const point = [x_D, y_D, z_D];
        Pointlist0_D.push(point);
        x_D += interval_V;
      }
      y_D += interval_H;
    }
    for (let i = 0; i < location.length; i++) {
      let p = location[i] * (amount_V - 1);
      for (let j = 0; j < (amount_V - 1); j++) {
        Pointlist_D.push(Pointlist0_D[p]);
        p += 1.0;
      }
    }


    const Obj = new THREE.Group();
    for (let i = 0; i < (Pointlist_R.length); i++) {
      const Model_L = this.Move.MoveObject(Model[0], Pointlist_L[i]);
      Model_L.name = "Cfl_"+ String(i);
      Obj.add(Model_L);
      const Model_R = this.Move.MoveObject(Model[1], Pointlist_R[i]);
      Model_R.name = "Cfr_"+ String(i);
      Obj.add(Model_R);
      const Model_T = this.Move.MoveObject(Model[2], Pointlist_T[i]);
      Model_T.name = "Cft_"+ String(i);
      Obj.add(Model_T);
      const Model_D = this.Move.MoveObject(Model[3], Pointlist_D[i]);
      Model_D.name = "Cfd_"+ String(i);
      Obj.add(Model_D);
    }

    return Obj
  }

}
