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
    i1: number, i2: number, j1: number, j2: number, H: number,
    T1: number, T2: number, n: number,
    s: number, D: number, position: number[], amount_V: number, interval_V: number){

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
    const dx9 = dx7 + n * T2;
    const dx10 = dx8 - n * T2;
    const dz1 = -b1 * i1;
    const dz2 = (H - T1) + dz1;
    const dz3 = dz1 - T1;
    const dz4 = -b2 * i2;
    const dz5 = (H - T1) + dz4;
    const dz6 = dz3 - (T2 - (s - b3) * j1);
    const dz7 = dz4 - T1;
    const dz8 = dz7 - (T2 - (s - b3) * j2);
    const dz9 = -(b1 * i1 + T1) + (b1 * j1);
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
    const z9 = z + dz9;
    const a0 = [x, y, z];
    const a1 = [x1, y, z1];
    const a2 = [x1, y, z2];
    const a3 = [x2, y, z2];
    const a4 = [x2, y, z3];
    const a5 = [x5, y, z6];
    const a6 = [x7, y, z6];
    const a7 = [x9, y, z3];
    const a8 = [x, y, z9];
    const a9 = [x10, y, z3];
    const a10 = [x8, y, z8];
    const a11 = [x6, y, z8];
    const a12 = [x3, y, z7];
    const a13 = [x3, y, z5];
    const a14 = [x4, y, z5];
    const a15 = [x4, y, z4]
    const points = [a0, a1, a2, a3, a4, a5, a6, a7];
    const point_a = [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15]

    // ハンチの座標を作成
    const Amount = amount_V - 2;
    let amount_S = Amount / 2.0;
    let amount_M = 1.0;
    if (Amount % 2 === 0 ){
      amount_M = 0.0;
    } else {
      amount_S = (Amount - 1.0) / 2.0;
    }
    let Hx = -(amount_V -1.0) * (interval_V / 2.0) + interval_V;
    const Hy = y;
    let Hz = z6 + interval_V * j1;
    const Hdx1 = ((D / (2.0 * n)) + T2) / (j1 + (1 / n));
    const Hdx2 = ((D / (2.0 * n)) + T2) / (-j1 + (1 / n));
    const Hdx3 = ((D / (2.0 * n)) + T2) / (j2 + (1 / n));
    const Hdx4 = ((D / (2.0 * n)) + T2) / (-j2 + (1 / n));
    const point_b = [];
    // 左側ハンチ
    if (Amount === 1){
    } else {
      for (let i = 0; i < amount_S; i++){
        const Hp1x = Hx - Hdx1;
        const Hp2x = Hx - D / 2.0;
        const Hp3x = Hx + D / 2.0;
        const Hp4x = Hx + Hdx2;
        const Hp1z = Hz + ((Hdx1 - (D / 2.0)) / n);
        const Hp2z = Hz;
        const Hp3z = Hz + ((Hdx2 - (D / 2.0)) / n)
        const Hp1 = [Hp1x, Hy, Hp1z];
        const Hp2 = [Hp2x, Hy, Hp2z];
        const Hp3 = [Hp3x, Hy, Hp2z];
        const Hp4 = [Hp4x, Hy, Hp3z];
        points.push(Hp1, Hp2, Hp3, Hp4);
        point_b.push(Hp1, Hp2, Hp3, Hp4);
        Hx += interval_V;
        Hz += interval_V * j1;
      }
    }

    if (Amount % 2 === 0 ){
      points.push(a8);
    } else {
      // 中央ハンチ
      Hz = z9 - T2;
      for (let i = 0; i < amount_M; i++){
        const Hp1x = Hx - Hdx1;
        const Hp2x = Hx - D / 2.0;
        const Hp3x = Hx + D / 2.0;
        const Hp4x = Hx + Hdx3;
        const Hp1z = Hz + ((Hdx1 - (D / 2.0)) / n);
        const Hp2z = Hz;
        const Hp3z = Hz + ((Hdx3 - (D / 2.0)) / n)
        const Hp1 = [Hp1x, Hy, Hp1z];
        const Hp2 = [Hp2x, Hy, Hp2z];
        const Hp3 = [Hp3x, Hy, Hp2z];
        const Hp4 = [Hp4x, Hy, Hp3z];
        points.push(Hp1, Hp2, Hp3, Hp4);
        point_b.push(Hp1, Hp2, Hp3, Hp4);
        Hx += interval_V;
      }
    }
    // 右側ハンチ
    Hz -= interval_V * j2;
    if (Amount === 1){
    } else {
      for (let i = 0; i < amount_S; i++){
        const Hp1x = Hx - Hdx3;
        const Hp2x = Hx - D / 2.0;
        const Hp3x = Hx + D / 2.0;
        const Hp4x = Hx + Hdx4;
        const Hp1z = Hz + ((Hdx3 - (D / 2.0)) / n);
        const Hp2z = Hz;
        const Hp3z = Hz + ((Hdx4 - (D / 2.0)) / n)
        const Hp1 = [Hp1x, Hy, Hp1z];
        const Hp2 = [Hp2x, Hy, Hp2z];
        const Hp3 = [Hp3x, Hy, Hp2z];
        const Hp4 = [Hp4x, Hy, Hp3z];
        points.push(Hp1, Hp2, Hp3, Hp4);
        point_b.push(Hp1, Hp2, Hp3, Hp4);
        Hx += interval_V;
        Hz -= interval_V * j2;
      }
    }

    points.push(a9, a10, a11, a12, a13, a14, a15);

    return [points, point_a, point_b] ;
  }

  public add_Slab(b1: number, b2: number, b3: number, i1: number, i2: number, j1: number, j2: number, H: number,
    T1: number, T2: number, n: number, s: number, D: number, L: number, amount_V: number, interval_V: number): THREE.Group {

    const points_BP = this.selection(b1, b2, b3, i1, i2, j1, j2, H, T1, T2, n, s, D, [0.0, 0.0, 0.0], amount_V, interval_V);
    const points_EP = this.selection(b1, b2, b3, i1, i2, j1, j2, H, T1, T2, n, s, D, [0.0, L, 0.0], amount_V, interval_V);
    const pointlist = [points_BP[0], points_EP[0]];

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

    const Lib1 = points_BP[1];
    const Lib2 = points_BP[2];
    const p1 = [Lib1[0], Lib1[1], Lib1[15]];
    const p2 = [Lib1[1], Lib1[2], Lib1[3]];
    const p3 = [Lib1[1], Lib1[3], Lib1[4]];
    const p4 = [Lib1[1], Lib1[4], Lib1[5]];
    const p5 = [Lib1[1], Lib1[5], Lib1[6]];
    const p6 = [Lib1[1], Lib1[6], Lib1[7]];
    const p7 = [Lib1[1], Lib1[7], Lib1[0]];
    const p8_0 = [Lib1[0], Lib1[7], Lib2[0]]
    const p8_1 = [Lib1[0], Lib1[9], Lib2[Lib2.length-1]]
    const p9 = [Lib1[0], Lib1[9], Lib1[15]];
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
    const m8_0 = this.pv.PolyData(p8_0, [3, 0, 1, 2]);
    const m8_1 = this.pv.PolyData(p8_1, [3, 0, 1, 2]);
    const m9 = this.pv.PolyData(p9, [3, 0, 1, 2]);
    const m10 = this.pv.PolyData(p10, [3, 0, 1, 2]);
    const m11 = this.pv.PolyData(p11, [3, 0, 1, 2]);
    const m12 = this.pv.PolyData(p12, [3, 0, 1, 2]);
    const m13 = this.pv.PolyData(p13, [3, 0, 1, 2]);
    const m14 = this.pv.PolyData(p14, [3, 0, 1, 2]);
    const Mesh_Lib1 = new THREE.Group();
    Mesh_Lib1.add(m1, m2, m3, m4, m5, m6, m7,m8_0, m8_1, m9, m10, m11, m12, m13, m14);
    let count = 0;

    for (let i = 0; i < amount_V - 2; i++) {
      const H0 = Lib1[0];
      const H1 = Lib2[count];
      const H2 = Lib2[count + 1];
      const H3 = Lib2[count + 2];
      const H4 = Lib2[count + 3];
      const Hp0 = [H0, H1, H4];
      const Hp1 = [H1, H2, H3];
      const Hp2 = [H1, H3, H4];
      const Hm0 = this.pv.PolyData(Hp0, [3, 0, 1, 2]);
      const Hm1 = this.pv.PolyData(Hp1, [3, 0, 1, 2]);
      const Hm2 = this.pv.PolyData(Hp2, [3, 0, 1, 2]);
      Mesh_Lib1.add(Hm0, Hm1, Hm2);
      count += 4;
    }
    if (amount_V % 2 === 0 ){
      count = (amount_V - 4) / 2 * 4 + 3;
      const H1 = Lib2[count];
      const H2 = Lib2[count + 1];
      const Hp1 = [Lib1[0], H1, Lib1[8]];
      const Hp2 = [Lib1[0], Lib1[8], H2];
      const Hm1 = this.pv.PolyData(Hp1, [3, 0, 1, 2]);
      const Hm2 = this.pv.PolyData(Hp2, [3, 0, 1, 2]);
      Mesh_Lib1.add(Hm1, Hm2);
    } else if (amount_V > 3){
      count = (amount_V - 5) / 2 * 4 + 3;
      const H1 = Lib2[count];
      const H2 = Lib2[count + 1];
      const H3 = Lib2[count + 4]
      const H4 = Lib2[count + 5]
      const Hp1 = [Lib1[0], H1, H2];
      const Hp2 = [Lib1[0], H3, H4];
      const Hm1 = this.pv.PolyData(Hp1, [3, 0, 1, 2]);
      const Hm2 = this.pv.PolyData(Hp2, [3, 0, 1, 2]);
      Mesh_Lib1.add(Hm1, Hm2);
    }
    const Mesh_Lib2 = this.Move.MoveObject(Mesh_Lib1, [0.0, L, 0.0]);
    Model.add(Mesh_Lib1, Mesh_Lib2)
    return Model;
  }

}
