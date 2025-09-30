import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-cross',
  templateUrl: './side-right-cross.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightCrossComponent {

  constructor(public dialogRef: MatDialogRef<SideRightCrossComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

    private rowheader: string[] = [
      '横構',
      'フランジ幅',
      'フランジ厚',
      'ウェブ幅',
      'ウェブ厚',
      '離隔（外側',
      '離隔（内側',
      'ガセットプレート',
      '全体高',
      '短辺高',
      '天端幅',
      '底面幅',
      '厚さ',
    ];

    
    private dataset: any[] = [
      { name: 'Cross', value: '', unit: ''},
      {name: 'D3',        value: this.model.getDisplayValue(this.model.cross.D3, 'mm'),       unit: this.model.getDisplayUnit('mm')},
      {name: 'tf2',       value: this.model.getDisplayValue(this.model.cross.tf2, 'mm'),      unit: this.model.getDisplayUnit('mm')},
      {name: 'W2',        value: this.model.getDisplayValue(this.model.cross.W2, 'mm'),       unit: this.model.getDisplayUnit('mm')},
      {name: 'tw2',       value: this.model.getDisplayValue(this.model.cross.tw2, 'mm'),      unit: this.model.getDisplayUnit('mm')},
      {name: 's_edge',    value: this.model.getDisplayValue(this.model.cross.s_edge, 'mm'),   unit: this.model.getDisplayUnit('mm')},
      {name: 's_middle',  value: this.model.getDisplayValue(this.model.cross.s_middle, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'Gusset04', value: '', unit: ''},
      { name: 'GA4', value: this.model.getDisplayValue(this.model.cross.GA4, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'GD4', value: this.model.getDisplayValue(this.model.cross.GD4, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'GB4', value: this.model.getDisplayValue(this.model.cross.GB4, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'GC4', value: this.model.getDisplayValue(this.model.cross.GC4, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'Gt4', value: this.model.getDisplayValue(this.model.cross.Gt4, 'mm'), unit: this.model.getDisplayUnit('mm')},
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
          pattern: '0,0.0'
        }
      }
    ];


    public hotSettings: Handsontable.GridSettings = {
      data: this.dataset,
      colHeaders: false,
      rowHeaders: this.rowheader,
      colWidths: [50, 100],
      columns: this.columns,
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
          this.model.cross[name] = storageValue;
        }
        // 再描画
        this.redraw();
        return true;
      },
    };

  private getOriginalUnit(fieldName: string): string {
    const unitMap: any = {
      'D3': 'mm',
      'tf2': 'mm',
      'W2': 'mm',
      'tw2': 'mm',
      's_edge': 'mm',
      's_middle': 'mm',
      'GA4': 'mm',
      'GD4': 'mm',
      'GB4': 'mm',
      'GC4': 'mm',
      'Gt4': 'mm'
    };
    return unitMap[fieldName] || '';
  }
}
