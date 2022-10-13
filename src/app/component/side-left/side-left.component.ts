import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { SideRightBeamComponent } from '../side-right-beam/side-right-beam.component';
import { SideRightCrossComponent } from '../side-right-cross/side-right-cross.component';
import { SideRightCrossbeamComponent } from '../side-right-crossbeam/side-right-crossbeam.component';
import { SideRightEndbeamComponent } from '../side-right-endbeam/side-right-endbeam.component';
import { SideRightMidComponent } from '../side-right-mid/side-right-mid.component';
import { SideRightGusset01Component } from '../side-right-gusset01/side-right-gusset01.component';
import { SideRightGusset02Component } from '../side-right-gusset02/side-right-gusset02.component';
import { SideRightGusset03Component } from '../side-right-gusset03/side-right-gusset03.component';
import { SideRightOthersComponent } from '../side-right-others/side-right-others.component';
import { SideRightSlabComponent } from '../side-right-slab/side-right-slab.component';

@Component({
  selector: 'app-side-left',
  templateUrl: './side-left.component.html',
  styleUrls: ['./side-left.component.scss']
})
export class SideLeftComponent {

  constructor(public dialog: MatDialog) { }

  public openDialog(id: string): void {

    let rightSide: any = null;
    if( id==='others') // 共通
      rightSide = SideRightOthersComponent;
    else if( id==='slab')  // 床版
      rightSide = SideRightSlabComponent;
    else if( id==='beam') // 主桁
      rightSide = SideRightBeamComponent;
    else if( id==='mid') // 中間対傾構
      rightSide = SideRightMidComponent;
    else if( id==='cross') // 横構
      rightSide = SideRightCrossComponent;
    else if( id==='crossbeam')  // 荷重分配横桁
      rightSide = SideRightCrossbeamComponent;
    else if( id==='endbeam') // 端横桁
      rightSide = SideRightEndbeamComponent;
    else if( id==='gusset01') // ガセットプレート01
      rightSide = SideRightGusset01Component;
    else if( id==='gusset02') // ガセットプレート02
      rightSide = SideRightGusset02Component;
    else if( id==='gusset03') // ガセットプレート03
      rightSide = SideRightGusset03Component;

    if(rightSide==null)
      return;

    this.dialog.open(rightSide, {
      width: '350px',
      position: { right: '10px', top: '70px' },
      hasBackdrop: false
    });


  }

}
