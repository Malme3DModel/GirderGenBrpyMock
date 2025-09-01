import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';
import { SettingsService } from '../../service/settings.service';

@Component({
  selector: 'app-side-right-pavement',
  templateUrl: './side-right-pavement.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightPavementComponent{

  constructor(public dialogRef: MatDialogRef<SideRightPavementComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService,
    private settings: SettingsService) { }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

    private convertInputToDefault(value: number, unit: string): number {
      if (this.settings.unitSystem === 'metric') {
        if (unit.includes('m') && !unit.includes('mm')) {
          return value * 1000; // m to mm
        } else if (unit.includes('N') && !unit.includes('kN')) {
          return value * 1000; // kN to N
        }
      }
      return value;
    }

    private rowheader: string[] = [
      '舗装',
      '舗装勾配（左）',
      '舗装勾配（右）',
      '表層厚',
      '上層路盤厚',
      '下層路盤厚',
    ];


    private dataset: any[] = [
      { name: 'pavement', value: '', unit: ''},
      {name: 'i1', value: this.model.pavement.i1, unit: '%'},
      {name: 'i2', value: this.model.pavement.i2, unit: '%'},
      {name: 'T3', value: this.model.pavement.T3, unit: 'm'},
      {name: 'T2', value: this.model.pavement.T2, unit: 'm'},
      {name: 'T1', value: this.model.pavement.T1, unit: 'm'},
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

    public hotSettings: Handsontable.GridSettings = {
      data: this.dataset,
      colHeaders: false,
      rowHeaders: this.rowheader,
      columns: this.columns,
      allowEmpty: false,
      beforeChange: (changes, source)=>{
        for(const item of changes){
          if (item === null){
            continue
          }
          let value = parseFloat(item[3]);
          if( isNaN(value) )
            return false;
          
          const dataItem = this.dataset[item[0]];
          const convertedValue = this.convertInputToDefault(value, dataItem.unit);
          
          const name: string = dataItem.name;
          this.model.pavement[name] = convertedValue;
        }
        this.redraw();
        return true;
      },
    };
}
