import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { LsteelService } from '../Lsteel/pvLsteel.service';
import { pvRotateService } from '../libs/pvRotate.service';
import { pvTranlateService } from '../libs/pvTranlate.service';
import { HsteelService } from './pvHsteel.service';
import { pyVistaService } from '../libs/pyVista.service';

@Injectable({
  providedIn: 'root'
})
export class ArrayH3Service_l {

  constructor(private pv: pyVistaService,
    private Hsteel: HsteelService,
    private Rotate: pvRotateService,
    private Move: pvTranlateService) { }

    public Array_V(D: number, W: number, tf: number, tw: number, s_edge: number, s_middle: number,
      amount_H: number, interval_H: number, interval_V: number, dz: number,
      reverse: boolean): THREE.Group {

    const L = Math.sqrt((interval_H / 2.0) ** 2.0 + (interval_V) ** 2.0) - (s_edge + s_middle);
    const y = -L / 2.0;
    const z = W / 2.0 + tf;
    const Model = this.Hsteel.CreateBeam(L, D, W, tf, tw, [0.0, y, z]);
    const x = s_edge - s_middle;
    let y2_L = interval_H / 4.0;
    let y2_R = 3.0 * interval_H / 4.0;
    const Model_L = this.Move.MoveObject(Model, [x, y2_L, dz]);
    const Model_R = this.Move.MoveObject(Model, [x, y2_R, dz]);
    

    let z_rotate = Math.round(this.pv.degrees(Math.atan(interval_V / (interval_H / 2.0))) * 10) / 10;
    if (reverse == true) {
      z_rotate *= 1.0;
    } else {
      z_rotate *= -1.0;
    }
    const Model_LM = this.Rotate.rotate(Model_L, [0.0, y2_L, dz], 0.0, 0.0, -z_rotate);
    const Model_RM = this.Rotate.rotate(Model_R, [0.0, y2_R, dz], 0.0, 0.0, z_rotate);
    const Models: THREE.Object3D[] = [];
    Models.push(Model_LM);
    Models.push(Model_RM);

  /// <summary>縦断方向に配置</summary>

    const Obj_0 = new THREE.Group();
    let n = 0;
    if (reverse == true) {
      n += (amount_H - 1) * 2;
    }
    for (let i = 0; i < amount_H - 1; i++) {
      const Models_ML : any = this.Move.MoveObject(Models[0], [x, y2_L, dz]);
      Models_ML.name = "Ll_" + String(n);
      Obj_0.add(Models_ML);
      const Models_MR : any = this.Move.MoveObject(Models[1], [x, y2_R, dz]);
      Obj_0.add(Models_MR);
      Models_MR.name = "Ll_" + String(n+1);
      y2_L += interval_H;
      y2_R += interval_H;
      n += 2
    }
    return Obj_0;
  }

  /// <summary>水平方向に配置</summary>
  public Array(D: number, W: number, tf: number, tw: number, s_edge: number,
    s_middle: number, amount_H: number, amount_V: number, interval_H: number,
    interval_V: number, dz: number, reverse: boolean): THREE.Group {

    const Obj_L = this.Array_V(D, W, tf, tw, s_edge, s_middle, amount_H, interval_H, interval_V, dz, false);
    const Obj_R = this.Array_V(D, W, tf, tw, s_edge, s_middle, amount_H, interval_H, interval_V, dz, true);
    let x = (amount_V - 2.0) * (interval_V / 2.0);
    if (reverse == true) {
      x *= -1.0;
    }
    const Obj_LM = this.Move.MoveObject(Obj_L, [-x, 0.0, 0.0]);
    const Obj_RM = this.Move.MoveObject(Obj_R, [x, 0.0, 0.0]);
    const Obj = new THREE.Group();
    Obj.add(Obj_LM, Obj_RM);
    return Obj
  }

}
