import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { pvRotateService } from '../libs/pvRotate.service';
import { pvTranlateService } from '../libs/pvTranlate.service';
import { HsteelService } from './pvHsteel.service';

@Injectable({
  providedIn: 'root'
})
export class ArrayH4Service {

  constructor(private Hsteel: HsteelService,
    private Rotate: pvRotateService,
    private Move: pvTranlateService) { }

  /// <summary>端横桁を作成</summary>
  /// <param name="amount">主桁の数</param>
  /// <param name="interval">主桁の配置間隔</param>
  public Array(D: number, W: number, tf: number, tw: number, s_edge: number,
    s_middle: number, dz: number, L: number, amount_V: number,
    interval_V: number): THREE.Group {

    // 端横桁を作成
    const Amount = amount_V - 1.0;
    const L1 = interval_V - (s_edge + s_middle);
    const L2 = interval_V - (s_middle * 2.0);
    const y1 = -L1 / 2.0;
    const y2 = -L2 / 2.0;
    let z = (W / 2.0 + tf);
    const Model_E = this.Hsteel.CreateBeam(L1, D, W, tf, tw, [0.0, y1, z]);
    const Model_M = this.Hsteel.CreateBeam(L2, D, W, tf, tw, [0.0, y2, z]);

    // 端横桁を回転,移動
    const dx = s_middle - s_edge;
    const RModel_E = this.Rotate.rotate(Model_E, [0.0, 0.0, 0.0], 0.0, 0.0, 90.0);
    const RModel_M = this.Rotate.rotate(Model_M, [0.0, 0.0, 0.0], 0.0, 0.0, 90.0);

    // 配置
    const x1 = (Amount - 1.0) * (interval_V / 2.0) + (dx / 2.0);
    z = dz;
    let y = 0.0;
    let n = 0.0;
    const Obj = new THREE.Group();
    for (let i = 0; i < 2; i++) {
      const Obj_ELb = this.Move.MoveObject(RModel_E, [-x1, y, z]);
      Obj_ELb.name = "Cu_"+ String(n);
      Obj.add(Obj_ELb);
      let s = n + 1.0;
      let x2 = (Amount - 1.0) * (interval_V / 2.0) - interval_V;
      for (let j = 0; j < Amount - 2; j++) {
        const Obj_Mb = this.Move.MoveObject(RModel_M, [-x2, y, z]);
        Obj_Mb.name = "Cu_"+ String(s);
        Obj.add(Obj_Mb);
        x2 += interval_V;
        s += 1.0;
      }
      n += Amount - 1;
      const Obj_ERb = this.Move.MoveObject(RModel_E, [x1, y, z]);
      Obj_ERb.name = "Cu_"+ String(n);
      Obj.add(Obj_ERb);
      n += 1;
      y += L;
    }
    return Obj;
  }
}

