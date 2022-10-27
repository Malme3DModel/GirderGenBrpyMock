import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { Gusset01Service } from './Gusset01.service';

@Injectable({
    providedIn: 'root'
})
export class ArrayG1Service {

    constructor(private Gusset: Gusset01Service) { }

    public Array(A: number, B: number, C: number, D: number, t: number,
        dz: number, tf: number, amount_H: number, amount_V: number, interval_H: number, interval_V: number,
        location: number[] ): THREE.Group {
        // ガセットプレートの配置座標を計算
        const pointlist: number[][] = [];
        const pointlist2: number[][] = [];
        let y = 0.0;
        const z = dz + tf
        const Obj = new THREE.Group;
        for (let i = 0; i < amount_H; i++) {
            let x = -(interval_V / 2.0) * (amount_V - 2.0)
            for (let j = 0; j < (amount_V-1); j++) {
                const point = [x, y, z];
                pointlist.push(point);
                x += interval_V;
            }
            y += interval_H;
        }
        for (let i = 0; i < location.length; i++) {
            let p = location[i] * (amount_V - 1);
            for (let j = 0; j < (amount_V - 1); j++) {
                pointlist2.push(pointlist[p]);
                p += 1.0;
            }
        }
        
        for (let i = 0; i < pointlist2.length; i++) {
            const Obj0 = this.Gusset.CreateGusset(A, B, C, D, t, pointlist2[i]);
            Obj0.name = "PL1_"+ String(i)
            Obj.add(Obj0)
        }
        return Obj
    }
}