import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-lod200',
  templateUrl: './side-right-lod200.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightLod200Component {

  constructor(
    public dialogRef: MatDialogRef<SideRightLod200Component>,
    public model: GirderPalamService,
    private girder: pvGirderService
  ) { }

  public redraw(): void {
    this.girder.createGirder(this.model.palam());
  }

  private rowheader: string[] = [
    '業務名',
    '路線名',
    '道路種別',
    '橋長',
    '桁長',
    '支間長',
    '開始距離標',
    '終了距離標',
    '開始測点番号',
    '開始測点x座標',
    '開始測点y座標',
    '開始測点z座標',
    '終了測点番号',
    '終了測点x座標',
    '終了測点y座標',
    '終了測点z座標',
    '横桁・対傾構の列数',
    '主桁本数',
  ];

  private dataset: any[] = [
    {name: 'Name_P', value: this.model.others.Name_P, unit: ''},
    {name: 'Name_R', value: this.model.others.Name_R, unit: ''},
    {name: 'Class_R', value: this.model.others.Class_R, unit: ''},
    {name: 'L', value: this.model.getDisplayValue(this.model.others.L, 'm'), unit: this.model.getDisplayUnit('m')},
    {name: 'L_01', value: this.model.getDisplayValue(this.model.others.L_01, 'm'), unit: this.model.getDisplayUnit('m')},
    {name: 'L_02', value: this.model.getDisplayValue(this.model.others.L_02, 'm'), unit: this.model.getDisplayUnit('m')},
    {name: 'Milepost_B', value: this.model.getDisplayValue(this.model.others.Milepost_B, 'km'), unit: this.model.getDisplayUnit('km')},
    {name: 'Milepost_E', value: this.model.getDisplayValue(this.model.others.Milepost_E, 'km'), unit: this.model.getDisplayUnit('km')},
    {name: 'BP', value: this.model.others.BP, unit: 'NO.'},
    {name: 'BPx', value: this.model.getDisplayValue(this.model.others.BPx, 'm'), unit: this.model.getDisplayUnit('m')},
    {name: 'BPy', value: this.model.getDisplayValue(this.model.others.BPy, 'm'), unit: this.model.getDisplayUnit('m')},
    {name: 'BPz', value: this.model.getDisplayValue(this.model.others.BPz, 'm'), unit: this.model.getDisplayUnit('m')},
    {name: 'EP', value: this.model.others.EP, unit: 'NO.'},
    {name: 'EPx', value: this.model.getDisplayValue(this.model.others.EPx, 'm'), unit: this.model.getDisplayUnit('m')},
    {name: 'EPy', value: this.model.getDisplayValue(this.model.others.EPy, 'm'), unit: this.model.getDisplayUnit('m')},
    {name: 'EPz', value: this.model.getDisplayValue(this.model.others.EPz, 'm'), unit: this.model.getDisplayUnit('m')},
    {name: 'amount_H', value: this.model.others.amount_H, unit: '列'},
    {name: 'amount_V', value: this.model.beam.amount_V, unit: '本'},
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
        pattern: this.model.getDisplayFormat('m')
      }
    }
  ];

  private integer_cell: any[] = [
    {row: 16, col: 1, type: 'numeric', numericFormat: {pattern: 'mantissa'}},
    {row: 17, col: 1, type: 'numeric', numericFormat: {pattern: 'mantissa'}},
  ];

  public hotSettings: Handsontable.GridSettings = {
    data: this.dataset,
    colHeaders: false,
    rowHeaders: this.rowheader,
    columns: this.columns,
    colWidths: [50, 150],
    cell: this.integer_cell,
    allowEmpty: false,
    preventOverflow: 'horizontal',
    beforeChange: (changes, source)=>{
      for(const item of changes){
        if (item === null){
          continue;
        }
        let value = item[3];
        const name: string = this.dataset[item[0]].name;
        const isInteger = this.integer_cell.find( element => element.row === item[0]);
        if(isInteger != null)
          value = Math.round(value);
        
        const originalUnit = this.getOriginalUnit(name);
        if (originalUnit && originalUnit !== '' && originalUnit !== 'NO.' && originalUnit !== '列' && originalUnit !== '本') {
          value = parseFloat(value);
          if (!isNaN(value)) {
            const storageValue = this.model.getStorageValue(value, originalUnit);
            if (name === 'amount_V') {
              this.model.beam[name] = storageValue;
            } else {
              this.model.others[name] = storageValue;
            }
          }
        } else {
          if (name === 'amount_V') {
            this.model.beam[name] = value;
          } else {
            this.model.others[name] = value;
          }
        }
      }
      this.redraw();
      return true;
    },
  };

  private getOriginalUnit(fieldName: string): string {
    const unitMap: any = {
      'Name_P': '',
      'Name_R': '',
      'Class_R': '',
      'L': 'm',
      'L_01': 'm',
      'L_02': 'm',
      'Milepost_B': 'km',
      'Milepost_E': 'km',
      'BP': 'NO.',
      'BPx': 'm',
      'BPy': 'm',
      'BPz': 'm',
      'EP': 'NO.',
      'EPx': 'm',
      'EPy': 'm',
      'EPz': 'm',
      'amount_H': '列',
      'amount_V': '本'
    };
    return unitMap[fieldName] || '';
  }
}
