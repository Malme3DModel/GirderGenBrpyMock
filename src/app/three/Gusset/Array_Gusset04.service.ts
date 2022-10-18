import { getLocaleDirection } from '@angular/common';
import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { pvRotateService } from '../libs/pvRotate.service';
import { Gusset01Service } from './Gusset01.service';
import { pvTranlateService } from '../libs/pvTranlate.service';

@Injectable({
    providedIn: 'root'
})
export class ArrayG4Service {

    constructor(private Gusset: Gusset01Service,
        private Rotate: pvRotateService,
        private Move: pvTranlateService) { }

    public Array(A: number, B: number, C: number, D: number, t: number,
        dz: number, H: number, W2: number, tf: number, tw2: number, amount_H: number, amount_V: number, interval_H: number, interval_V: number,
        location: number[], reverse: boolean): THREE.Group {
        // ガセットプレートの配置座標を計算
        const pointlist1: number[][] = [];
        const pointlist2: number[][] = [];
        const pointlist3: number[][] = [];
        const pointlist4: number[][] = [];

        const x1 = -(interval_V / 2.0) * (amount_V - 1.0) + (tw2 / 2.0);
        const x2 = -(interval_V / 2.0) * (amount_V - 3.0) - (tw2 / 2.0);
        const x3 = (interval_V / 2.0) * (amount_V - 1.0) - (tw2 / 2.0);
        const x4 = (interval_V / 2.0) * (amount_V - 3.0) + (tw2 / 2.0);
        let yr = 1.0;
        let a1 = 1.0;
        let a2 = 1.0;
        if (reverse == true) {
            yr *= 0;
            a1 *= 0.0;
        } else {
            yr *= 1;
            a2 *= 0.0;
        }
        let y1 = (interval_H / 2.0) * yr;
        let y2 = (interval_H / 2.0) * (1 - yr);
        const z = dz - t;
        const Obj = new THREE.Group;

        // 左外列
        let dy = 0.0;
        for (let i = 0; i < amount_H - a1; i++) {
            let y = y1 + dy;
            const p = [x1, y, z];
            pointlist1.push(p);
            dy += interval_H;
        }

        // 左内列
        dy = 0.0;
        for (let i = 0; i < amount_H - a2; i++) {
            let y = y2 + dy;
            const p = [x2, y, z];
            pointlist2.push(p);
            dy += interval_H;
        }

        // 右外列
        dy = 0.0;
        for (let i = 0; i < amount_H - a1; i++) {
            let y = y1 + dy;
            const p = [x3, y, z];
            pointlist3.push(p);
            dy += interval_H;
        }

        // 右内列
        dy = 0.0;
        for (let i = 0; i < amount_H - a2; i++) {
            let y = y2 + dy;
            const p = [x4, y, z];
            pointlist4.push(p);
            dy += interval_H;
        }

        const P1 = pointlist1;
        const P2 = pointlist2;
        const P3 = pointlist3;
        const P4 = pointlist4;

        const Obj_1 = this.Gusset.CreateGusset(A, B, C, D, t, [0.0,0.0,0.0]);
        const Obj_L = this.Rotate.rotate(Obj_1, [0.0,0.0,0.0], 0.0, 90.0, 90.0);
        const Obj_2 = this.Gusset.CreateGusset(A, B, C, D, t, [0.0,0.0,0.0]);
        const Obj_R = this.Rotate.rotate(Obj_2, [0.0,0.0,0.0], 0.0, -90.0, -90.0);

        for (let i = 0; i < P1.length; i++) {
            const Obj_M = this.Move.MoveObject(Obj_L, P1[i]);
            Obj_M.name = "PL4_01_"+ String(i)
            Obj.add(Obj_M)
        }

        for (let i = 0; i < P2.length; i++) {
            const Obj_M = this.Move.MoveObject(Obj_R, P2[i]);
            Obj_M.name = "PL4_02_"+ String(i)
            Obj.add(Obj_M)
        }

        for (let i = 0; i < P3.length; i++) {
            const Obj_M = this.Move.MoveObject(Obj_R, P3[i]);
            Obj_M.name = "PL4_03_"+ String(i)
            Obj.add(Obj_M)
        }

        for (let i = 0; i < P4.length; i++) {
            const Obj_M = this.Move.MoveObject(Obj_L, P4[i]);
            Obj_M.name = "PL4_04_"+ String(i)
            Obj.add(Obj_M)
        }
        return Obj
    }
}