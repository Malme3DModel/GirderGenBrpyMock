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
export class ArrayH3Service {

  constructor(private pv: pyVistaService,
    private Hsteel: HsteelService,
    private Rotate: pvRotateService,
    private Move: pvTranlateService) { }

  private CreateBeam(D: number, W: number, tf: number, tw: number,
    s_edge: number, s_middle: number, interval_H: number, interval_V: number,
    dz: number, reverse: boolean): THREE.Group {

    const L = Math.sqrt((interval_H / 2.0) ** 2.0 + (interval_V) ** 2.0) - (s_edge + s_middle);
    const y = -L / 2.0;
    const z = W / 2.0 + tf;
    const Model = this.Hsteel.CreateBeam(L, D, W, tf, tw, [0.0, y, z]);
    const x = s_edge - s_middle;
    const Model_L = this.Move.MoveObject(Model, [x, interval_H / 4.0, dz]);
    const Model_R = this.Move.MoveObject(Model, [x, 3.0 * interval_H / 4.0, dz]);
    

    let z_rotate = Math.round(this.pv.degrees(Math.atan(interval_V / (interval_H / 2.0))) * 10) / 10;
    if (reverse == true) {
      z_rotate *= 1.0;
    } else {
      z_rotate *= -1.0;
    }
    const Model_LM = this.Rotate.rotate(Model_L, [0.0, interval_H / 4.0, dz], 0.0, 0.0, -z_rotate);
    const Model_RM = this.Rotate.rotate(Model_R, [0.0, 3.0 * interval_H / 4.0, dz], 0.0, 0.0, z_rotate);
    const Models = new THREE.Group();
    Models.add(Model_LM);
    Models.add(Model_RM);

    return Models
  }

  /// <summary>縦断方向に配置</summary>
  public Array_V(D: number, W: number, tf: number, tw: number, s_edge: number, s_middle: number,
    amount_H: number, interval_H: number, interval_V: number, dz: number,
    reverse: boolean): THREE.Group {

    const Models = this.CreateBeam(D, W, tf, tw, s_edge, s_middle, interval_H, interval_V, dz, reverse);
    const Obj_0 = new THREE.Group();
    let y = 0.0;
    for (let i = 0; i < amount_H - 1; i++) {
      const Models_M = this.Move.MoveObject(Models, [0.0, y, 0.0]);
      Obj_0.add(Models_M);
      y += interval_H;
    }
    return Obj_0
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
