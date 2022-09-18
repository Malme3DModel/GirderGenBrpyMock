import { AfterViewInit, Component, ElementRef, ViewChild, HostListener, NgZone, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { pvGirderService } from './geo/pvGirder.service';

import { SceneService } from './scene.service';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss'],
})
export class ThreeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('myCanvas', { static: true }) private canvasRef!: ElementRef;


  constructor(private ngZone: NgZone,
              private scene: SceneService,
              private model: pvGirderService) {

    THREE.Object3D.DefaultUp.set(0, 0, 1);
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  ngAfterViewInit() {
    this.scene.OnInit(window.devicePixelRatio,
                      this.canvas,
                      devicePixelRatio,
                      window.innerWidth,
                      window.innerHeight);
    // レンダリングする
    this.animate();
    
    // モデルを呼び出す
    // this.model.OnInit();
    // this.geo.loadStl();
  }

  ngOnDestroy() {
  }

  animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('DOMContentLoaded', () => {
      this.scene.render();
      });
    });
  }

  // マウスクリック時のイベント
  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: MouseEvent) {
  }

  // マウスクリック時のイベント
  @HostListener('mouseup', ['$event'])
  public onMouseUp(event: MouseEvent) {
  }

  // マウス移動時のイベント
  @HostListener('mousemove', ['$event'])
  public onMouseMove(event: MouseEvent) {
  }

  // ウインドウがリサイズした時のイベント処理
  @HostListener('window:resize', ['$event'])
  public onResize(event: Event) {
    this.scene.onResize(window.devicePixelRatio,
                        window.innerWidth,
                        window.innerHeight);
  }


}
