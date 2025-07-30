import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from '@three-ts/orbit-controls';
import { UISettingsService } from '../service/ui-settings.service';

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  // シーン
  public scene: THREE.Scene;

  // レンダラー
  private renderer!: THREE.WebGLRenderer;

  // カメラ
  public camera!: THREE.OrthographicCamera;
  private aspectRatio: number = 0;
  private Width: number = 0;
  private Height: number = 0;

  public controls!: OrbitControls;

   // 初期化
  public  constructor(private uiSettingsService: UISettingsService) {
    // シーンを作成
    this.scene = new THREE.Scene();
    // シーンの背景を設定
    this.updateBackgroundColor();
    // レンダラーをバインド
    this.render = this.render.bind(this);

  }

  public OnInit(aspectRatio: number,
                canvasElement: HTMLCanvasElement,
                deviceRatio: number,
                Width: number,
                Height: number): void {
    // カメラ
    this.aspectRatio = aspectRatio;
    this.Width = Width;
    this.Height = Height;
    this.createCamera(aspectRatio, Width, Height);
    // 環境光源
    this.updateLighting();
    // レンダラー
    this.createRender(canvasElement,
                      deviceRatio,
                      Width,
                      Height);
    // コントロール
    this.addControls();

  }


  // 床面を生成する
  private createHelper() {
    return; // 無効にした
    const axisHelper = new THREE.AxesHelper(200);
    axisHelper.name = "axisHelper";
    this.scene.add(axisHelper);
  }

  // コントロール
  public addControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.addEventListener('change', this.render);
    this.controls.target.set(0, 10, 0); // 注視点のデフォルトの位置
    this.controls.update();
  }

  // カメラの初期化
  public createCamera(aspectRatio: number,
                      Width: number, Height: number ) {

    aspectRatio = (aspectRatio === null) ? this.aspectRatio : aspectRatio;
    Width = (Width === null) ? this.Width : Width;
    Height = (Height === null) ? this.Height : Height;

    const target = this.scene.getObjectByName('camera');
    if (target !== undefined) {
      this.scene.remove(this.camera);
    }
    this.camera = new THREE.OrthographicCamera(
      -Width / 50,
      Width / 50,
      Height / 50,
      -Height / 50,
      -1000,
      1000
    );
    this.camera.position.set(10, -5, 5);
    this.camera.name = 'camera';
    this.scene.add(this.camera);

  }

  // レンダラーを初期化する
  public createRender(canvasElement: HTMLCanvasElement,
                      deviceRatio: number,
                      Width: number,
                      Height: number): void {
    this.renderer = new THREE.WebGLRenderer({
      preserveDrawingBuffer: true,
      canvas: canvasElement,
      alpha: false,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setPixelRatio(deviceRatio);
    this.renderer.setSize(Width, Height);
    this.renderer.shadowMap.enabled = true;
  }


  // リサイズ
  public onResize(deviceRatio: number,
                  Width: number,
                  Height: number): void {

    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(deviceRatio);
    this.renderer.setSize(Width, Height);
    this.render();
  }

  // レンダリングする
  public render() {
    this.renderer.render(this.scene, this.camera);
  }

  // レンダリングのサイズを取得する
  public getBoundingClientRect(): ClientRect | DOMRect  {
    return this.renderer.domElement.getBoundingClientRect();
  }

  // シーンにオブジェクトを追加する
  public add(...threeObject: THREE.Object3D[]): void {
    for (const obj of threeObject) {
      this.scene.add(obj);
    }
  }

  // シーンのオブジェクトを削除する
  public remove(...threeObject: THREE.Object3D[]): void {
    for (const obj of threeObject) {
      this.scene.remove(obj);
    }
  }

  // シーンにオブジェクトを削除する
  public removeByName(...threeName: string[]): void {
    for (const name of threeName) {
      const target = this.scene.getObjectByName(name);
      if (target === undefined) {
        continue;
      }
      this.scene.remove(target);
    }
  }

  // ファイルに視点を保存する
  public getSettingJson(): any {
    return {
      camera: {
        x: this.camera.position.x,
        y: this.camera.position.y,
        z: this.camera.position.z,
      }
    };
  }

  public clear(): void {
    while(this.scene.children.length > 0){
      const mesh = this.scene.children[0];
      this.scene.remove(mesh);
    }
    // 床面を生成する
     this.createHelper();

  }

  public updateBackgroundColor(): void {
    const backgroundColor = this.uiSettingsService.getBackgroundColor();
    this.scene.background = new THREE.Color(backgroundColor);
  }

  public updateLighting(): void {
    const settings = this.uiSettingsService.getSettings();
    
    const existingLight = this.scene.children.find(child => child instanceof THREE.AmbientLight);
    if (existingLight) {
      this.scene.remove(existingLight);
    }

    let lightColor = 0xf0f0f0;
    let intensity = 1.0;

    switch (settings.viewport3d.lighting) {
      case 'bright':
        lightColor = 0xffffff;
        intensity = 1.5;
        break;
      case 'dark':
        lightColor = 0x808080;
        intensity = 0.5;
        break;
      case 'custom':
        lightColor = 0xf0f0f0;
        intensity = 1.0;
        break;
      default:
        lightColor = 0xf0f0f0;
        intensity = 1.0;
    }

    this.add(new THREE.AmbientLight(lightColor, intensity));

    if (this.renderer) {
      this.renderer.shadowMap.enabled = settings.viewport3d.shadows;
    }
  }

}
