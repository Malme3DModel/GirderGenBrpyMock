import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { LessStencilFunc, Scene } from 'three';
import { pvRotateService } from '../libs/pvRotate.service';
import { pvTranlateService } from '../libs/pvTranlate.service';
import { HsteelService } from './pvHsteel.service';

@Injectable({
  providedIn: 'root'
})
export class ArrayH2Service {

  constructor(private Hsteel: HsteelService,
    private Rotate: pvRotateService,
    private Move: pvTranlateService) { }


  public Array( D: number, W: number, tf: number, tw: number, s_edge: number, s_middle: number, dz: number,
    amount_H: number, amount_V: number, interval_H: number, interval_V: number,
    location: number[]): THREE.Group {

    // 荷重分配横桁を作成
    const Amount = amount_V - 1.0;
    const L1 = interval_V - (s_edge + s_middle);
    const L2 = interval_V - (s_middle * 2.0);
    const y1 = -L1 / 2.0;
    const y2 = -L2 / 2.0;
    let z = (W / 2.0 + tf);
    const Model_E = this.Hsteel.CreateBeam(L1, D, W, tf, tw, [0.0, y1, z]);
    const Model_M = this.Hsteel.CreateBeam(L2, D, W, tf, tw, [0.0, y2, z]);

    // 荷重分配横桁を回転,移動
    const dx = s_middle - s_edge;
    const RModel_E = this.Rotate.rotate(Model_E, [0.0, 0.0, 0.0], 0.0, 0.0, 90.0);
    const RModel_EL = this.Move.MoveObject(RModel_E, [-dx, 0.0, 0.0]);
    const RModel_ER = this.Move.MoveObject(RModel_E, [dx, 0.0, 0.0]);
    const RModel_M = this.Rotate.rotate(Model_M, [0.0, 0.0, 0.0], 0.0, 0.0, 90.0);

    // 荷重分配横桁を配置
    const x1 = (Amount - 1.0) * interval_V / 2.0;
    let y = 0.0;
    z = dz;
    const Models: THREE.Object3D[] = [];
    for (let i = 0; i < amount_H; i++){
      const Obj_EL = this.Move.MoveObject(RModel_EL, [-x1, y, z]);
      const Obj_ER = this.Move.MoveObject(RModel_ER, [x1, y, z]);

      let x2 = -x1 + interval_V;
      Models.push(Obj_EL);
      Models.push(Obj_ER);
      for (let i = 0; i < Amount - 2; i++) {
        const Obj_M = this.Move.MoveObject(RModel_M, [x2, y, z]);
        Models.push(Obj_M);
        x2 += interval_V;
      }
      y += interval_H;
    }

    const Obj = new THREE.Group();
    let s = 0.0;
    for (let i = 0; i < location.length; i++) {
      let n = location[i] * Amount;
      for (let j = 0; j < Amount; j++) {
        const VModel = Models[n];
        VModel.name = "Cr_"+ String(s);
        Obj.add(VModel);
        n += 1.0;
        s += 1.0;
      }
    }

    return Obj;
  }


}