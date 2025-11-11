import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-others',
  templateUrl: './side-right-others.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightOthersComponent{

  constructor(public dialogRef: MatDialogRef<SideRightOthersComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

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
    ];

    private dataset: any[] = [
      {name: 'Name_P', value: this.model.others.Name_P, unit: ''},
      {name: 'Name_R', value: this.model.others.Name_R, unit: ''},
      {name: 'Class_R', value: this.model.others.Class_R, unit: ''},
      {name: 'L', value: this.model.getDisplayValue(this.model.others.L, 'm', 'L'), unit: this.model.getDisplayUnit('m', 'L')},
      {name: 'L_01', value: this.model.getDisplayValue(this.model.others.L_01, 'm', 'L_01'), unit: this.model.getDisplayUnit('m', 'L_01')},
      {name: 'L_02', value: this.model.getDisplayValue(this.model.others.L_02, 'm', 'L_02'), unit: this.model.getDisplayUnit('m', 'L_02')},
      {name: 'Milepost_B', value: this.model.getDisplayValue(this.model.others.Milepost_B, 'km', 'Milepost_B'), unit: this.model.getDisplayUnit('km', 'Milepost_B')},
      {name: 'Milepost_E', value: this.model.getDisplayValue(this.model.others.Milepost_E, 'km', 'Milepost_E'), unit: this.model.getDisplayUnit('km', 'Milepost_E')},
      {name: 'BP', value: this.model.others.BP, unit: 'NO.'},
      {name: 'BPx', value: this.model.getDisplayValue(this.model.others.BPx, 'm', 'BPx'), unit: this.model.getDisplayUnit('m', 'BPx')},
      {name: 'BPy', value: this.model.getDisplayValue(this.model.others.BPy, 'm', 'BPy'), unit: this.model.getDisplayUnit('m', 'BPy')},
      {name: 'BPz', value: this.model.getDisplayValue(this.model.others.BPz, 'm', 'BPz'), unit: this.model.getDisplayUnit('m', 'BPz')},
      {name: 'EP', value: this.model.others.EP, unit: 'NO.'},
      {name: 'EPx', value: this.model.getDisplayValue(this.model.others.EPx, 'm', 'EPx'), unit: this.model.getDisplayUnit('m', 'EPx')},
      {name: 'EPy', value: this.model.getDisplayValue(this.model.others.EPy, 'm', 'EPy'), unit: this.model.getDisplayUnit('m', 'EPy')},
      {name: 'EPz', value: this.model.getDisplayValue(this.model.others.EPz, 'm', 'EPz'), unit: this.model.getDisplayUnit('m', 'EPz')},
      {name: 'amount_H', value: this.model.others.amount_H, unit: '列'},
    ];

    private columns = [
      {
        data: 'unit',
        readOnly: true
      },
      {
        data: 'value',
      }
    ];

    private integer_cell: any[] = [
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
          if (originalUnit && (originalUnit === 'm' || originalUnit === 'mm' || originalUnit === 'km')) {
            const storageValue = this.model.getStorageValue(value, originalUnit, name);
            this.model.others[name] = storageValue;
          } else {
            this.model.others[name] = value;
          }
        }
        // 再描画
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
      'amount_H': '列'
    };
    return unitMap[fieldName] || '';
  }
}
