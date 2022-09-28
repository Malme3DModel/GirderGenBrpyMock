import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class pvRotateService {

  constructor() { }

  public rotate(obj: THREE.Object3D, point: number[], x_rotate: number, y_rotate: number, z_rotate: number): THREE.Object3D {

    const origine = new THREE.Vector3(point[0], point[1], point[2]);

    const x = Math.floor(x_rotate);
    const y = Math.floor(y_rotate);
    const z = Math.floor(z_rotate);

    let Mesh = obj.clone();


    const Model_x = Mesh.rotateX(x * Math.PI / 180.0);
    const Model_xy = Model_x.rotateY(y * Math.PI / 180.0);
    const Model = Model_xy.rotateZ(z * Math.PI / 180.0);

    return Model
  }


}
