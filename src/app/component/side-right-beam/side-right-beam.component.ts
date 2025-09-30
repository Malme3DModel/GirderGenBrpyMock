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
      '主桁',
      '主桁本数',
      'フランジ幅',
      'フランジ厚',
      'ウェブ幅',
      'ウェブ厚'
    ];

    private dataset: any[] = [
      { name: 'Beam', value: '', unit: ''},
      {name: 'amount_V',  value: this.model.beam.amount_V,  unit: '本'},
      {name: 'D',         value: this.model.getDisplayValue(this.model.beam.D, 'mm'),         unit: this.model.getDisplayUnit('mm')},
      {name: 'tf',        value: this.model.getDisplayValue(this.model.beam.tf, 'mm'),        unit: this.model.getDisplayUnit('mm')},
      {name: 'W',         value: this.model.getDisplayValue(this.model.beam.W, 'mm'),         unit: this.model.getDisplayUnit('mm')},
      {name: 'tw',        value: this.model.getDisplayValue(this.model.beam.tw, 'mm'),        unit: this.model.getDisplayUnit('mm')},
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
          pattern: this.model.getDisplayFormat('mm')
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
      colWidths: [50, 100],
      cell: this.integer_cell,
      allowEmpty: false,
      preventOverflow: 'horizontal',
      beforeChange: (changes, source)=>{
        for(const item of changes){
          if (item === null){
            continue
          }
          let value = parseFloat(item[3]);
          if( isNaN(value) )
            return false;
          const name: string = this.dataset[item[0]].name;
          const isInteger = this.integer_cell.find( element => element.row === item[0]);
          if(isInteger != null)
            value = Math.round(value);
          
          const originalUnit = this.getOriginalUnit(name);
          const storageValue = this.model.getStorageValue(value, originalUnit);
          this.model.beam[name] = storageValue;
        }
        // 再描画
        this.redraw();
        return true;
      },
    };

  private getOriginalUnit(fieldName: string): string {
    const unitMap: any = {
      'D': 'mm',
      'tf': 'mm', 
      'W': 'mm',
      'tw': 'mm',
      'amount_V': '本'
    };
    return unitMap[fieldName] || '';
  }

}
