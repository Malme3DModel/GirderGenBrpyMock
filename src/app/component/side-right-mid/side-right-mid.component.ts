import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';
import { SettingsService } from 'src/app/service/settings.service';

@Component({
  selector: 'app-side-right-mid',
  templateUrl: './side-right-mid.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightMidComponent {

  constructor(public dialogRef: MatDialogRef<SideRightMidComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService,
    public settings: SettingsService) {
    
    document.addEventListener('sliderChange', (event: any) => {
      const { row, value } = event.detail;
      const currentDataset = this.dataset;
      const name: string = currentDataset[row].name;
      const numericValue = parseFloat(value);
      
      if (name !== 'mid' && name !== 'Gusset01' && name !== 'Gusset02' && name !== 'Gusset03') {
        this.model.mid[name] = numericValue;
        this.redraw();
      }
    });
  }

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
      { name: 'A', value: this.model.mid.A, unit: 'mm'},
      { name: 'B', value: this.model.mid.B, unit: 'mm'},
      { name: 't', value: this.model.mid.t, unit: 'mm'},
      { name: 's', value: this.model.mid.s, unit: 'mm'},
      { name: 's_out', value: this.model.mid.s_out, unit: 'mm'},
      { name: 's_in', value: this.model.mid.s_in, unit: 'mm'},
      { name: 'dz', value: this.model.mid.dz, unit: 'mm'},
      { name: 'H', value: this.model.mid.H, unit: 'mm'},
      { name: 'Gusset01', value: '', unit: ''},
      { name: 'GA1', value: this.model.mid.GA1, unit: 'mm'},
      { name: 'GD1', value: this.model.mid.GD1, unit: 'mm'},
      { name: 'GB1', value: this.model.mid.GB1, unit: 'mm'},
      { name: 'GC1', value: this.model.mid.GC1, unit: 'mm'},
      { name: 'Gt1', value: this.model.mid.Gt1, unit: 'mm'},
      { name: 'Gusset02', value: '', unit: ''},
      { name: 'GA2', value: this.model.mid.GA2, unit: 'mm'},
      { name: 'GD2', value: this.model.mid.GD2, unit: 'mm'},
      { name: 'GB2', value: this.model.mid.GB2, unit: 'mm'},
      { name: 'GC2', value: this.model.mid.GC2, unit: 'mm'},
      { name: 'Gt2', value: this.model.mid.Gt2, unit: 'mm'},
      { name: 'Gdx2', value: this.model.mid.Gdx2, unit: 'mm'},
      { name: 'Gusset03', value: '', unit: ''},
      { name: 'GA3', value: this.model.mid.GA3, unit: 'mm'},
      { name: 'GD3', value: this.model.mid.GD3, unit: 'mm'},
      { name: 'GC3', value: this.model.mid.GC3, unit: 'mm'},
      { name: 'GB3', value: this.model.mid.GB3, unit: 'mm'},
      { name: 'Gt3', value: this.model.mid.Gt1, unit: 'mm'},
      { name: 'Gdx3', value: this.model.mid.Gdx2, unit: 'mm'},
    ];

    private get columns() {
      if (this.settings.inputType === 'slider') {
        return [
          {
            data: 'unit',
            readOnly: true,
          },
          {
            data: 'value',
            type: 'numeric',
            renderer: (instance: any, td: any, row: any, col: any, prop: any, value: any, cellProperties: any) => {
              const item = this.dataset[row];
              if (item && typeof item.value === 'number' && 
                  item.name !== 'mid' && item.name !== 'Gusset01' && 
                  item.name !== 'Gusset02' && item.name !== 'Gusset03') {
                const max = item.value * 2;
                const min = 0;
                td.innerHTML = `
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <input type="range" min="${min}" max="${max}" value="${value}" 
                           style="flex: 1;" 
                           onchange="this.nextElementSibling.value = this.value; 
                                    const event = new CustomEvent('sliderChange', {detail: {row: ${row}, value: this.value}});
                                    document.dispatchEvent(event);">
                    <input type="number" value="${value}" min="${min}" max="${max}" 
                           style="width: 60px;" readonly>
                  </div>
                `;
              } else {
                td.innerHTML = `<input type="text" value="${value}" style="width: 100%;">`;
              }
              return td;
            }
          }
        ];
      } else {
        return [
          {
            data: 'unit',
            readOnly: true,
          },
          {
            data: 'value',
            type: 'numeric',
            numericFormat: {
              pattern: '0,0.0'
            }
          }
        ];
      }
    }


    public get dynamicHotSettings(): Handsontable.GridSettings {
      return {
        data: this.dataset,
        colHeaders: false,
        rowHeaders: this.rowheader,
        width: '330',
        columns: this.columns,
        colWidths: [50,100],
        allowEmpty: false,
        beforeChange: (changes, source)=>{
          for(const item of changes){
            if (item === null){
              continue
            }
            let value = parseFloat(item[3]);
            if( isNaN(value) )
              return false;
            const name: string = this.dataset[item[0]].name;
            this.model.mid[name] = value;
          }
          this.redraw();
          return true;
        },
      };
    }
}
