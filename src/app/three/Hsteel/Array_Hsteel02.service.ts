import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { pvRotateService } from '../pvRotate.service';
import { pvTranlateService } from '../pvTranlate.service';
import { HsteelService } from './pvHsteel.service';

@Injectable({
  providedIn: 'root'
})
export class ArrayH2Service {

  constructor(private Hsteel: HsteelService,
    private Rotate: pvRotateService,
    private Move: pvTranlateService) { }

  /// <summary>Ｈ桁の生成</summary>
  /// <param name="amount">主桁の数</param>
  /// <param name="interval">主桁の配置間隔</param>
  private createBeam( D: number, W: number, tf: number, tw: number,
                      s_edge: number, s_middle: number, dz: number,
                      amount: number, interval: number): THREE.Group {

    // 荷重分配横桁を作成
    const Amount = amount - 1.0;
    const L1 = interval - (s_edge + s_middle);
    const L2 = interval - (s_middle * 2.0);
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

    // 荷重分配横桁を水平方向に配置
    const x1 = (Amount - 1.0) * interval / 2.0;
    z = dz;
    const Obj_EL = this.Move.MoveObject(RModel_EL, [-x1, 0.0, z]);
    const Obj_ER = this.Move.MoveObject(RModel_ER, [x1, 0.0, z]);

    let x2 = -x1 + interval;
    const Models = new THREE.Group();
    for (let i = 0; i < Amount - 2; i++) {
      const Obj_M = this.Move.MoveObject(RModel_M, [x2, 0.0, z]);
      Models.add(Obj_M);
      x2 += interval;
    }

    Models.add(Obj_EL);
    Models.add(Obj_ER);

    return Models;
  }

  /// <summary>生成</summary>
  /// <param name="_H">横構</param>
  /// <param name="_V">主桁を表すパラメータ</param>
  public Array( D: number, W: number, tf: number, tw: number, s_edge: number, s_middle: number, dz: number,
                amount_H: number, amount_V: number, interval_H: number, interval_V: number,
                location: number[]): THREE.Group {

    const obj = this.createBeam(D, W, tf, tw, s_edge, s_middle, dz, amount_V, interval_V);
    // 荷重分配横桁を縦断方向に配置
    const VPointlist: number[][] = [];
    const x = 0.0;
    let y = 0.0;
    const z = 0.0;
    for (let i = 0; i < amount_H; i++) {
      const VPoint = [x, y, z];
      VPointlist.push(VPoint);
      y += interval_H;
    }

    const VModels: THREE.Object3D[] = [];
    for (let i = 0; i < amount_H; i++) {
      const VModel = this.Move.MoveObject(obj, VPointlist[i]);
      VModels.push(VModel);
    }

    const Obj = new THREE.Group();
    for (let i = 0; i < location.length; i++) {
      Obj.add(VModels[location[i]]);
    }

    return Obj;
  }


}
