import { getLocaleDirection } from '@angular/common';
import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { pvRotateService } from '../libs/pvRotate.service';
import { Gusset01Service } from './Gusset01.service';

@Injectable({
    providedIn: 'root'
})
export class ArrayG4Service {

    constructor(private Gusset: Gusset01Service,
        private Rotate: pvRotateService) { }

    public Array(A: number, B: number, C: number, D: number, t: number,
        dz: number, H: number, W2: number, tf: number, tw2: number, amount_H: number, amount_V: number, interval_H: number, interval_V: number,
        location: number[], reverse: boolean): THREE.Group {
        // ガセットプレートの配置座標を計算
        const pointlist = [];
        const pointlist_A = [];
        const pointlist_B = [];
        const pointlist_C = [];
        const pointlist1: number[][] = [];
        const pointlist2: number[][] = [];
        const pointlist3: number[][] = [];
        const pointlist4: number[][] = [];

        const x1 = -(interval_V / 2.0) * (amount_V - 1.0) + (tw2 / 2.0);
        const x2 = -(interval_V / 2.0) * (amount_V - 3.0) - (tw2 / 2.0);
        const x3 = (interval_V / 2.0) * (amount_V - 1.0) - (tw2 / 2.0);
        const x4 = (interval_V / 2.0) * (amount_V - 3.0) + (tw2 / 2.0);
        let yr = 1.0;
        if (reverse == true) {
            yr *= 2;
        } else {
            yr *= 1;
        }
        let y1 = (interval_H / 2.0) * yr;
        let y2 = interval_H / yr;
        const z = dz - t;
        const Obj = new THREE.Group;

        // 左外列
        let dy = 0.0;
        for (let i = 0; i < amount_H - 2.0; i++) {
            let y = y1 + dy;
            const p = [x1, y, z];
            pointlist1.push(p);
            dy += interval_H;
        }

        // 左内列
        dy = 0.0;
        for (let i = 0; i < amount_H - 1.0; i++) {
            let y = y2 + dy;
            const p = [x2, y, z];
            pointlist2.push(p);
            dy += interval_H;
        }

        // 右外列
        dy = 0.0;
        for (let i = 0; i < amount_H - 2.0; i++) {
            let y = y1 + dy;
            const p = [x3, y, z];
            pointlist3.push(p);
            dy += interval_H;
        }

        // 右内列
        dy = 0.0;
        for (let i = 0; i < amount_H - 1.0; i++) {
            let y = y2 + dy;
            const p = [x4, y, z];
            pointlist4.push(p);
            dy += interval_H;
        }

        if (reverse == false) {
            pointlist.push(pointlist2, pointlist3);
            pointlist_B.push(pointlist1, pointlist4);
        } else {
            pointlist.push(pointlist1, pointlist4);
            pointlist_B.push(pointlist2, pointlist3);
        }


        for (let i = 0; i < 2; i++) {
            const P = pointlist[i];
            const A = [];
            for (let j = 0; j < location.length; j++) {
                const s = location[j] - 1;
                A.push(P[s]);
            }
            pointlist_A.push(A);
        }

        if (reverse == false) {
            pointlist_C.push(pointlist_B[0], pointlist_A[0], pointlist_A[1], pointlist_B[1]);
        } else {
            pointlist_C.push(pointlist_A[0], pointlist_B[0], pointlist_B[1], pointlist_A[1]);
        }

        const P1 = pointlist_C[0];
        const P2 = pointlist_C[1];
        const P3 = pointlist_C[2];
        const P4 = pointlist_C[3];

        for (let i = 0; i < P1.length; i++) {
            const point = P1[i];
            const Obj0 = this.Gusset.CreateGusset(A, B, C, D, t, point);
            const Obj0_R = this.Rotate.rotate(Obj0, [point[0],point[1],point[2]], 90.0, 0.0, 0.0);
            Obj0_R.name = "PL4_01_"+ String(i)
            Obj.add(Obj0_R)
        }

        for (let i = 0; i < P2.length; i++) {
            const Obj0 = this.Gusset.CreateGusset(A, B, C, D, t, P2[i]);
            const Obj0_R = this.Rotate.rotate(Obj0, [0.0,0.0,0.0], 90.0, 0.0, 0.0);
            Obj0_R.name = "PL4_02_"+ String(i)
            Obj.add(Obj0_R)
        }

        for (let i = 0; i < P3.length; i++) {
            const Obj0 = this.Gusset.CreateGusset(A, B, C, D, t, P3[i]);
            const Obj0_R = this.Rotate.rotate(Obj0, [0.0,0.0,0.0], 90.0, 0.0, 0.0);
            Obj0_R.name = "PL4_03_"+ String(i)
            Obj.add(Obj0_R)
        }

        for (let i = 0; i < P4.length; i++) {
            const Obj0 = this.Gusset.CreateGusset(A, B, C, D, t, P4[i]);
            const Obj0_R = this.Rotate.rotate(Obj0, [0.0,0.0,0.0], 90.0, 0.0, 0.0);
            Obj0_R.name = "PL4_04_"+ String(i)
            Obj.add(Obj0_R)
        }
        return Obj
    }
}