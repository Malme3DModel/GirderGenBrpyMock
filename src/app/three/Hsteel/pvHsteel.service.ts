import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { pyVistaService } from '../libs/pyVista.service';

@Injectable({
  providedIn: 'root'
})
export class HsteelService {

  constructor(private pv: pyVistaService) { }


  public CreateBeam(L: number, D: number, W: number, tf: number, tw: number,
    position: number[]): THREE.Group {

    const x = position[0];
    const y = position[1];
    const z = position[2];

    const dx1 = tw / 2.0;
    const dx2 = D / 2.0;
    const dz1 = W / 2.0;
    const dz2 = dz1 + tf;

    const a1 = [x - dx1, y, z - dz1];
    const a2 = [x - dx2, y, z - dz1];
    const a3 = [x - dx2, y, z - dz2];
    const a4 = [x + dx2, y, z - dz2];
    const a5 = [x + dx2, y, z - dz1];
    const a6 = [x + dx1, y, z - dz1];
    const a7 = [x + dx1, y, z + dz1];
    const a8 = [x + dx2, y, z + dz1];
    const a9 = [x + dx2, y, z + dz2];
    const a10 = [x - dx2, y, z + dz2];
    const a11 = [x - dx2, y, z + dz1];
    const a12 = [x - dx1, y, z + dz1];

    const b1 = [x - dx1, y + L, z - dz1];
    const b2 = [x - dx2, y + L, z - dz1];
    const b3 = [x - dx2, y + L, z - dz2];
    const b4 = [x + dx2, y + L, z - dz2];
    const b5 = [x + dx2, y + L, z - dz1];
    const b6 = [x + dx1, y + L, z - dz1];
    const b7 = [x + dx1, y + L, z + dz1];
    const b8 = [x + dx2, y + L, z + dz1];
    const b9 = [x + dx2, y + L, z + dz2];
    const b10 = [x - dx2, y + L, z + dz2];
    const b11 = [x - dx2, y + L, z + dz1];
    const b12 = [x - dx1, y + L, z + dz1];

    const p1 = [a1, a2, b1];
    const p2 = [a2, a3, b2];
    const p3 = [a3, a4, b3];
    const p4 = [a4, a5, b4];
    const p5 = [a5, a6, b5];
    const p6 = [a6, a7, b6];
    const p7 = [a7, a8, b7];
    const p8 = [a8, a9, b8];
    const p9 = [a9, a10, b9];
    const p10 = [a10, a11, b10];
    const p11 = [a11, a12, b11];
    const p12 = [a12, a1, b12];
    const p13 = [b2, b1, a2];
    const p14 = [b3, b2, a3];
    const p15 = [b4, b3, a4];
    const p16 = [b5, b4, a5];
    const p17 = [b6, b5, a6];
    const p18 = [b7, b6, a7];
    const p19 = [b8, b7, a8];
    const p20 = [b9, b8, a9];
    const p21 = [b10, b9, a10];
    const p22 = [b11, b10, a11];
    const p23 = [b12, b11, a12];
    const p24 = [b1, b12, a1];

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
    const m15 = this.pv.PolyData(p15, [3, 0, 1, 2]);
    const m16 = this.pv.PolyData(p16, [3, 0, 1, 2]);
    const m17 = this.pv.PolyData(p17, [3, 0, 1, 2]);
    const m18 = this.pv.PolyData(p18, [3, 0, 1, 2]);
    const m19 = this.pv.PolyData(p19, [3, 0, 1, 2]);
    const m20 = this.pv.PolyData(p20, [3, 0, 1, 2]);
    const m21 = this.pv.PolyData(p21, [3, 0, 1, 2]);
    const m22 = this.pv.PolyData(p22, [3, 0, 1, 2]);
    const m23 = this.pv.PolyData(p23, [3, 0, 1, 2]);
    const m24 = this.pv.PolyData(p24, [3, 0, 1, 2]);

    const l1 = [a2, a3, a4]
    const l2 = [a2, a4, a5]
    const l3 = [a1, a6, a7]
    const l4 = [a1, a7, a12]
    const l5 = [a8, a9, a10]
    const l6 = [a8, a10, a11]
    const l7 = [b2, b3, b4]
    const l8 = [b2, b4, b5]
    const l9 = [b1, b6, b7]
    const l10 = [b1, b7, b12]
    const l11 = [b8, b9, b10]
    const l12 = [b8, b10, b11]

    const m25 = this.pv.PolyData(l1, [3, 0, 1, 2])
    const m26 = this.pv.PolyData(l2, [3, 0, 1, 2])
    const m27 = this.pv.PolyData(l3, [3, 0, 1, 2])
    const m28 = this.pv.PolyData(l4, [3, 0, 1, 2])
    const m29 = this.pv.PolyData(l5, [3, 0, 1, 2])
    const m30 = this.pv.PolyData(l6, [3, 0, 1, 2])
    const m31 = this.pv.PolyData(l7, [3, 0, 1, 2])
    const m32 = this.pv.PolyData(l8, [3, 0, 1, 2])
    const m33 = this.pv.PolyData(l9, [3, 0, 1, 2])
    const m34 = this.pv.PolyData(l10, [3, 0, 1, 2])
    const m35 = this.pv.PolyData(l11, [3, 0, 1, 2])
    const m36 = this.pv.PolyData(l12, [3, 0, 1, 2])

    const H_list = new THREE.Group();

    H_list.add(m1);
    H_list.add(m2);
    H_list.add(m3);
    H_list.add(m4);
    H_list.add(m5);
    H_list.add(m6);
    H_list.add(m7);
    H_list.add(m8);
    H_list.add(m9);
    H_list.add(m10);
    H_list.add(m11);
    H_list.add(m12);
    H_list.add(m13);
    H_list.add(m14);
    H_list.add(m15);
    H_list.add(m16);
    H_list.add(m17);
    H_list.add(m18);
    H_list.add(m19);
    H_list.add(m20);
    H_list.add(m21);
    H_list.add(m22);
    H_list.add(m23);
    H_list.add(m24);

    H_list.add(m25);
    H_list.add(m26);
    H_list.add(m27);
    H_list.add(m28);
    H_list.add(m29);
    H_list.add(m30);
    H_list.add(m31);
    H_list.add(m32);
    H_list.add(m33);
    H_list.add(m34);
    H_list.add(m35);
    H_list.add(m36);

    return H_list;

  }
}
