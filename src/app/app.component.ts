import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { GirderPalamService } from './service/girder-palam.service';
import { pvGirderService } from './three/pvGirder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements AfterViewInit{

  public L: number = 20000;   // 延長

  public B1: number = 6000;   // 床版幅（左）
  // public B2: number = 6000;   // 床版幅（右）
  public B3: number = 200;    // 地覆幅
  public T1: number = 300;    // 床版厚（中心点）
  public T2: number = 400;    // 床版厚（地覆部）
  // public l1: number = 0.002;  // 勾配（左）：％
  // public l2: number = 0.002;  // 勾配（右）：％

  public HH: number = 800;     // 桁高
  public BB: number = 400;     // 桁幅
  public TT1: number = 12;     // ウェブ厚
  public TT2: number = 20;     // フランジ厚
  public n: number = 3;       // H鋼本数

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    private plam: GirderPalamService,
    private model: pvGirderService){ }

    ngAfterViewInit(): void {
      this.model.createGirder(this.plam.palam());
    }


}
