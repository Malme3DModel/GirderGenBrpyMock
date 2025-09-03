import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';
import { SettingsService, CustomInputMenu } from '../../service/settings.service';

@Component({
  selector: 'app-side-right-others',
  templateUrl: './side-right-others.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightOthersComponent{

  constructor(public dialogRef: MatDialogRef<SideRightOthersComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService,
    public settings: SettingsService,
    @Optional() @Inject(MAT_DIALOG_DATA) public customMenuData: CustomInputMenu) {
    
    if (this.customMenuData) {
      this.initializeCustomDataset();
    }
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
      {name: 'ProjectName', value: this.model.others.Name_P, unit: '', unitSystem: 'default'},
      {name: 'RouteName', value: this.model.others.Name_R, unit: '', unitSystem: 'default'},
      {name: 'RoadClass', value: this.model.others.Class_R, unit: '', unitSystem: 'default'},
      {name: 'L', value: this.model.others.L, unit: 'm', unitSystem: 'default'},
      {name: 'L_01', value: this.model.others.L_01, unit: 'm', unitSystem: 'default'},
      {name: 'L_02', value: this.model.others.L_02, unit: 'm', unitSystem: 'default'},
      {name: 'Milepost_B', value: this.model.others.Milepost_B, unit: 'km', unitSystem: 'default'},
      {name: 'Milepost_E', value: this.model.others.Milepost_E, unit: 'km', unitSystem: 'default'},
      {name: 'BP', value: this.model.others.BP, unit: 'NO.', unitSystem: 'default'},
      {name: 'BPx', value: this.model.others.BPx, unit: 'm', unitSystem: 'default'},
      {name: 'BPy', value: this.model.others.BPy, unit: 'm', unitSystem: 'default'},
      {name: 'BPz', value: this.model.others.BPz, unit: 'm', unitSystem: 'default'},
      {name: 'EP', value: this.model.others.EP, unit: 'NO.', unitSystem: 'default'},
      {name: 'EPx', value: this.model.others.EPx, unit: 'm', unitSystem: 'default'},
      {name: 'EPy', value: this.model.others.EPy, unit: 'm', unitSystem: 'default'},
      {name: 'EPz', value: this.model.others.EPz, unit: 'm', unitSystem: 'default'},
      {name: 'amount_H', value: this.model.others.amount_H, unit: '列', unitSystem: 'default'},
      {name: 'amount_V', value: this.model.beam.amount_V, unit: '本', unitSystem: 'default'},
    ];

    private customDataset: any[] = [];

    private get filteredDataset(): any[] {
      if (this.customMenuData) {
        return this.customDataset;
      }
      
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
      if (this.customMenuData) {
        return this.customDataset.map(item => item.label || item.name);
      }
      
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
          readOnly: true,
          width: 60
        },
        {
          data: 'value',
          width: 120
        },
        {
          data: 'unitSystem',
          type: 'dropdown',
          source: ['default', 'metric'],
          width: 80
        }
      ];
    }

    private integer_cell: any[] = [
      {row: 2, col: 2, type: 'numeric', numericFormat: {pattern: 'mantissa'}},
    ];

    public get hotSettings(): Handsontable.GridSettings {
      return {
        data: this.filteredDataset,
        colHeaders: ['単位', '値', '単位系'],
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
            const dataItem = currentDataset[item[0]];
            const name: string = dataItem.name;
            const unit: string = dataItem.unit;
            const unitSystem: string = dataItem.unitSystem || 'default';
            const isInteger = this.integer_cell.find( element => element.row === item[0]);
            
            if (item[1] === 'unitSystem') {
              dataItem.unitSystem = value;
              return true;
            }
            
            if (item[1] === 'value') {
              if(isInteger != null)
                value = Math.round(value);
              
              if (unitSystem === 'metric' && typeof value === 'number') {
                if (unit === 'm') {
                  value = value * 1000;
                } else if (unit === 'N') {
                  value = value * 1000;
                }
              }
              
              if (this.customMenuData) {
                const param = this.customMenuData.parameters.find(p => p.key === name);
                if (param) {
                  if (param.category === 'beam') {
                    this.model.beam[name] = value;
                  } else if (param.category === 'slab') {
                    this.model.slab[name] = value;
                  } else if (param.category === 'pavement') {
                    this.model.pavement[name] = value;
                  } else if (param.category === 'mid') {
                    this.model.mid[name] = value;
                  } else if (param.category === 'cross') {
                    this.model.cross[name] = value;
                  } else if (param.category === 'crossbeam') {
                    this.model.crossbeam[name] = value;
                  } else if (param.category === 'endbeam') {
                    this.model.endbeam[name] = value;
                  } else {
                    this.model.others[name] = value;
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
          }
          this.redraw();
          return true;
        },
      };
    }

    private initializeCustomDataset(): void {
      this.customDataset = this.customMenuData.parameters.map(param => {
        let value;
        if (param.category === 'beam') {
          value = this.model.beam[param.key];
        } else if (param.category === 'slab') {
          value = this.model.slab[param.key];
        } else if (param.category === 'pavement') {
          value = this.model.pavement[param.key];
        } else if (param.category === 'mid') {
          value = this.model.mid[param.key];
        } else if (param.category === 'cross') {
          value = this.model.cross[param.key];
        } else if (param.category === 'crossbeam') {
          value = this.model.crossbeam[param.key];
        } else if (param.category === 'endbeam') {
          value = this.model.endbeam[param.key];
        } else {
          value = this.model.others[param.key];
        }
        
        return {
          name: param.key,
          label: param.label,
          value: value,
          unit: this.getUnitForParameter(param.key),
          unitSystem: 'default'
        };
      });
    }

    private getUnitForParameter(key: string): string {
      const unitMap: { [key: string]: string } = {
        'L': 'm', 'L_01': 'm', 'L_02': 'm',
        'BPx': 'm', 'BPy': 'm', 'BPz': 'm',
        'EPx': 'm', 'EPy': 'm', 'EPz': 'm',
        'D': 'mm', 'tf': 'mm', 'W': 'mm', 'tw': 'mm',
        'b1': 'm', 'b2': 'm', 'b3': 'm', 'SH': 'mm',
        'T1': 'mm', 'T2': 'mm', 'T3': 'mm',
        'amount_H': '列', 'amount_V': '本'
      };
      return unitMap[key] || '';
    }
}
