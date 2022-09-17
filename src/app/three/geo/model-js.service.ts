import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { SceneService } from '../scene.service';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter'
import * as FileSaver from "file-saver";

@Injectable({
  providedIn: 'root'
})
export class ModelJsService {

  private Exporter: OBJExporter = new OBJExporter();

  private slab: THREE.Mesh;
  private H_list: THREE.Group;
  // private H1: THREE.Group;
  // private H2: THREE.Group;
  // private H3: THREE.Group;

  constructor(private scene: SceneService) {
    // デフォルトを生成
    this.slab=this.create(0x00ff00);
    this.scene.add( this.slab );

    this.H_list = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      this.H_list.add( this.createH(0xff0000) );

    }
    this.scene.add(this.H_list)
  }

  private create(color: THREE.ColorRepresentation): THREE.Mesh {
    // スラブをあらかじめ作成しておく
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color, transparent :true, opacity: 0.5} );
    const slab = new THREE.Mesh( geometry, material );
    // ワイヤフレーム
    const material2 = new THREE.MeshBasicMaterial( {color: 0x000000, wireframe :true} );
    const wf = new THREE.Mesh( geometry, material2 );
    slab.add(wf);
    return slab;
  }

  private createH(color: THREE.ColorRepresentation): THREE.Group {
    const g = new THREE.Group();

    const uFlg = this.create(color);
    uFlg.scale.set( 1, 1, 0.1);
    uFlg.position.set(0, 0, 1);
    g.add(uFlg)

    const bFlg = this.create(color);
    bFlg.scale.set( 1, 1, 0.1);
    bFlg.position.set(0, 0, 0);
    g.add(bFlg)

    const Web = this.create(color);
    Web.scale.set( 0.1, 1, 1);
    Web.position.set(0, 0, 0.5);
    g.add(Web)

    return g;
  }


  public reSetModel(L: number, B1: number, B3: number,
      T1: number, T2: number, HH: number, BB: number, TT1: number, TT2: number, n: number) {

        // スラブ
        this.slab.scale.set( B1/1000, L/1000, T1/1000);
        this.slab.position.set(0, 0, HH/1000+T1/2000);

        const start = -B1/3000;
        const span = B1/3000;
        for (let i = 0; i < n; i++) {
          const H = this.H_list.children[i];
          H.scale.set( BB/1000, L/1000, HH/1000);
          H.position.set(start + span * i, 0, 0);
        // }
        // H鋼
        // this.H1.scale.set( BB/1000, L/1000, HH/1000);
        // this.H1.position.set(-B1/3000, 0, 0);
        // H鋼
        // this.H2.scale.set( BB/1000, L/1000, HH/1000);
        // this.H2.position.set(0, 0, 0);
        // H鋼
        // this.H3.scale.set( BB/1000, L/1000, HH/1000);
        // this.H3.position.set(B1/3000, 0, 0);
        for (let i = 0; i < n; i++ ) {
          // 変数を代入できるようにする
          const Model = this.CreateBeam();
          if (i === 1) {
            Model.position.set(-2, 0, 0)
          } else if (i === 2) {
            Model.position.set(0, 0, 0)
          } else {
            Model.position.set(2, 0, 0)
          }
          this.scene.add(Model);
        }
        this.scene.render();
    }
  }

  // 変数設定の必要がある. 寸法やposition
  private CreateBeam() {
    const position = [0.0, 0.0, 0.0];
    const tw = 0.012;
    const D = 0.40;
    const W = 0.80;
    const tf = 0.012;
    const L = 20;

    const x = position[0];
    const y = position[1];
    const z = position[2];

    const dx1 = tw / 2.0;
    const dx2 = D / 2.0;
    const dz1 = W / 2.0;
    const dz2 = dz1 + tf;

    const a1 = [x-dx1, y, z-dz1];
    const a2 = [x-dx2, y, z-dz1];
    const a3 = [x-dx2, y, z-dz2];
    const a4 = [x+dx2, y, z-dz2];
    const a5 = [x+dx2, y, z-dz1];
    const a6 = [x+dx1, y, z-dz1];
    const a7 = [x+dx1, y, z+dz1];
    const a8 = [x+dx2, y, z+dz1];
    const a9 = [x+dx2, y, z+dz2];
    const a10 = [x-dx2, y, z+dz2];
    const a11 = [x-dx2, y, z+dz1];
    const a12 = [x-dx1, y, z+dz1];

    const b1 = [x-dx1, y+L, z-dz1];
    const b2 = [x-dx2, y+L, z-dz1];
    const b3 = [x-dx2, y+L, z-dz2];
    const b4 = [x+dx2, y+L, z-dz2];
    const b5 = [x+dx2, y+L, z-dz1];
    const b6 = [x+dx1, y+L, z-dz1];
    const b7 = [x+dx1, y+L, z+dz1];
    const b8 = [x+dx2, y+L, z+dz1];
    const b9 = [x+dx2, y+L, z+dz2];
    const b10 = [x-dx2, y+L, z+dz2];
    const b11 = [x-dx2, y+L, z+dz1];
    const b12 = [x-dx1, y+L, z+dz1];

    const p1 = [a1,a2,b1];
    const p2 = [a2,a3,b2];
    const p3 = [a3,a4,b3];
    const p4 = [a4,a5,b4];
    const p5 = [a5,a6,b5];
    const p6 = [a6,a7,b6];
    const p7 = [a7,a8,b7];
    const p8 = [a8,a9,b8];
    const p9 = [a9,a10,b9];
    const p10 = [a10,a11,b10];
    const p11 = [a11,a12,b11];
    const p12 = [a12,a1,b12];
    const p13 = [b2,b1,a2];
    const p14 = [b3,b2,a3];
    const p15 = [b4,b3,a4];
    const p16 = [b5,b4,a5];
    const p17 = [b6,b5,a6];
    const p18 = [b7,b6,a7];
    const p19 = [b8,b7,a8];
    const p20 = [b9,b8,a9];
    const p21 = [b10,b9,a10];
    const p22 = [b11,b10,a11];
    const p23 = [b12,b11,a12];
    const p24 = [b1,b12,a1];

    const m1 = this.PolyData(p1, [3, 0, 1, 2]);
    const m2 = this.PolyData(p2, [3, 0, 1, 2]);
    const m3 = this.PolyData(p3, [3, 0, 1, 2]);
    const m4 = this.PolyData(p4, [3, 0, 1, 2]);
    const m5 = this.PolyData(p5, [3, 0, 1, 2]);
    const m6 = this.PolyData(p6, [3, 0, 1, 2]);
    const m7 = this.PolyData(p7, [3, 0, 1, 2]);
    const m8 = this.PolyData(p8, [3, 0, 1, 2]);
    const m9 = this.PolyData(p9, [3, 0, 1, 2]);
    const m10 = this.PolyData(p10, [3, 0, 1, 2]);
    const m11 = this.PolyData(p11, [3, 0, 1, 2]);
    const m12 = this.PolyData(p12, [3, 0, 1, 2]);
    const m13 = this.PolyData(p13, [3, 0, 1, 2]);
    const m14 = this.PolyData(p14, [3, 0, 1, 2]);
    const m15 = this.PolyData(p15, [3, 0, 1, 2]);
    const m16 = this.PolyData(p16, [3, 0, 1, 2]);
    const m17 = this.PolyData(p17, [3, 0, 1, 2]);
    const m18 = this.PolyData(p18, [3, 0, 1, 2]);
    const m19 = this.PolyData(p19, [3, 0, 1, 2]);
    const m20 = this.PolyData(p20, [3, 0, 1, 2]);
    const m21 = this.PolyData(p21, [3, 0, 1, 2]);
    const m22 = this.PolyData(p22, [3, 0, 1, 2]);
    const m23 = this.PolyData(p23, [3, 0, 1, 2]);
    const m24 = this.PolyData(p24, [3, 0, 1, 2]);

    const l1 = [a2,a3,a4]
    const l2 = [a2,a4,a5]
    const l3 = [a1,a6,a7]
    const l4 = [a1,a7,a12]
    const l5 = [a8,a9,a10]
    const l6 = [a8,a10,a11]
    const l7 = [b2,b3,b4]
    const l8 = [b2,b4,b5]
    const l9 = [b1,b6,b7]
    const l10 = [b1,b7,b12]
    const l11 = [b8,b9,b10]
    const l12 = [b8,b10,b11]

    const m25 = this.PolyData(l1, [3, 0, 1, 2])
    const m26 = this.PolyData(l2, [3, 0, 1, 2])
    const m27 = this.PolyData(l3, [3, 0, 1, 2])
    const m28 = this.PolyData(l4, [3, 0, 1, 2])
    const m29 = this.PolyData(l5, [3, 0, 1, 2])
    const m30 = this.PolyData(l6, [3, 0, 1, 2])
    const m31 = this.PolyData(l7, [3, 0, 1, 2])
    const m32 = this.PolyData(l8, [3, 0, 1, 2])
    const m33 = this.PolyData(l9, [3, 0, 1, 2])
    const m34 = this.PolyData(l10, [3, 0, 1, 2])
    const m35 = this.PolyData(l11, [3, 0, 1, 2])
    const m36 = this.PolyData(l12, [3, 0, 1, 2])

    const H_list = new THREE.Group();

    H_list.add( m1 );
    H_list.add( m2 );
    H_list.add( m3 );
    H_list.add( m4 );
    H_list.add( m5 );
    H_list.add( m6 );
    H_list.add( m7 );
    H_list.add( m8 );
    H_list.add( m9 );
    H_list.add( m10);
    H_list.add( m11);
    H_list.add( m12);
    H_list.add( m13);
    H_list.add( m14);
    H_list.add( m15);
    H_list.add( m16);
    H_list.add( m17);
    H_list.add( m18);
    H_list.add( m19);
    H_list.add( m20);
    H_list.add( m21);
    H_list.add( m22);
    H_list.add( m23);
    H_list.add( m24);

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

  private PolyData(poi: number[][], list:number[]){

    const points = []
    for(let p of poi){
      points.push(new THREE.Vector3(p[0], p[1], p[2]));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      color: 0x7f8F9F,
      opacity: 0.7,
    });

    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }

  download() {
    const result = this.Exporter.parse(this.scene.scene);
    const blob = new window.Blob([result], { type: "text/plain" });
    FileSaver.saveAs(blob, 'test.obj');
  }


}
