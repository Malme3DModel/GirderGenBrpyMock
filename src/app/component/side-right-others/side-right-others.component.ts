import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';
import { SettingsService } from 'src/app/service/settings.service';

@Component({
  selector: 'app-side-right-others',
  templateUrl: './side-right-others.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightOthersComponent{

  constructor(public dialogRef: MatDialogRef<SideRightOthersComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService,
    public settings: SettingsService) {
    
  }

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
      {name: 'amount_V', value: this.model.beam.amount_V, unit: '本'},
    ];

    private get filteredDataset(): any[] {
      if (this.settings.lodMode === 200) {
        return this.dataset.filter((item, index) => {
          return [0, 1, 2, 3, 5, 16, 17].includes(index);
        });
      }
      return this.dataset.filter((item, index) => {
        return index !== 17;
      });
    }

    private get filteredRowHeaders(): string[] {
      if (this.settings.lodMode === 200) {
        return this.rowheader.filter((item, index) => {
          return [0, 1, 2, 3, 5, 16].includes(index);
        }).concat(['主桁本数']);
      }
      return this.rowheader;
    }

    private get columns() {
      return [
        {
          data: 'unit',
          readOnly: true
        },
        {
          data: 'value',
        }
      ];
    }

    private integer_cell: any[] = [
      {row: 2, col: 2, type: 'numeric', numericFormat: {pattern: 'mantissa'}},
    ];

    public get hotSettings(): Handsontable.GridSettings {
      return {
        data: this.filteredDataset,
        colHeaders: false,
        rowHeaders: this.filteredRowHeaders,
        columns: this.columns,
        cell: this.integer_cell,
        allowEmpty: false,
        beforeChange: (changes, source)=>{
          for(const item of changes){
            if (item === null){
              continue;
            }
            let value = item[3];
            const currentDataset = this.filteredDataset;
            const name: string = currentDataset[item[0]].name;
            const isInteger = this.integer_cell.find( element => element.row === item[0]);
            if(isInteger != null)
              value = Math.round(value);
            
            if (name === 'amount_V') {
              this.model.beam[name] = value;
            } else {
              this.model.others[name] = value;
            }
          }
          this.redraw();
          return true;
        },
      };
    }
}
