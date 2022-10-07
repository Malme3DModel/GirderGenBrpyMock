import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { Gusset02Service } from './Gusset02.service';

@Injectable({
    providedIn: 'root'
})
export class ArrayG2Service {

    constructor(private Gusset: Gusset02Service) { }

    public Array(A: number, B: number, C: number, D: number, t: number,
        dz: number, dx: number, tf: number, amount_H: number, amount_V: number, interval_H: number, interval_V: number,
        location: number[] ): THREE.Group {
        // ガセットプレートの配置座標を計算
        const pointlist: number[][] = [];
        const pointlist2: number[][] = [];
        const pointlist_r: number[][] = [];
        const pointlist2_r: number[][] = [];
        let y = 0.0;
        const z = dz + tf
        const Obj = new THREE.Group;
        for (let i = 0; i < amount_H; i++) {
            let x = -(interval_V/2) * (amount_V - 1.0) + dx;
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
        y = 0.0;
        for (let i = 0; i < amount_H; i++) {
            let x = -(interval_V/2.0) * (amount_V - 3.0) - dx;
            for (let j = 0; j < (amount_V-1); j++) {
                const point = [x, y, z];
                pointlist_r.push(point);
                x += interval_V;
            }
            y += interval_H;
        }
        for (let i = 0; i < location.length; i++) {
            let p = location[i] * (amount_V - 1);
            for (let j = 0; j < (amount_V - 1); j++) {
                pointlist2_r.push(pointlist_r[p]);
                p += 1.0;
            }
        }

        let n = 0;
        for (let i = 0; i < pointlist2.length; i++) {
            const Obj0 = this.Gusset.CreateGusset(A, B, C, D, t, pointlist2[i], false);
            Obj0.name = "PL2-"+ String(n)
            const Obj1 = this.Gusset.CreateGusset(A, B, C, D, t, pointlist2_r[i], true);
            Obj1.name = "PL2-"+ String(n+1)
            Obj.add(Obj0)
            Obj.add(Obj1)
            n += 2;
        }

        return Obj
    }
}