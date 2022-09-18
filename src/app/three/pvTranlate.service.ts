import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class pvTranlateService {

  constructor() { }

  /// <summary>移動</summary>
  /// <param name="coordinate">移動先の座標</param>
  public MoveObject(obj: THREE.Object3D, coordinate: number[]): THREE.Object3D {

    const point = new THREE.Vector3(coordinate[0], coordinate[1], coordinate[2]);

    const Mesh = obj.clone();
    Mesh.position.set(point.x, point.y, point.z);
    return Mesh
  }
}
