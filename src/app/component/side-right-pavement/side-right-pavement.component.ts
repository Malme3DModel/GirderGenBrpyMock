import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-pavement',
  templateUrl: './side-right-pavement.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightPavementComponent{

  constructor(public dialogRef: MatDialogRef<SideRightPavementComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

    private rowheader: string[] = [
      '舗装',
      '舗装勾配（左）',
      '舗装勾配（右）',
      '舗装厚',
    ];


    private dataset: any[] = [
      { name: 'pavement', value: '', unit: ''},
      {name: 'i1', value: this.model.pavement.i1, unit: '%'},
      {name: 'i2', value: this.model.pavement.i2, unit: '%'},
      {name: 'T', value: this.model.getDisplayValue(this.model.pavement.T, 'm'), unit: this.model.getDisplayUnit('m')},
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
      colWidths: [50, 100],
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
          
          const originalUnit = this.getOriginalUnit(name);
          const storageValue = this.model.getStorageValue(value, originalUnit);
          this.model.pavement[name] = storageValue;
        }
        // 再描画
        this.redraw();
        return true;
      },
    };

  private getOriginalUnit(fieldName: string): string {
    const unitMap: any = {
      'i1': '%',
      'i2': '%',
      'T': 'm'
    };
    return unitMap[fieldName] || '';
  }
}
