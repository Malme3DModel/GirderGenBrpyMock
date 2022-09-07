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
  private H1: THREE.Group;
  private H2: THREE.Group;
  private H3: THREE.Group;

  constructor(private scene: SceneService) {
    this.slab=this.create(0x00ff00);
    this.scene.add( this.slab );
    this.H1 = this.createH(0xff0000);
    this.scene.add( this.H1 );
    this.H2 = this.createH(0xff0000);
    this.scene.add( this.H2 );
    this.H3 = this.createH(0xff0000);
    this.scene.add( this.H3 );
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

        // H鋼
        this.H1.scale.set( BB/1000, L/1000, HH/1000);
        this.H1.position.set(-B1/3000, 0, 0);
        // H鋼
        this.H2.scale.set( BB/1000, L/1000, HH/1000);
        this.H2.position.set(0, 0, 0);
        // H鋼
        this.H3.scale.set( BB/1000, L/1000, HH/1000);
        this.H3.position.set(B1/3000, 0, 0);

        this.scene.render();
  }

  download() {
    const result = this.Exporter.parse(this.scene.scene);
    const blob = new window.Blob([result], { type: "text/plain" });
    FileSaver.saveAs(blob, 'test.stl');
  }


}
