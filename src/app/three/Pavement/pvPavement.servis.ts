import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { pvTranlateService } from '../libs/pvTranlate.service';
import { pyVistaService } from '../libs/pyVista.service';

@Injectable({
  providedIn: 'root'
})
export class AddPavementService {

  constructor(private pv: pyVistaService,
    private Move: pvTranlateService) { }

  private selection(b1: number, b2: number, i1: number, i2: number, i3: number, i4: number, T: number,position: number[]){

    const x = position[0];
    const y = position[1];
    const z = position[2];
    const dx1 = -b1;
    const dx2 = b2;
    const dz1 = -b1 * i1;
    const dz2 = T - b1 * i3;
    const dz3 = T;
    const dz4 = -b2 * i2;
    const dz5 = T - b2 * i4;
    const x1 = x + dx1;
    const x2 = x + dx2;
    const z1 = z + dz1;
    const z2 = z + dz2;
    const z3 = z + dz3;
    const z4 = z + dz4;
    const z5 = z + dz5;
    const a0 = [x, y, z];
    const a1 = [x1, y, z1];
    const a2 = [x1, y, z2];
    const a3 = [x, y, z3];
    const a4 = [x2, y, z5];
    const a5 = [x2, y, z4];

    const points = [a0, a1, a2, a3, a4, a5];

    return points ;
  }

  private add_Pavement(b1: number, b2: number,i1: number, i2: number,i3: number, i4: number, T: number, L: number,position: number[]): THREE.Group {
    const x = position[0];
    const z = position[2];
    const points_BP = this.selection(b1, b2, i1, i2, i3, i4, T, [x, 0.0, z]);
    const points_EP = this.selection(b1, b2, i1, i2, i3, i4, T, [x, L, z]);
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

    const Lib1 = points_BP;
    const p1 = [Lib1[0], Lib1[1], Lib1[2]];
    const p2 = [Lib1[0], Lib1[2], Lib1[3]];
    const p3 = [Lib1[0], Lib1[3], Lib1[4]];
    const p4 = [Lib1[0], Lib1[4], Lib1[5]];
    const m1 = this.pv.PolyData(p1, [3, 0, 1, 2]);
    const m2 = this.pv.PolyData(p2, [3, 0, 1, 2]);
    const m3 = this.pv.PolyData(p3, [3, 0, 1, 2]);
    const m4 = this.pv.PolyData(p4, [3, 0, 1, 2]);
    const Mesh_Lib1 = new THREE.Group();
    Mesh_Lib1.add(m1, m2, m3, m4);
    const Mesh_Lib2 = this.Move.MoveObject(Mesh_Lib1, [0.0, L, 0.0]);
    Model.add(Mesh_Lib1, Mesh_Lib2)
    return Model;
  }

// 後で舗装増やす用
  public createPavement(b1: number, b2: number,i1: number, i2: number, i3: number, i4: number,T: number, L: number): THREE.Group {
    const Model = new THREE.Group();
    const Pave1 = this.add_Pavement(b1,b2,i1,i2,i3,i4,T,L,[0.0,0.0,0.0])
    Pave1.name = "Pv_01"
    Model.add(Pave1)
    return Model
  }
}
