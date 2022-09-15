import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { SideRightComponent } from '../side-right/side-right.component';

@Component({
  selector: 'app-side-left',
  templateUrl: './side-left.component.html',
  styleUrls: ['./side-left.component.scss']
})
export class SideLeftComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(id: string): void {

    let rightSide: any = SideRightComponent; 
    if( id==='common')  // 共通
      rightSide = SideRightComponent;
    else if( id==='Ds') // 床版
      rightSide = SideRightComponent;
    else if( id==='Mg') // 主桁
      rightSide = SideRightComponent;
    else if( id==='Cf') // 中間対傾構
      rightSide = SideRightComponent;
    else if( id==='Lu,Ll')  // 横構
      rightSide = SideRightComponent;
    else if( id==='Cr') // 荷重分配横桁
      rightSide = SideRightComponent;
    else if( id==='Cu') // 端横桁
      rightSide = SideRightComponent;

    this.dialog.open(rightSide, {
      width: '350px',
      position: { right: '100px' },
      hasBackdrop: false
    });


  }

}
