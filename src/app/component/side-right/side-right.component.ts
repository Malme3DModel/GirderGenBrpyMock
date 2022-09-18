import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { pvGirderService } from 'src/app/three/geo/pvGirder.service';

@Component({
  selector: 'app-side-right',
  templateUrl: './side-right.component.html',
  styleUrls: ['./side-right.component.scss']
})
export class SideRightComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SideRightComponent>,
              public model: pvGirderService) { }

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

  ngOnInit(): void {
  }

  redraw() {
    // console.log('強制的に再描画させる');
    // this.changeDetectorRef.detectChanges();
    // this.model.reSetModel(this.L, this.B1, this.B3,
    //   this.T1, this.T2, this.HH, this.BB, this.TT1, this.TT2, this.n);
  }
  
}
