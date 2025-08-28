import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SettingsService, CustomInputMenu, CustomParameter } from 'src/app/service/settings.service';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-settings',
  templateUrl: './side-right-settings.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightSettingsComponent {

  public selectedTab: number = 0;
  public newCustomMenuName: string = '';
  public selectedParameters: CustomParameter[] = [];
  public availableParameters: CustomParameter[] = [];
  public pageSize = 20;
  public currentPage = 0;

  constructor(
    public dialogRef: MatDialogRef<SideRightSettingsComponent>,
    public settings: SettingsService,
    private model: GirderPalamService,
    private girder: pvGirderService
  ) {
    this.availableParameters = this.settings.getAvailableParameters();
  }

  public get paginatedParameters(): CustomParameter[] {
    const start = this.currentPage * this.pageSize;
    return this.availableParameters.slice(start, start + this.pageSize);
  }

  public onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
  }

  public onLODModeChange(): void {
    this.settings.saveSettings();
    this.redraw();
  }

  public onInputTypeChange(): void {
    this.settings.saveSettings();
  }

  public onColorChange(component: string): void {
    this.settings.saveSettings();
    this.redraw();
  }

  public onSideMenuVisibilityChange(): void {
    this.settings.saveSettings();
  }

  public onAttributeDisplayChange(): void {
    this.settings.saveSettings();
  }

  public redraw(): void {
    this.girder.createGirder(this.model.palam());
  }

  public addCustomMenu(): void {
    if (this.newCustomMenuName.trim() && this.selectedParameters.length > 0) {
      const menu: CustomInputMenu = {
        id: Date.now().toString(),
        name: this.newCustomMenuName.trim(),
        parameters: [...this.selectedParameters]
      };
      this.settings.addCustomInputMenu(menu);
      this.newCustomMenuName = '';
      this.selectedParameters = [];
    }
  }

  public removeCustomMenu(menuId: string): void {
    this.settings.removeCustomInputMenu(menuId);
  }

  public toggleParameterSelection(param: CustomParameter): void {
    const index = this.selectedParameters.findIndex(p => 
      p.category === param.category && p.key === param.key
    );
    if (index >= 0) {
      this.selectedParameters.splice(index, 1);
    } else {
      this.selectedParameters.push(param);
    }
  }

  public isParameterSelected(param: CustomParameter): boolean {
    return this.selectedParameters.some(p => 
      p.category === param.category && p.key === param.key
    );
  }

  public moveMenuUp(index: number): void {
    if (index > 0) {
      const temp = this.settings.sideMenuOrder[index];
      this.settings.sideMenuOrder[index] = this.settings.sideMenuOrder[index - 1];
      this.settings.sideMenuOrder[index - 1] = temp;
      this.settings.saveSettings();
    }
  }

  public moveMenuDown(index: number): void {
    if (index < this.settings.sideMenuOrder.length - 1) {
      const temp = this.settings.sideMenuOrder[index];
      this.settings.sideMenuOrder[index] = this.settings.sideMenuOrder[index + 1];
      this.settings.sideMenuOrder[index + 1] = temp;
      this.settings.saveSettings();
    }
  }

  public getMenuDisplayName(menuId: string): string {
    const names: { [key: string]: string } = {
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
    return names[menuId] || menuId;
  }
}
