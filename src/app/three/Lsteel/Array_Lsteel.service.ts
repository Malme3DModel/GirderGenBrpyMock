import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { pvRotateService } from '../pvRotate.service';
import { pvTranlateService } from '../pvTranlate.service';
import { LsteelService } from './pvLsteel.service';

@Injectable({
  providedIn: 'root'
})
export class ArrayLService {

  constructor(private Lsteel: LsteelService,
    private Rotate: pvRotateService,
    private Move: pvTranlateService) { }

  /// <summary>対傾構を横断方向に配置</summary>
  private HArray(A: number, B: number, t: number, s: number,
    s_in: number, s_out: number, H: number, D: number, W: number,
    dz: number, tf: number, interval: number, amount: number): THREE.Group {

    // 対傾構の作成
    const Model = this.Lsteel.add_LSteel(A, B, t, H, D, s, s_in, s_out, dz, tf);
    const HPointlist: number[][] = [];
    let x = -(amount - 2.0) * interval / 2.0;
    const y = 0.0;
    const z = 0.0;
    for (let i = 0; i < amount - 1; i++) {
      const point = [x, y, z];
      HPointlist.push(point);
      x += interval;
    }

    const Obj = new THREE.Group();
    for (let i = 0; i < HPointlist.length; i++) {
      const HModel = this.Move.MoveObject(Model, HPointlist[i]);
      Obj.add(HModel);
    }

    return Obj
  }

  /// <summary>対傾構を縦断方向に配置</summary>
  public Array(A: number, B: number, t: number, s: number, s_in: number, s_out: number,
    H: number, W: number, D: number, tf: number, dz: number,
    amount_H: number, amount_V: number, interval_H: number, interval_V: number,
    location: number[]): THREE.Group {

    const obj = this.HArray(A, B, t, s, s_in, s_out, H, D, W, dz, tf, interval_V, amount_V);
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

    return Obj
  }

}
