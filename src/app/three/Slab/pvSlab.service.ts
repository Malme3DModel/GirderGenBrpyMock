import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { pvTranlateService } from '../libs/pvTranlate.service';
import { pyVistaService } from '../libs/pyVista.service';

@Injectable({
  providedIn: 'root'
})
export class AddSlabService {

  constructor(private pv: pyVistaService,
    private Move: pvTranlateService) { }

  private selection(b1: number, b2: number, b3: number,
    i1: number, i2: number, H: number,
    T1: number, T2: number, n: number,
    s: number, D: number, position: number[]): number[][] {

    const x = position[0];
    const y = position[1];
    const z = position[2];
    const dx1 = -b1;
    const dx2 = -(b1 + b3);
    const dx3 = b2 + b3;
    const dx4 = b2;
    const dx5 = dx2 + (s - D / 2.0);
    const dx6 = dx3 - (s - D / 2.0);
    const dx7 = dx5 + D;
    const dx8 = dx6 - D;
    const dz1 = -b1 * i1;
    const dz2 = dz1 + (H - T1 - b3 * i1);
    const dz3 = dz1 - (T1 - b3 * i1);
    const dz4 = -b2 * i2;
    const dz5 = -T2;
    const dx9 = dx7 + ((dz3 - dz5) + ((s - D / 2.0) + D) * i1) / ((1 / n) - i1);
    const dx10 = dx8 - ((dz3 - dz5) + ((s - D / 2.0) + D) * i2) / ((1 / n) - i2);
    const dz6 = dz5 + ((dz3 - dz5) + ((s - D / 2.0) + D) * i1) / ((1 / n) - i1) / n;
    const dz7 = dz5 + ((dz3 - dz5) + ((s - D / 2.0) + D) * i2) / ((1 / n) - i2) / n;
    const dz8 = -T1;
    const x1 = x + dx1;
    const x2 = x + dx2;
    const x3 = x + dx3;
    const x4 = x + dx4;
    const x5 = x + dx5;
    const x6 = x + dx6;
    const x7 = x + dx7;
    const x8 = x + dx8;
    const x9 = x + dx9;
    const x10 = x + dx10;
    const z1 = z + dz1;
    const z2 = z + dz2;
    const z3 = z + dz3;
    const z4 = z + dz4;
    const z5 = z + dz5;
    const z6 = z + dz6;
    const z7 = z + dz7;
    const z8 = z + dz8;
    const a0 = [x, y, z];
    const a1 = [x1, y, z1];
    const a2 = [x1, y, z2];
    const a3 = [x2, y, z2];
    const a4 = [x2, y, z3];
    const a5 = [x5, y, z5];
    const a6 = [x7, y, z5];
    const a7 = [x9, y, z6];
    const a8 = [x, y, z8];
    const a9 = [x10, y, z7];
    const a10 = [x8, y, z5];
    const a11 = [x6, y, z5];
    const a12 = [x3, y, z3];
    const a13 = [x3, y, z2];
    const a14 = [x4, y, z2];
    const a15 = [x4, y, z4];
    const points = [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15];
    return points;
  }

