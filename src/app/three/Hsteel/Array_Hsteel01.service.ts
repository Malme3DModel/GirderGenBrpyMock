import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { HsteelService } from './pvHsteel.service';

@Injectable({
  providedIn: 'root'
})
export class ArrayH1Service {

  constructor(private Hsteel: HsteelService) { }

  public Array(L: number, D: number, W: number, tf: number, tw: number,
                s_BP: number, s_EP: number, amount: number, interval: number, j1: number, j2: number): THREE.Group {
    const pointlist: number[][] = [];
    let x = -(amount - 1.0) * interval / 2.0;
    let A = 0.0;
    let B = 0.0;
    if (amount% 2 === 0){
      A = amount / 2.0;
      B = amount / 2.0;
    } else {
      A = ((amount - 1) / 2.0) + 1.0;
      B = (amount - 1) / 2.0;
    }
    const y = -(s_BP + s_EP) / 2.0;
    let z = (W / 2.0 + tf);
    // 左側・中央主桁の配置
    for (let i = 0; i < A; i++) {
      const point = [x, y, z];
      pointlist.push(point);
      x += interval;
      z += interval * j1;
    }
    if (amount % 2 === 0){
      z -= interval * j2;
    } else {
      z -= interval * j2 * 2.0;
    }
    // 右側主桁の配置
    for (let i = 0; i < A; i++) {
      const point = [x, y, z];
      pointlist.push(point);
      x += interval;
      z -= interval * j2;
    }


    const Models = new THREE.Group();
    for (let i = 0; i < amount; i++) {
      const Model = this.Hsteel.CreateBeam(L, D, W, tf, tw, pointlist[i]);
      Model.name = "Hsteel-01-"+ String(i);
      Models.add(Model);
    }

    return Models
  }

}
