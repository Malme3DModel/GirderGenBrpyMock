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
      {name: 'ProjectName', value: this.model.others.Name_P, unit: ''},
      {name: 'RouteName', value: this.model.others.Name_R, unit: ''},
      {name: 'RoadClass', value: this.model.others.Class_R, unit: ''},
      {name: 'L', value: this.model.others.L, unit: 'm'},
      {name: 'L_01', value: this.model.others.L_01, unit: 'm'},
      {name: 'L_02', value: this.model.others.L_02, unit: 'm'},
      {name: 'Milepost_B', value: this.model.others.Milepost_B, unit: 'km'},
      {name: 'Milepost_E', value: this.model.others.Milepost_E, unit: 'km'},
      {name: 'BP', value: this.model.others.BP, unit: 'NO.'},
      {name: 'BPx', value: this.model.others.BPx, unit: 'm'},
      {name: 'BPy', value: this.model.others.BPy, unit: 'm'},
      {name: 'BPz', value: this.model.others.BPz, unit: 'm'},
      {name: 'EP', value: this.model.others.EP, unit: 'NO.'},
      {name: 'EPx', value: this.model.others.EPx, unit: 'm'},
      {name: 'EPy', value: this.model.others.EPy, unit: 'm'},
      {name: 'EPz', value: this.model.others.EPz, unit: 'm'},
      {name: 'amount_H', value: this.model.others.amount_H, unit: '列'},
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
      {row: 2, col: 2, type: 'numeric', numericFormat: {pattern: 'mantissa'}},
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
          this.model.others[name] = value;
        }
        // 再描画
        this.redraw();
        return true;
      },
    };
}
