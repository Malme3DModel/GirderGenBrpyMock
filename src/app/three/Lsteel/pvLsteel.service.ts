import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { pvRotateService } from '../libs/pvRotate.service';
import { pvTranlateService } from '../libs/pvTranlate.service';
import { pyVistaService } from '../libs/pyVista.service';

@Injectable({
  providedIn: 'root'
})
export class LsteelService {

  constructor(private pv: pyVistaService,
    private Rotate: pvRotateService,
    private Move: pvTranlateService) { }

  private Create_Lsteel_R(A: number, B: number, t: number, L: number): THREE.Group {
    const pointlist: number[][][] = [];
    const Obj = new THREE.Group();

    const b0 = [0.0, 0.0, 0.0];
    const b1 = [B, 0.0, 0.0];
    const b2 = [B, t, 0.0];
    const b3 = [t, t, 0.0];
    const b4 = [t, A, 0.0];
    const b5 = [0.0, A, 0.0];
    pointlist.push([b0, b1, b2, b3, b4, b5]);

    const a0 = [0.0, 0.0, L];
    const a1 = [B, 0.0, L];
    const a2 = [B, t, L];
    const a3 = [t, t, L];
    const a4 = [t, A, L];
    const a5 = [0.0, A, L];
    pointlist.push([a0, a1, a2, a3, a4, a5]);

    for (let i = 0; i < pointlist.length - 1; i++) {
      const A1 = pointlist[i];
      const A2 = pointlist[i + 1];
      let A3 = A1;  // 一番前の要素を一番後ろに
      A3.splice(0, 1).push(A1[0]);
      let A4 = A2;  // 一番前の要素を一番後ろに
      A4.splice(0, 1).push(A2[0]);
      for (let j = 0; j < A1.length; j++) {
        const Apoints = [A1[j], A3[j], A2[j]];
        const Bpoints = [A2[j], A4[j], A3[j]];
        const Mesh_A = this.pv.PolyData(Apoints, [3, 0, 1, 2]);
        const Mesh_B = this.pv.PolyData(Bpoints, [3, 0, 1, 2]);
        Obj.add(Mesh_B, Mesh_A);
      }
    }
    const Lib1 = pointlist[0];
    const Lib2 = pointlist[pointlist.length - 1];
    const p1 = [Lib1[0], Lib1[1], Lib1[2]];
    const p2 = [Lib1[0], Lib1[2], Lib1[3]];
    const p3 = [Lib1[0], Lib1[3], Lib1[4]];
    const p4 = [Lib1[0], Lib1[4], Lib1[5]];
    const p5 = [Lib2[0], Lib2[1], Lib2[2]];
    const p6 = [Lib2[0], Lib2[2], Lib2[3]];
    const p7 = [Lib2[0], Lib2[3], Lib2[4]];
    const p8 = [Lib2[0], Lib2[4], Lib2[5]];
    const m1 = this.pv.PolyData(p1, [3, 0, 1, 2]);
    const m2 = this.pv.PolyData(p2, [3, 0, 1, 2]);
    const m3 = this.pv.PolyData(p3, [3, 0, 1, 2]);
    const m4 = this.pv.PolyData(p4, [3, 0, 1, 2]);
    const m5 = this.pv.PolyData(p5, [3, 0, 1, 2]);
    const m6 = this.pv.PolyData(p6, [3, 0, 1, 2]);
    const m7 = this.pv.PolyData(p7, [3, 0, 1, 2]);
    const m8 = this.pv.PolyData(p8, [3, 0, 1, 2]);

    Obj.add(m1, m2, m3, m4, m5, m6, m7, m8);
    return Obj;
  }

