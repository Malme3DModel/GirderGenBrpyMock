import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-mid',
  templateUrl: './side-right-mid.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightMidComponent {

  constructor(public dialogRef: MatDialogRef<SideRightMidComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

    private rowheader: string[] = [
      '中間対傾構',
      'L鋼底面幅',
      'L鋼側面幅',
      'L鋼厚',
      '水平部離隔',
      '斜部離隔（外側）',
      '斜部離隔（内側）',
      '中間対傾構配置高',
      '中間対傾構全体高',
      'ガセットプレート（斜材）',
      '全体高',
      '短辺高',
      '天端幅',
      '底面幅',
      '厚さ',
      'ガセットプレート（上弦材）',
      '長辺高',
      '短辺高',
      '天端幅',
      '底面幅',
      '厚さ',
      '主桁からの離隔',
      'ガセットプレート（下弦材）',
      '長辺高',
      '短辺高',
      '天端幅',
      '底面幅',
      '厚さ',
      '主桁からの離隔',
    ];


    private dataset: any[] = [
      { name: 'mid', value: '', unit: ''},
      { name: 'A', value: this.model.getDisplayValue(this.model.mid.A, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'B', value: this.model.getDisplayValue(this.model.mid.B, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 't', value: this.model.getDisplayValue(this.model.mid.t, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 's', value: this.model.getDisplayValue(this.model.mid.s, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 's_out', value: this.model.getDisplayValue(this.model.mid.s_out, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 's_in', value: this.model.getDisplayValue(this.model.mid.s_in, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'dz', value: this.model.getDisplayValue(this.model.mid.dz, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'H', value: this.model.getDisplayValue(this.model.mid.H, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'Gusset01', value: '', unit: ''},
      { name: 'GA1', value: this.model.getDisplayValue(this.model.mid.GA1, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'GD1', value: this.model.getDisplayValue(this.model.mid.GD1, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'GB1', value: this.model.getDisplayValue(this.model.mid.GB1, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'GC1', value: this.model.getDisplayValue(this.model.mid.GC1, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'Gt1', value: this.model.getDisplayValue(this.model.mid.Gt1, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'Gusset02', value: '', unit: ''},
      { name: 'GA2', value: this.model.getDisplayValue(this.model.mid.GA2, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'GD2', value: this.model.getDisplayValue(this.model.mid.GD2, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'GB2', value: this.model.getDisplayValue(this.model.mid.GB2, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'GC2', value: this.model.getDisplayValue(this.model.mid.GC2, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'Gt2', value: this.model.getDisplayValue(this.model.mid.Gt2, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'Gdx2', value: this.model.getDisplayValue(this.model.mid.Gdx2, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'Gusset03', value: '', unit: ''},
      { name: 'GA3', value: this.model.getDisplayValue(this.model.mid.GA3, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'GD3', value: this.model.getDisplayValue(this.model.mid.GD3, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'GC3', value: this.model.getDisplayValue(this.model.mid.GC3, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'GB3', value: this.model.getDisplayValue(this.model.mid.GB3, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'Gt3', value: this.model.getDisplayValue(this.model.mid.Gt1, 'mm'), unit: this.model.getDisplayUnit('mm')},
      { name: 'Gdx3', value: this.model.getDisplayValue(this.model.mid.Gdx2, 'mm'), unit: this.model.getDisplayUnit('mm')},
    ];

    private columns = [
      {
        data: 'unit',
        readOnly: true,
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
          this.model.mid[name] = storageValue;
        }
        // 再描画
        this.redraw();
        return true;
      },
    };

  private getOriginalUnit(fieldName: string): string {
    const unitMap: any = {
      'A': 'mm', 'B': 'mm', 't': 'mm', 's': 'mm', 's_out': 'mm', 's_in': 'mm', 'dz': 'mm', 'H': 'mm',
      'GA1': 'mm', 'GD1': 'mm', 'GB1': 'mm', 'GC1': 'mm', 'Gt1': 'mm',
      'GA2': 'mm', 'GD2': 'mm', 'GB2': 'mm', 'GC2': 'mm', 'Gt2': 'mm', 'Gdx2': 'mm',
      'GA3': 'mm', 'GD3': 'mm', 'GC3': 'mm', 'GB3': 'mm', 'Gt3': 'mm', 'Gdx3': 'mm'
    };
    return unitMap[fieldName] || '';
  }
}
