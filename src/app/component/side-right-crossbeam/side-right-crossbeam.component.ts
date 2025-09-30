import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-crossbeam',
  templateUrl: './side-right-crossbeam.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightCrossbeamComponent {

  constructor(public dialogRef: MatDialogRef<SideRightCrossbeamComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

    private rowheader: string[] = [
      '荷重分配横桁',
      'フランジ幅',
      'フランジ厚',
      'ウェブ幅',
      'ウェブ厚',
      '離隔（外側）',
      '離隔（内側）',
      '配置列数',
    ];


    private dataset: any[] = [
      { name: 'Crossbeam', value: '', unit: ''},
      { name: 'D4', value: this.model.getDisplayValue(this.model.crossbeam.D4, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'tf3', value: this.model.getDisplayValue(this.model.crossbeam.tf3, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'W3', value: this.model.getDisplayValue(this.model.crossbeam.W3, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'tw3', value: this.model.getDisplayValue(this.model.crossbeam.tw3, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 's_edge2', value: this.model.getDisplayValue(this.model.crossbeam.s_edge2, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 's_middle2', value: this.model.getDisplayValue(this.model.crossbeam.s_middle2, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'location2', value: this.model.crossbeam.location2, unit: '列'},
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
          this.model.crossbeam[name] = storageValue;
        }
        // 再描画
        this.redraw();
        return true;
      },
    };

  private getOriginalUnit(fieldName: string): string {
    const unitMap: any = {
      'D4': 'mm',
      'tf3': 'mm',
      'W3': 'mm',
      'tw3': 'mm',
      's_edge2': 'mm',
      's_middle2': 'mm',
      'location2': '列'
    };
    return unitMap[fieldName] || '';
  }
}
