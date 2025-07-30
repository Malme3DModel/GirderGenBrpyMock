import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { UISettingsService } from '../../service/ui-settings.service';
import { Subscription } from 'rxjs';
import { SideRightBeamComponent } from '../side-right-beam/side-right-beam.component';
import { SideRightCrossComponent } from '../side-right-cross/side-right-cross.component';
import { SideRightCrossbeamComponent } from '../side-right-crossbeam/side-right-crossbeam.component';
import { SideRightEndbeamComponent } from '../side-right-endbeam/side-right-endbeam.component';
import { SideRightMidComponent } from '../side-right-mid/side-right-mid.component';
import { SideRightOthersComponent } from '../side-right-others/side-right-others.component';
import { SideRightDisplayComponent } from '../side-right-display/side-right-display.component';
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
export class SideLeftComponent implements OnInit, OnDestroy {
  public sidebarItems: Array<{id: string, label: string, visible: boolean}> = [];
  private subscription!: Subscription;

  constructor(public dialog: MatDialog, private uiSettingsService: UISettingsService) { }

  ngOnInit(): void {
    this.initializeSidebarItems();
    this.subscription = this.uiSettingsService.settings$.subscribe(settings => {
      this.updateSidebarItems(settings);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private initializeSidebarItems(): void {
    const settings = this.uiSettingsService.getSettings();
    this.updateSidebarItems(settings);
  }

  private updateSidebarItems(settings: any): void {
    const itemLabels = {
      'others': '共通',
      'display': '構成',
      'pavement': '舗装',
      'slab': '床版',
      'beam': '主桁',
      'mid': '中間対傾構',
      'cross': '横構',
      'crossbeam': '荷重分配横桁',
      'endbeam': '端横桁'
    };

    this.sidebarItems = settings.sidebar.itemOrder.map((id: string) => ({
      id,
      label: itemLabels[id as keyof typeof itemLabels] || id,
      visible: settings.sidebar.visibleItems[id] || false
    }));
  }

  public openDialog(id: string): void {

    let rightSide: any = null;
    if( id==='others') // 共通
      rightSide = SideRightOthersComponent;
      else if( id==='display')  // 構成・表示
      rightSide = SideRightDisplayComponent;
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

    const settings = this.uiSettingsService.getSettings();
    this.dialog.open(rightSide, {
      width: `${settings.layout.parameterPanelWidth}px`,
      position: { right: '10px', top: '70px' },
      hasBackdrop: false
    });
  }


}
