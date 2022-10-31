import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';
import {ThemePalette} from '@angular/material/core';



export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
export interface SimpleTask {
  name: string;
  completed: boolean;
  color: ThemePalette;
}

/**
 * @title Basic checkboxes
 */
@Component({
  selector: 'app-side-right-display',
  templateUrl: './side-right-display.component.html',
  styleUrls: ['../side-right/side-right.component.scss'],
})
export class SideRightDisplayComponent {

  constructor(public dialogRef: MatDialogRef<SideRightDisplayComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

    public redraw(): void {
      this.model.display.slab = this.slab.completed;
      this.model.display.pavement = this.pavement.completed;
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


  slab: SimpleTask ={
    name: '床版',
    completed: this.model.display.slab,
    color: 'primary',}

  pavement: SimpleTask ={
    name: '舗装',
    completed: this.model.display.pavement,
    color: 'primary',}

  beam: SimpleTask ={
    name: '主桁',
    completed: this.model.display.beam,
    color: 'primary',}

  crossbeam: SimpleTask ={
    name: '荷重分配横桁',
    completed: this.model.display.crossbeam,
    color: 'primary',}

  endbeam: SimpleTask ={
    name: '端横桁',
    completed: this.model.display.endbeam,
    color: 'primary',}

  mid: Task = {
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
    this.allComplete = this.mid.subtasks != null && this.mid.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.mid.subtasks == null) {
      return false;
    }
    return this.mid.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.mid.subtasks == null) {
      return;
    }
    this.mid.subtasks.forEach(t => (t.completed = completed));
    this.redraw();
  }

  cross: Task = {
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
    this.allComplete2 = this.cross.subtasks != null && this.cross.subtasks.every(t => t.completed);
  }

  someComplete2(): boolean {
    if (this.cross.subtasks == null) {
      return false;
    }
    return this.cross.subtasks.filter(t => t.completed).length > 0 && !this.allComplete2;
  }

  setAll2(completed: boolean) {
    this.allComplete2 = completed;
    if (this.cross.subtasks == null) {
      return;
    }
    this.cross.subtasks.forEach(t => (t.completed = completed));
    this.redraw();
  }



}
