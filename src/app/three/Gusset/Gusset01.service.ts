import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { pyVistaService } from '../libs/pyVista.service';

@Injectable({
    providedIn: 'root'
})
export class Gusset01Service {

    constructor(private pv: pyVistaService) { }


    public CreateGusset(A: number, B: number, C: number, D: number, t: number,
    position: number[]): THREE.Group {
        const pointlist: number[][][] = [];
        const Obj = new THREE.Group();
        const x = position[0];
        const y = position[1];
        const z = position[2];

        const x1 = x - (C / 2.0);
        const x2 = x - (B / 2.0);
        const x3 = x + (B / 2.0);
        const x4 = x + (C / 2.0);
        const y1 = y;
        const y2 = y - t;
        const z1 = z;
        const z2 = z + D;
        const z3 = z + A;

        const p0 = [x, y1, z];
        const p1 = [x1, y1, z1];
        const p2 = [x1, y1, z2];
        const p3 = [x2, y1, z3];
        const p4 = [x3, y1, z3];
        const p5 = [x4, y1, z2];
        const p6 = [x4, y1, z1];

        pointlist.push([p0, p1, p2, p3, p4, p5, p6]);

        const q0 = [x, y2, z];
        const q1 = [x1, y2, z1];
        const q2 = [x1, y2, z2];
        const q3 = [x2, y2, z3];
        const q4 = [x3, y2, z3];
        const q5 = [x4, y2, z2];
        const q6 = [x4, y2, z1];

        pointlist.push([q0, q1, q2, q3, q4, q5, q6]);

        for (let i = 0; i < pointlist.length - 1; i++) {
            const A1 = pointlist[i];
            const A2 = pointlist[i + 1];
            const A3 = A1.concat();  // 一番前の要素を一番後ろに
            A3.splice(0, 1);
            A3.push(A1[0]);
            const A4 = A2.concat();  // 一番前の要素を一番後ろに
            A4.splice(0, 1);
            A4.push(A2[0]);

            for (let j = 0; j < A1.length; j++) {
                const Apoints = [A1[j], A3[j], A2[j]];
                const Bpoints = [A2[j], A4[j], A3[j]];
                const Mesh_A = this.pv.PolyData(Apoints, [3, 0, 1, 2]);
                const Mesh_B = this.pv.PolyData(Bpoints, [3, 0, 1, 2]);
                Obj.add(Mesh_A, Mesh_B);
            }
        }

        const m1 = [p0, p1, p2];
        const m2 = [p0, p2, p3];
        const m3 = [p0, p3, p4];
        const m4 = [p0, p4, p5];
        const m5 = [p0, p5, p6];
        const m6 = [q0, q1, q2];
        const m7 = [q0, q2, q3];
        const m8 = [q0, q3, q4];
        const m9 = [q0, q4, q5];
        const m10 = [q0, q5, q6];

        const o1 = this.pv.PolyData(m1, [3, 0, 1, 2]);
        const o2 = this.pv.PolyData(m2, [3, 0, 1, 2]);
        const o3 = this.pv.PolyData(m3, [3, 0, 1, 2]);
        const o4 = this.pv.PolyData(m4, [3, 0, 1, 2]);
        const o5 = this.pv.PolyData(m5, [3, 0, 1, 2]);
        const o6 = this.pv.PolyData(m6, [3, 0, 1, 2]);
        const o7 = this.pv.PolyData(m7, [3, 0, 1, 2]);
        const o8 = this.pv.PolyData(m8, [3, 0, 1, 2]);
        const o9 = this.pv.PolyData(m9, [3, 0, 1, 2]);
        const o10 = this.pv.PolyData(m10, [3, 0, 1, 2]);

        Obj.add(o1, o2, o3, o4, o5, o6, o7, o8, o9, o10);
        return Obj
    }
}