import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';
import {ThemePalette} from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-side-right-beam',
  templateUrl: './side-right-beam.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightBeamComponent {

  constructor(public dialogRef: MatDialogRef<SideRightBeamComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

    private rowheader: string[] = [
      '主桁本数',
      'フランジ幅',
      'フランジ厚',
      'ウェブ幅',
      'ウェブ厚'
    ];

    private dataset: any[] = [
      {name: 'amount_V',  value: this.model.beam.amount_V,  unit: '本'},
      {name: 'D',         value: this.model.beam.D,         unit: 'm'},
      {name: 'tf',        value: this.model.beam.tf,        unit: 'm'},
      {name: 'W',         value: this.model.beam.W,         unit: 'm'},
      {name: 'tw',        value: this.model.beam.tw,        unit: 'm'},
    ];

    private columns = [
      {
        data: 'unit',
        readOnly: true
      },
      {
        data: 'value',
        type: 'numeric',
        numericFormat: {
          pattern: '0,0.000'
        }
      }
    ];

    private integer_cell: any[] = [
      {row: 0, col: 1, type: 'numeric', numericFormat: {pattern: 'mantissa'}},
    ];

    public hotSettings: Handsontable.GridSettings = {
      data: this.dataset,
      colHeaders: false,
      rowHeaders: this.rowheader,
      columns: this.columns,
      cell: this.integer_cell,
      allowEmpty: false,
      beforeChange: (changes, source)=>{
        for(const [row, prop, oldValue, newValue] of changes){
          let value = parseFloat(newValue);
          if( isNaN(value) )
            return false;
          const name: string = this.dataset[row].name;
          const isInteger = this.integer_cell.find( element => element.row === row);
          if(isInteger != null)
            value = Math.round(value);
          this.model.beam[name] = value;
        }
        // 再描画
        this.redraw();
        return true;
      },
    };


      // check box 関係
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }
}
