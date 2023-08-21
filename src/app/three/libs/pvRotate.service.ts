import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class pvRotateService {

  constructor() { }

  public rotate(obj: THREE.Object3D, point: number[], x_rotate: number, y_rotate: number, z_rotate: number): THREE.Object3D {

    const origine = new THREE.Vector3(point[0], point[1], point[2]);

    const x = (x_rotate) * Math.PI / 180.0;
    const y = (y_rotate) * Math.PI / 180.0;
    const z = (z_rotate) * Math.PI / 180.0;

    let Mesh = obj.clone();

    Mesh.rotation.set(x, y, z);

    return Mesh;
  }

}
