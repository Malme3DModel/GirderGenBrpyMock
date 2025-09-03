import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { SettingsService } from '../../service/settings.service';
import { SideRightBeamComponent } from '../side-right-beam/side-right-beam.component';
import { SideRightCrossComponent } from '../side-right-cross/side-right-cross.component';
import { SideRightCrossbeamComponent } from '../side-right-crossbeam/side-right-crossbeam.component';
import { SideRightEndbeamComponent } from '../side-right-endbeam/side-right-endbeam.component';
import { SideRightMidComponent } from '../side-right-mid/side-right-mid.component';
import { SideRightOthersComponent } from '../side-right-others/side-right-others.component';
import { SideRightMaterialComponent } from '../side-right-material/side-right-material.component';
import { SideRightSlabComponent } from '../side-right-slab/side-right-slab.component';
import { SideRightPavementComponent } from '../side-right-pavement/side-right-pavement.component';
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

  private currentDialogRef: MatDialogRef<any> | null = null;

  constructor(public dialog: MatDialog, public settings: SettingsService) { }

  public getMenuVisibility(menuId: string): string {
    if (menuId === 'display') {
      return 'none';
    }
    if (this.settings.lodMode === 200 && menuId !== 'others' && menuId !== 'material') {
      return 'none';
    }
    const visibility = this.settings.sideMenuVisibility;
    return visibility[menuId as keyof typeof visibility] ? 'block' : 'none';
  }

  toggleSideMenu(): void {
    this.settings.sideMenuMinimized = !this.settings.sideMenuMinimized;
    this.settings.saveSettings();
  }

  public getMenuDisplayName(menuId: string): string {
    const names: { [key: string]: string } = {
      'others': '共通',
      'material': '材料強度',
      'pavement': '舗装',
      'slab': '床版',
      'beam': '主桁',
      'mid': '中間対傾構',
      'cross': '横構',
      'crossbeam': '荷重分配横桁',
      'endbeam': '端横桁'
    };
    return names[menuId] || menuId;
  }

  public getMenuIcon(menuId: string): string {
    const icons: { [key: string]: string } = {
      'others': 'settings',
      'material': 'science',
      'pavement': 'layers',
      'slab': 'view_module',
      'beam': 'view_stream',
      'mid': 'architecture',
      'cross': 'grid_on',
      'crossbeam': 'horizontal_rule',
      'endbeam': 'border_horizontal'
    };
    return icons[menuId] || 'menu';
  }

  public openCustomDialog(customMenu: any): void {
    console.log('Opening custom dialog for:', customMenu);
    
    if (this.currentDialogRef) {
      this.currentDialogRef.close();
    }
    
    this.currentDialogRef = this.dialog.open(SideRightOthersComponent, {
      width: '800px',
      height: '600px',
      maxHeight: '90vh',
      data: customMenu
    });
  }

  public openDialog(id: string): void {

    let rightSide: any = null;
    if( id==='others') // 共通
      rightSide = SideRightOthersComponent;
    else if( id==='material')  // 材料強度
      rightSide = SideRightMaterialComponent;
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

    if (this.currentDialogRef) {
      this.currentDialogRef.close();
    }

    this.currentDialogRef = this.dialog.open(rightSide, {
      width: '800px',
      height: '600px',
      maxHeight: '90vh',
      position: { right: '10px', top: '70px' },
      hasBackdrop: false
    });
  }


}
