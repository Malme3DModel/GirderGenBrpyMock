import { getLocaleDirection } from '@angular/common';
import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { pvRotateService } from '../libs/pvRotate.service';
import { Gusset01Service } from './Gusset01.service';
import { Gusset02Service } from './Gusset02.service';
import { pvTranlateService } from '../libs/pvTranlate.service';

@Injectable({
    providedIn: 'root'
})
export class ArrayG4Service {

    constructor(private Gusset: Gusset01Service,
        private Gusset2: Gusset02Service,
        private Rotate: pvRotateService,
        private Move: pvTranlateService) { }

    public Array_l(A: number, B: number, C: number, D: number, t: number,
        dz: number, tw2: number, amount_H: number, amount_V: number, interval_H: number, interval_V: number,
        reverse: boolean): THREE.Group {
        // ガセットプレートの配置座標を計算
        const pointlist1: number[][] = [];
        const pointlist2: number[][] = [];
        const pointlist3: number[][] = [];
        const pointlist4: number[][] = [];
        const pointlist0: number[][] = [];

        const x1 = -(interval_V / 2.0) * (amount_V - 1.0) + (tw2 / 2.0);
        const x2 = -(interval_V / 2.0) * (amount_V - 3.0) - (tw2 / 2.0);
        const x3 = (interval_V / 2.0) * (amount_V - 1.0) - (tw2 / 2.0);
        const x4 = (interval_V / 2.0) * (amount_V - 3.0) + (tw2 / 2.0);
        let yr = 1.0;
        let a1 = 1.0;
        let a2 = 1.0;
        if (reverse == true) {
            yr *= 1;
            a1 += 1.0;
        } else {
            yr *= 2;
            a2 += 1.0;
        }
        let y1 = (interval_H / 2.0) * (3 - yr);
        let y2 = (interval_H / 2.0) * yr;
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

        // 端部
        const Obj_FL1 = this.Gusset2.CreateGusset(A, C/2, B/2, D, t, [0.0,0.0,0.0], false);
        const Obj_FL2 = this.Gusset2.CreateGusset(A, C/2, B/2, D, t, [0.0,0.0,0.0], true);
        const Obj_FL3 = this.Gusset2.CreateGusset(A, C/2, B/2, D, t, [0.0,0.0,0.0], true);
        const Obj_FL4 = this.Gusset2.CreateGusset(A, C/2, B/2, D, t, [0.0,0.0,0.0], false);
        const Obj_FLR1 = this.Rotate.rotate(Obj_FL1, [0.0,0.0,0.0], 0.0, 90.0, 90.0);
        const Obj_FLR2 = this.Rotate.rotate(Obj_FL2, [0.0,0.0,0.0], 0.0, -90.0, -90.0);
        const Obj_FLR3 = this.Rotate.rotate(Obj_FL3, [0.0,0.0,0.0], 0.0, 90.0, 90.0);
        const Obj_FLR4 = this.Rotate.rotate(Obj_FL4, [0.0,0.0,0.0], 0.0, -90.0, -90.0);
        const p1 = [x1, 0.0, z];
        const p2 = [x3, 0.0, z];
        const p3 = [x1, interval_H * (amount_H - 1), z];
        const p4 = [x3, interval_H * (amount_H - 1), z];
        const Obj_M1 = this.Move.MoveObject(Obj_FLR1, p1);
        Obj_M1.name = "PL4_l05_01";
        Obj.add(Obj_M1)
        const Obj_M2 = this.Move.MoveObject(Obj_FLR2, p2);
        Obj_M2.name = "PL4_l05_02";
        Obj.add(Obj_M2)
        const Obj_M3 = this.Move.MoveObject(Obj_FLR3, p3);
        Obj_M3.name = "PL4_l05_03";
        Obj.add(Obj_M3)
        const Obj_M4 = this.Move.MoveObject(Obj_FLR4, p4);
        Obj_M4.name = "PL4_l05_04";
        Obj.add(Obj_M4)

        return Obj
    }
    public Array_u(A: number, B: number, C: number, D: number, t: number,
        dz: number, tw2: number, amount_H: number, amount_V: number, interval_H: number, interval_V: number,
        reverse: boolean): THREE.Group {
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
            yr *= 1;
            a1 += 1.0;
        } else {
            yr *= 2;
            a2 += 1.0;
        }
        let y1 = (interval_H / 2.0) * (3 - yr);
        let y2 = (interval_H / 2.0) * yr;
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
            Obj_M.name = "PL4_u01_"+ String(i)
            Obj.add(Obj_M)
        }

        for (let i = 0; i < P2.length; i++) {
            const Obj_M = this.Move.MoveObject(Obj_R, P2[i]);
            Obj_M.name = "PL4_u02_"+ String(i)
            Obj.add(Obj_M)
        }

        for (let i = 0; i < P3.length; i++) {
            const Obj_M = this.Move.MoveObject(Obj_R, P3[i]);
            Obj_M.name = "PL4_u03_"+ String(i)
            Obj.add(Obj_M)
        }

        for (let i = 0; i < P4.length; i++) {
            const Obj_M = this.Move.MoveObject(Obj_L, P4[i]);
            Obj_M.name = "PL4_u04_"+ String(i)
            Obj.add(Obj_M)
        }

        // 端部
        const Obj_FL1 = this.Gusset2.CreateGusset(A, C/2, B/2, D, t, [0.0,0.0,0.0], true);
        const Obj_FL2 = this.Gusset2.CreateGusset(A, C/2, B/2, D, t, [0.0,0.0,0.0], false);
        const Obj_FL3 = this.Gusset2.CreateGusset(A, C/2, B/2, D, t, [0.0,0.0,0.0], false);
        const Obj_FL4 = this.Gusset2.CreateGusset(A, C/2, B/2, D, t, [0.0,0.0,0.0], true);
        const Obj_FLR1 = this.Rotate.rotate(Obj_FL1, [0.0,0.0,0.0], 0.0, -90.0, -90.0);
        const Obj_FLR2 = this.Rotate.rotate(Obj_FL2, [0.0,0.0,0.0], 0.0, 90.0, 90.0);
        const Obj_FLR3 = this.Rotate.rotate(Obj_FL3, [0.0,0.0,0.0], 0.0, -90.0, -90.0);
        const Obj_FLR4 = this.Rotate.rotate(Obj_FL4, [0.0,0.0,0.0], 0.0, 90.0, 90.0);
        const p1 = [x2, 0.0, z];
        const p2 = [x4, 0.0, z];
        const p3 = [x2, interval_H * (amount_H - 1), z];
        const p4 = [x4, interval_H * (amount_H - 1), z];
        const Obj_M1 = this.Move.MoveObject(Obj_FLR1, p1);
        Obj_M1.name = "PL4_u05_01";
        Obj.add(Obj_M1)
        const Obj_M2 = this.Move.MoveObject(Obj_FLR2, p2);
        Obj_M2.name = "PL4_u05_02";
        Obj.add(Obj_M2)
        const Obj_M3 = this.Move.MoveObject(Obj_FLR3, p3);
        Obj_M3.name = "PL4_u05_03";
        Obj.add(Obj_M3)
        const Obj_M4 = this.Move.MoveObject(Obj_FLR4, p4);
        Obj_M4.name = "PL4_u05_04";
        Obj.add(Obj_M4)

        return Obj
    }
}