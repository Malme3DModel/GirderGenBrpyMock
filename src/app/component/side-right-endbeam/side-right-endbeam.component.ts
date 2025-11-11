import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-endbeam',
  templateUrl: './side-right-endbeam.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightEndbeamComponent {

  constructor(public dialogRef: MatDialogRef<SideRightEndbeamComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

    private rowheader: string[] = [
      '端横桁',
      'フランジ幅',
      'フランジ厚',
      'ウェブ幅',
      'ウェブ厚',
      '離隔（外側）',
      '離隔（内側）'
    ];

    private dataset: any[] = [
      { name: 'endbeam', value: '', unit: ''},
      {name: 'D5', value: this.model.getDisplayValue(this.model.endbeam.D5, 'mm'), unit: this.model.getDisplayUnit('mm')},
      {name: 'tf4', value: this.model.getDisplayValue(this.model.endbeam.tf4, 'mm'), unit: this.model.getDisplayUnit('mm')},
      {name: 'W5', value: this.model.getDisplayValue(this.model.endbeam.W5, 'mm'), unit: this.model.getDisplayUnit('mm')},
      {name: 'tw4', value: this.model.getDisplayValue(this.model.endbeam.tw4, 'mm'), unit: this.model.getDisplayUnit('mm')},
      {name: 's_edge3', value: this.model.getDisplayValue(this.model.endbeam.s_edge3, 'mm'), unit: this.model.getDisplayUnit('mm')},
      {name: 's_middle3', value: this.model.getDisplayValue(this.model.endbeam.s_middle3, 'mm'), unit: this.model.getDisplayUnit('mm')},    ];

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
          this.model.endbeam[name] = storageValue;
        }
        // 再描画
        this.redraw();
        return true;
      },
    };

  private getOriginalUnit(fieldName: string): string {
    const unitMap: any = {
      'D5': 'mm',
      'tf4': 'mm',
      'W5': 'mm',
      'tw4': 'mm',
      's_edge3': 'mm',
      's_middle3': 'mm'
    };
    return unitMap[fieldName] || '';
  }
}
