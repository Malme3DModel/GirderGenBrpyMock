import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SettingsService, CustomInputMenu, CustomParameter } from '../../service/settings.service';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';
import { SceneService } from 'src/app/three/scene.service';
import {ThemePalette} from '@angular/material/core';

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
    private girder: pvGirderService,
    private scene: SceneService
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

  public onUnitSystemChange(system: string): void {
    this.settings.unitSystem = system as 'default' | 'metric';
    this.settings.saveSettings();
  }

  public  onOpacityChange(): void {
    this.scene.setModelOpacity(this.settings.modelOpacity);
    this.settings.saveSettings();
  }

  onBackgroundColorChange(): void {
    this.scene.setBackgroundColor(this.settings.backgroundColor);
    this.settings.saveSettings();
  }

  onSideMenuMinimizedChange(): void {
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

  public redraw(): void {
    this.model.display.slab = this.slab.completed;
    this.model.display.pavement = this.pavement.completed;
    if (this.pavement.subtasks != null ){
      this.model.display.pv3 = this.pavement.subtasks[0].completed;
      this.model.display.pv2 = this.pavement.subtasks[1].completed;
      this.model.display.pv1 = this.pavement.subtasks[2].completed;
    }
    this.model.display.beam = this.beam.completed;
    this.model.display.crossbeam = this.crossbeam.completed;
    this.model.display.endbeam = this.endbeam.completed;
    if (this.mid.subtasks != null ){
      this.model.display.mid = this.mid.subtasks[0].completed;
      this.model.display.gusset01 = this.mid.subtasks[1].completed;
      this.model.display.gusset02 = this.mid.subtasks[2].completed;
      this.model.display.gusset03 = this.mid.subtasks[3].completed;
    }
    if (this.cross.subtasks != null ){
      this.model.display.cross_u = this.cross.subtasks[0].completed;
      this.model.display.cross_l = this.cross.subtasks[1].completed;
      this.model.display.gusset04 = this.cross.subtasks[2].completed;
    }
    this.girder.createGirder(this.model.palam());
  }

  slab: any = {
    name: '床版',
    completed: this.model.display.slab,
    color: 'primary',
  }

  pavement: any = {
    name: '舗装',
    completed: true,
    color: 'primary',
    subtasks: [
      {name: '表層', completed: this.model.display.pv3, color: 'accent'},
      {name: '上層路盤', completed: this.model.display.pv2, color: 'accent'},
      {name: '下層路盤', completed: this.model.display.pv1, color: 'accent'},
    ],
  };

  beam: any = {
    name: '主桁',
    completed: this.model.display.beam,
    color: 'primary',
  }

  crossbeam: any = {
    name: '荷重分配横桁',
    completed: this.model.display.crossbeam,
    color: 'primary',
  }

  endbeam: any = {
    name: '端横桁',
    completed: this.model.display.endbeam,
    color: 'primary',
  }

  mid: any = {
    name: '中間対傾構',
    completed: true,
    color: 'primary',
    subtasks: [
      {name: '対傾構', completed: this.model.display.mid, color: 'accent'},
      {name: 'ガセットプレート（斜材）', completed: this.model.display.gusset01, color: 'accent'},
      {name: 'ガセットプレート（上弦材）', completed: this.model.display.gusset02, color: 'accent'},
      {name: 'ガセットプレート（下弦材）', completed: this.model.display.gusset03, color: 'accent'},
    ],
  };

  allComplete: boolean = true;

  updateAllComplete() {
    this.allComplete = this.mid.subtasks != null && this.mid.subtasks.every((t: any) => t.completed);
  }

  someComplete(): boolean {
    if (this.mid.subtasks == null) {
      return false;
    }
    return this.mid.subtasks.filter((t: any) => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.mid.subtasks == null) {
      return;
    }
    this.mid.subtasks.forEach((t: any) => (t.completed = completed));
    this.redraw();
  }

  cross: any = {
    name: '横構',
    completed: true,
    color: 'primary',
    subtasks: [
      {name: '上横構', completed: this.model.display.cross_u, color: 'accent'},
      {name: '下横構', completed: this.model.display.cross_l, color: 'accent'},
      {name: 'ガセットプレート', completed: this.model.display.gusset04, color: 'accent'},
    ]
  };

  allComplete2: boolean = true;

  updateAllComplete2() {
    this.allComplete2 = this.cross.subtasks != null && this.cross.subtasks.every((t: any) => t.completed);
  }

  someComplete2(): boolean {
    if (this.cross.subtasks == null) {
      return false;
    }
    return this.cross.subtasks.filter((t: any) => t.completed).length > 0 && !this.allComplete2;
  }

  setAll2(completed: boolean) {
    this.allComplete2 = completed;
    if (this.cross.subtasks == null) {
      return;
    }
    this.cross.subtasks.forEach((t: any) => (t.completed = completed));
    this.redraw();
  }

  allComplete3: boolean = true;

  updateAllComplete3() {
    this.allComplete3 = this.pavement.subtasks != null && this.pavement.subtasks.every((t: any) => t.completed);
  }

  someComplete3(): boolean {
    if (this.pavement.subtasks == null) {
      return false;
    }
    return this.pavement.subtasks.filter((t: any) => t.completed).length > 0 && !this.allComplete3;
  }

  setAll3(completed: boolean) {
    this.allComplete3 = completed;
    if (this.pavement.subtasks == null) {
      return;
    }
    this.pavement.subtasks.forEach((t: any) => (t.completed = completed));
    this.redraw();
  }
}
