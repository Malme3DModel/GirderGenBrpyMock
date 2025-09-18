import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { SideRightBeamComponent } from '../side-right-beam/side-right-beam.component';
import { SideRightCrossComponent } from '../side-right-cross/side-right-cross.component';
import { SideRightCrossbeamComponent } from '../side-right-crossbeam/side-right-crossbeam.component';
import { SideRightEndbeamComponent } from '../side-right-endbeam/side-right-endbeam.component';
import { SideRightMidComponent } from '../side-right-mid/side-right-mid.component';
import { SideRightOthersComponent } from '../side-right-others/side-right-others.component';
import { SideRightDisplayComponent } from '../side-right-display/side-right-display.component';
import { SideRightSlabComponent } from '../side-right-slab/side-right-slab.component';
import { SideRightPavementComponent } from '../side-right-pavement/side-right-pavement.component';
import { SettingsModelComponent } from '../settings-model/settings-model.component';
import { SideRightLod200Component } from '../side-right-lod200/side-right-lod200.component';
import { GirderPalamService } from '../../service/girder-palam.service';
import {ThemePalette} from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-side-left',
  templateUrl: './side-left.component.html',
  styleUrls: ['./side-left.component.scss']
})
export class SideLeftComponent {

  constructor(public dialog: MatDialog, public model: GirderPalamService) { }

  public openDialog(id: string): void {

    let rightSide: any = null;
    if( id==='others') { // 共通
      if (this.model.generalSettings.lodMode === 'LOD200') {
        rightSide = SideRightLod200Component;
      } else {
        rightSide = SideRightOthersComponent;
      }
    }
      else if( id==='display') { // 構成・表示 -> モデル設定にリダイレクト
      this.openModelSettings();
      return;
    }
    else if( id==='pavement')  // 舗装
      rightSide = SideRightPavementComponent;
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

    if(rightSide==null)
      return;

    this.dialog.closeAll();

    this.dialog.open(rightSide, {
      width: '500px',
      position: { right: '10px', top: '70px' },
      hasBackdrop: false
    });
  }

  private openModelSettings(): void {
    this.dialog.closeAll();
    
    this.dialog.open(SettingsModelComponent, {
      width: '500px',
      position: { right: '10px', top: '70px' },
      hasBackdrop: false
    });
  }

  getOrderedVisibleMenus(): string[] {
    if (this.model.generalSettings.lodMode !== 'LOD300') {
      return [];
    }
    
    return this.model.menuSettings.menuOrder.filter((menuKey: string) => 
      this.model.menuSettings.visibleMenus[menuKey]
    );
  }

  getMenuLabel(menuKey: string): string {
    const menuLabels: { [key: string]: string } = {
      'pavement': '舗装',
      'slab': '床版',
      'beam': '主桁',
      'mid': '中間対傾構',
      'cross': '横構',
      'crossbeam': '荷重分配横桁',
      'endbeam': '端横桁'
    };
    return menuLabels[menuKey] || menuKey;
  }

}