  private createSlab(b1: number, b2: number, b3: number, i1: number, i2: number, H: number,
    T1: number, T2: number, n: number, s: number, D: number, L: number): THREE.Group {

    const points_BP = this.selection(b1, b2, b3, i1, i2, H, T1, T2, n, s, D, [0.0, 0.0, 0.0]);
    const points_EP = this.selection(b1, b2, b3, i1, i2, H, T1, T2, n, s, D, [0.0, L, 0.0]);
    const pointlist = [points_BP, points_EP];

    const Model = new THREE.Group();
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
        const Mesh_A = this.pv.PolyData(Apoints, [3, 0, 1, 2])
        const Mesh_B = this.pv.PolyData(Bpoints, [3, 0, 1, 2])
        Model.add(Mesh_A, Mesh_B);
      }
    }

    const Lib1 = pointlist[0];
    const p1 = [Lib1[0], Lib1[1], Lib1[8]];
    const p2 = [Lib1[1], Lib1[2], Lib1[3]];
    const p3 = [Lib1[1], Lib1[3], Lib1[4]];
    const p4 = [Lib1[1], Lib1[4], Lib1[5]];
    const p5 = [Lib1[1], Lib1[5], Lib1[6]];
    const p6 = [Lib1[1], Lib1[6], Lib1[7]];
    const p7 = [Lib1[1], Lib1[7], Lib1[8]];
    const p8 = [Lib1[0], Lib1[8], Lib1[15]];
    const p9 = [Lib1[8], Lib1[9], Lib1[15]];
    const p10 = [Lib1[9], Lib1[10], Lib1[15]];
    const p11 = [Lib1[10], Lib1[11], Lib1[15]];
    const p12 = [Lib1[11], Lib1[12], Lib1[15]];
    const p13 = [Lib1[12], Lib1[13], Lib1[15]];
    const p14 = [Lib1[13], Lib1[14], Lib1[15]];
    const m1 = this.pv.PolyData(p1, [3, 0, 1, 2]);
    const m2 = this.pv.PolyData(p2, [3, 0, 1, 2]);
    const m3 = this.pv.PolyData(p3, [3, 0, 1, 2]);
    const m4 = this.pv.PolyData(p4, [3, 0, 1, 2]);
    const m5 = this.pv.PolyData(p5, [3, 0, 1, 2]);
    const m6 = this.pv.PolyData(p6, [3, 0, 1, 2]);
    const m7 = this.pv.PolyData(p7, [3, 0, 1, 2]);
    const m8 = this.pv.PolyData(p8, [3, 0, 1, 2]);
    const m9 = this.pv.PolyData(p9, [3, 0, 1, 2]);
    const m10 = this.pv.PolyData(p10, [3, 0, 1, 2]);
    const m11 = this.pv.PolyData(p11, [3, 0, 1, 2]);
    const m12 = this.pv.PolyData(p12, [3, 0, 1, 2]);
    const m13 = this.pv.PolyData(p13, [3, 0, 1, 2]);
    const m14 = this.pv.PolyData(p14, [3, 0, 1, 2]);
    const Mesh_Lib1 = new THREE.Group();
    Mesh_Lib1.add(m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14);
    const Mesh_Lib2 = this.Move.MoveObject(Mesh_Lib1, [0.0, L, 0.0]);
    Model.add(Mesh_Lib1, Mesh_Lib2)
    return Model;
  }

  private createHunch(T1: number, T2: number, D: number, n: number, L: number): THREE.Group {

    const Hz = T2 - T1;
    const Hx1 = D / 2.0;
    const Hx2 = Hx1 + n * Hz;

    const H1 = [-Hx1, 0.0, 0.0];
    const H2 = [-Hx2, 0.0, Hz];
    const H3 = [Hx2, 0.0, Hz];
    const H4 = [Hx1, 0.0, 0.0];
    const H5 = [-Hx1, L, 0.0];
    const H6 = [-Hx2, L, Hz];
    const H7 = [Hx2, L, Hz];
    const H8 = [Hx1, L, 0.0];
    const Hp1 = [H1, H2, H3];
    const Hp2 = [H1, H3, H4];
    const Hp3 = [H5, H6, H7];
    const Hp4 = [H5, H7, H8];
    const Hm1 = this.pv.PolyData(Hp1, [3, 0, 1, 2]);
    const Hm2 = this.pv.PolyData(Hp2, [3, 0, 1, 2]);
    const Hm3 = this.pv.PolyData(Hp3, [3, 0, 1, 2]);
    const Hm4 = this.pv.PolyData(Hp4, [3, 0, 1, 2]);
    const Model = new THREE.Group();
    Model.add(Hm1, Hm2, Hm3, Hm4);

    const pointlist = [[H1, H2, H3, H4], [H5, H6, H7, H8]];

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
        const Mesh_A = this.pv.PolyData(Apoints, [3, 0, 1, 2])
        const Mesh_B = this.pv.PolyData(Bpoints, [3, 0, 1, 2])
        Model.add(Mesh_A, Mesh_B);
      }
    }
    return Model
  }

  public add_Slab(b1: number, b2: number, b3: number, i1: number, i2: number, H: number,
    T1: number, T2: number, n: number, s: number, D: number,
    L: number, amount_V: number, interval_V: number): THREE.Group {

    const Model_S = this.createSlab(b1, b2, b3, i1, i2, H, T1, T2, n, s, D, L);
    const Obj = new THREE.Group();
    Obj.add(Model_S);

    const Model_H = this.createHunch(T1, T2, D, n, L);

    let x = -(amount_V - 3.0) * (interval_V / 2.0);
    const z = -T2;

    for (let i = 0; i < amount_V - 2; i++) {
      const Model_H1 = this.Move.MoveObject(Model_H, [x, 0.0, z]);
      Obj.add(Model_H1);
      x += interval_V;
    }

    return Obj
  }

}
