import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SceneService } from '../scene.service';
import * as THREE from 'three';

import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private stlLoader: STLLoader = new STLLoader();

  constructor(
    private http: HttpClient,
    private scene: SceneService) { }

  public loadStl() {

    //const model = this.get_stl();
    this.stlLoader.load('assets/model/model.stl',  ( geometry: THREE.BufferGeometry ) => {

    

      const material1 = new THREE.MeshPhongMaterial( { color: 0x000000, wireframe: true } );
      const mesh1 = new THREE.Mesh( geometry, material1 );
      mesh1.position.set( -450, -300, -65 );
      mesh1.scale.set( 0.001, 0.001, 0.001 );
      this.scene.add( mesh1 );

      const material2 = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
      const mesh2 = new THREE.Mesh( geometry, material2 );
      mesh2.position.set( -450, -300, -65 );
      mesh2.scale.set( 0.001, 0.001, 0.001 );
      this.scene.add( mesh2 );
      this.scene.render();

    });

  }


}
