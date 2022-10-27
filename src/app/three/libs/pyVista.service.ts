import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class pyVistaService {

  constructor() { }

  public PolyData(poi: number[][], list: number[]): THREE.Mesh {

    const points = []
    for (let p of poi) {
      const n1 = list[1];
      const n2 = list[2];
      const n3 = list[3];
      points.push(new THREE.Vector3(p[n1], p[n2], p[n3]));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      color: 0x7f8F9F,
      opacity: 0.85,
    });

    const mesh = new THREE.Mesh(geometry, material);

    // ワイヤーフレームを追加する
    const edges = new THREE.EdgesGeometry( geometry );
    const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
    mesh.add( line );

    return mesh;
  }

  public degrees(radian: number): number {
    return radian * (180 / Math.PI);
  }

}