  private Create_Lsteel_L(A: number, B: number, t: number, L: number) {
    const pointlist: number[][][] = [];
    const Obj = new THREE.Group();

    const b0 = [0.0, 0.0, 0.0];
    const b1 = [-B, 0.0, 0.0];
    const b2 = [-B, t, 0.0];
    const b3 = [-t, t, 0.0];
    const b4 = [-t, A, 0.0];
    const b5 = [0.0, A, 0.0];
    pointlist.push([b0, b1, b2, b3, b4, b5]);

    const a0 = [0.0, 0.0, L];
    const a1 = [-B, 0.0, L];
    const a2 = [-B, t, L];
    const a3 = [-t, t, L];
    const a4 = [-t, A, L];
    const a5 = [0.0, A, L];
    pointlist.push([a0, a1, a2, a3, a4, a5]);

    for (let i = 0; i < pointlist.length - 1; i++) {
      const A1 = pointlist[i];
      const A2 = pointlist[i + 1];
      let A3 = A1;  // 一番前の要素を一番後ろに
      A3.splice(0, 1).push(A1[0]);
      let A4 = A2;  // 一番前の要素を一番後ろに
      A4.splice(0, 1).push(A2[0]);
      for (let j = 0; j < A1.length; j++) {
        const Apoints = [A1[j], A3[j], A2[j]];
        const Bpoints = [A2[j], A4[j], A3[j]];
        const Mesh_A = this.pv.PolyData(Apoints, [3, 0, 1, 2]);
        const Mesh_B = this.pv.PolyData(Bpoints, [3, 0, 1, 2]);
        Obj.add(Mesh_A, Mesh_B);
      }
    }
    const Lib1 = pointlist[0];
    const Lib2 = pointlist[pointlist.length - 1];
    const p1 = [Lib1[0], Lib1[1], Lib1[2]];
    const p2 = [Lib1[0], Lib1[2], Lib1[3]];
    const p3 = [Lib1[0], Lib1[3], Lib1[4]];
    const p4 = [Lib1[0], Lib1[4], Lib1[5]];
    const p5 = [Lib2[0], Lib2[1], Lib2[2]];
    const p6 = [Lib2[0], Lib2[2], Lib2[3]];
    const p7 = [Lib2[0], Lib2[3], Lib2[4]];
    const p8 = [Lib2[0], Lib2[4], Lib2[5]];
    const m1 = this.pv.PolyData(p1, [3, 0, 1, 2]);
    const m2 = this.pv.PolyData(p2, [3, 0, 1, 2]);
    const m3 = this.pv.PolyData(p3, [3, 0, 1, 2]);
    const m4 = this.pv.PolyData(p4, [3, 0, 1, 2]);
    const m5 = this.pv.PolyData(p5, [3, 0, 1, 2]);
    const m6 = this.pv.PolyData(p6, [3, 0, 1, 2]);
    const m7 = this.pv.PolyData(p7, [3, 0, 1, 2]);
    const m8 = this.pv.PolyData(p8, [3, 0, 1, 2]);

    Obj.add(m1, m2, m3, m4, m5, m6, m7, m8);
    return Obj;
  }

  private exchange(obj: THREE.Object3D, y_rotate: number, coordinate: number[]): THREE.Object3D {
    const Mesh = this.Rotate.rotate(obj, [0.0, 0.0, 0.0], 0.0, y_rotate, 0.0);
    const Model = this.Move.MoveObject(Mesh, coordinate);
    return Model;
  }

  /// <summary>対傾構を作成</summary>
  /// <param name="D">対傾構のx方向の長さ</param>
  /// <param name="D">対傾構のy方向の長さ</param>
  /// <param name="s_c">内側の離隔</param>
  /// <param name="s_e">外側の離隔</param>
  private add_LSteel_R(A: number, B: number, t: number, H: number, D: number,
    s_in: number, s_out: number, dz: number, tf: number): THREE.Object3D {

    const L = Math.sqrt(H ** 2.0 + D ** 2.0) - (s_in + s_out);
    const x = (s_in * D) / (L + s_in);
    const z = (s_in * H) / (L + s_in) + dz + tf;
    const Obj = this.Create_Lsteel_R(A, B, t, L);
    const y_rotate_R = Math.round(this.pv.degrees(Math.atan(D / H)) * 10) / 10;
    const Model_R = this.exchange(Obj, y_rotate_R, [x, 0.0, z]);
    return Model_R;
  }

  private add_LSteel_L(A: number, B: number, t: number, H: number, D: number,
    s_in: number, s_out: number, dz: number, tf: number): THREE.Object3D {
    const L = Math.sqrt(H ** 2.0 + D ** 2.0) - (s_in + s_out);
    const x = -(s_in * D) / (L + s_in);
    const z = (s_in * H) / (L + s_in) + dz + tf;
    const Obj = this.Create_Lsteel_L(A, B, t, L);
    const y_rotate_L = -Math.round(this.pv.degrees(Math.atan(D / H)) * 10) / 10;
    const Model_L = this.exchange(Obj, y_rotate_L, [x, 0.0, z]);
    return Model_L;
  }

  private add_LSteel_T(A: number, B: number, t: number, s: number, H: number, D: number,
    dz: number, tf: number): THREE.Object3D {
    const L = D * 2.0 - (s * 2.0);
    const x = L / 2.0;
    const z = H + dz + tf;
    const Obj = this.Create_Lsteel_L(A, B, t, L);
    const Model_T = this.exchange(Obj, -90.0, [x, 0.0, z]);
    return Model_T;
  }

  private add_LSteel_D(A: number, B: number, t: number, s: number, D: number,
    dz: number, tf: number): THREE.Object3D {
    const L = D * 2.0 - (s * 2.0);
    const x = L / 2.0;
    const z = dz + tf;
    const Obj = this.Create_Lsteel_L(A, B, t, L);
    const Model_T = this.exchange(Obj, 90.0, [-x, 0.0, z]);
    return Model_T;
  }

  public add_LSteel(A: number, B: number, t: number, H: number, D: number, s: number,
    s_in: number, s_out: number, dz: number, tf: number): THREE.Group {

    const Model_R = this.add_LSteel_R(A, B, t, H, D, s_in, s_out, dz, tf);
    const Model_L = this.add_LSteel_L(A, B, t, H, D, s_in, s_out, dz, tf);
    const Model_T = this.add_LSteel_T(A, B, t, s, H, D, dz, tf);
    const Model_D = this.add_LSteel_D(A, B, t, s, D, dz, tf);

    const Model = new THREE.Group();
    Model.add(Model_L, Model_R, Model_T, Model_D);
    return Model;
  }


}
