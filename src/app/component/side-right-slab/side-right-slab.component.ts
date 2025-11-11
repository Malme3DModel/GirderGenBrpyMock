import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-slab',
  templateUrl: './side-right-slab.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightSlabComponent{

  constructor(public dialogRef: MatDialogRef<SideRightSlabComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

    private rowheader: string[] = [
      '床版',
      '左幅員',
      '右幅員',
      '地覆幅',
      '壁高',
      '床版上面勾配（左）',
      '床版上面勾配（右）',
      '床版底面勾配（左）',
      '床版底面勾配（右）',
      '床版厚',
      'ハンチ高',
      'ハンチ勾配',
      '床版端部から主桁までの離隔',
    ];


    private dataset: any[] = [
      { name: 'Slab', value: '', unit: ''},
      {name: 'b1', value: this.model.getDisplayValue(this.model.slab.b1, 'm', 'b1'), unit: this.model.getDisplayUnit('m', 'b1')},
      {name: 'b2', value: this.model.getDisplayValue(this.model.slab.b2, 'm', 'b2'), unit: this.model.getDisplayUnit('m', 'b2')},
      {name: 'b3', value: this.model.getDisplayValue(this.model.slab.b3, 'm', 'b3'), unit: this.model.getDisplayUnit('m', 'b3')},
      {name: 'SH', value: this.model.getDisplayValue(this.model.slab.SH, 'm', 'SH'), unit: this.model.getDisplayUnit('m', 'SH')},
      {name: 'i1', value: this.model.slab.i1, unit: '%'},
      {name: 'i2', value: this.model.slab.i2, unit: '%'},
      {name: 'j1', value: this.model.slab.i1, unit: '%'},
      {name: 'j2', value: this.model.slab.i2, unit: '%'},
      {name: 'T1', value: this.model.getDisplayValue(this.model.slab.T1, 'm', 'T1'), unit: this.model.getDisplayUnit('m', 'T1')},
      {name: 'T2', value: this.model.getDisplayValue(this.model.slab.T2, 'm', 'T2'), unit: this.model.getDisplayUnit('m', 'T2')},
      {name: 'n', value: this.model.slab.n, unit: '1:n'},
      {name: 'Ss', value: this.model.getDisplayValue(this.model.slab.Ss, 'm', 'Ss'), unit: this.model.getDisplayUnit('m', 'Ss')},
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
          const storageValue = this.model.getStorageValue(value, originalUnit, name);
          this.model.slab[name] = storageValue;
        }
        // 再描画
        this.redraw();
        return true;
      },
    };

  private getOriginalUnit(fieldName: string): string {
    const unitMap: any = {
      'b1': 'm',
      'b2': 'm',
      'b3': 'm',
      'SH': 'm',
      'i1': '%',
      'i2': '%',
      'j1': '%',
      'j2': '%',
      'T1': 'm',
      'T2': 'm',
      'n': '1:n',
      'Ss': 'm'
    };
    return unitMap[fieldName] || '';
  }
}
