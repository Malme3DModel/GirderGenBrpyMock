import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GirderPalamService } from '../../service/girder-palam.service';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss']
})
export class SettingsMenuComponent {

  menuItems = [
    { key: 'pavement', label: '舗装' },
    { key: 'slab', label: '床版' },
    { key: 'beam', label: '主桁' },
    { key: 'mid', label: '中間対傾構' },
    { key: 'cross', label: '横構' },
    { key: 'crossbeam', label: '荷重分配横桁' },
    { key: 'endbeam', label: '端横桁' }
  ];

  constructor(
    public dialogRef: MatDialogRef<SettingsMenuComponent>,
    public model: GirderPalamService
  ) { }

  get isLod300(): boolean {
    return this.model.generalSettings.lodMode === 'LOD300';
  }

  onMenuVisibilityChange(menuKey: string, visible: boolean): void {
    if (this.isLod300) {
      this.model.menuSettings.visibleMenus[menuKey] = visible;
    }
  }

}
