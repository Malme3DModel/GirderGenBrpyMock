import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { HsteelService } from './pvHsteel.service';

@Injectable({
  providedIn: 'root'
})
export class ArrayH1Service {

  constructor(private Hsteel: HsteelService) { }

  public Array(L: number, D: number, W: number, tf: number, tw: number,
                s_BP: number, s_EP: number, amount: number, interval: number): THREE.Group {
    const pointlist: number[][] = [];
    let x = -(amount - 1.0) * interval / 2.0;
    const y = -(s_BP + s_EP) / 2.0;
    const z = (W / 2.0 + tf);
    for (let i = 0; i < amount; i++) {
      const point = [x, y, z];
      pointlist.push(point);
      x += interval;
    }

    const Models = new THREE.Group();
    for (let i = 0; i < amount; i++) {
      const Model = this.Hsteel.CreateBeam(L, D, W, tf, tw, pointlist[i])
      Models.add(Model);
    }

    return Models
  }

}
