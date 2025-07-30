import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { UISettingsService } from '../../service/ui-settings.service';

@Injectable({
  providedIn: 'root'
})
export class pyVistaService {

  constructor(private uiSettingsService: UISettingsService) { }

  public PolyData(poi: number[][], list: number[]): THREE.Mesh {

    const points = []
    for (let p of poi) {
      const n1 = list[1];
      const n2 = list[2];
      const n3 = list[3];
      points.push(new THREE.Vector3(p[n1], p[n2], p[n3]));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const settings = this.uiSettingsService.getSettings();
    const modelColor = this.uiSettingsService.getModelColor();
    
    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      color: modelColor,
      opacity: 0.85,
      wireframe: settings.viewport3d.wireframe
    });

    const mesh = new THREE.Mesh(geometry, material);

    // ワイヤーフレームを追加する（設定で有効な場合のみ）
    if (!settings.viewport3d.wireframe) {
      const edges = new THREE.EdgesGeometry( geometry );
      const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
      mesh.add( line );
    }

    return mesh;
  }

  public degrees(radian: number): number {
    return radian * (180 / Math.PI);
  }

}
