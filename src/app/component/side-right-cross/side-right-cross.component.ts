import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';
import { SettingsService } from 'src/app/service/settings.service';

@Component({
  selector: 'app-side-right-cross',
  templateUrl: './side-right-cross.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightCrossComponent {

  constructor(public dialogRef: MatDialogRef<SideRightCrossComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService,
    public settings: SettingsService) {
    
    document.addEventListener('sliderChange', (event: any) => {
      const { row, value } = event.detail;
      const currentDataset = this.dataset;
      const name: string = currentDataset[row].name;
      const numericValue = parseFloat(value);
      
      if (name !== 'Cross' && name !== 'Gusset04') {
        this.model.cross[name] = numericValue;
        this.redraw();
      }
    });
  }

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
      {name: 'D3',        value: this.model.cross.D3,       unit: 'mm'},
      {name: 'tf2',       value: this.model.cross.tf2,      unit: 'mm'},
      {name: 'W2',        value: this.model.cross.W2,       unit: 'mm'},
      {name: 'tw2',       value: this.model.cross.tw2,      unit: 'mm'},
      {name: 's_edge',    value: this.model.cross.s_edge,   unit: 'mm'},
      {name: 's_middle',  value: this.model.cross.s_middle, unit: 'mm'},
      { name: 'Gusset04', value: '', unit: ''},
      { name: 'GA4', value: this.model.cross.GA4, unit: 'mm'},
      { name: 'GD4', value: this.model.cross.GD4, unit: 'mm'},
      { name: 'GB4', value: this.model.cross.GB4, unit: 'mm'},
      { name: 'GC4', value: this.model.cross.GC4, unit: 'mm'},
      { name: 'Gt4', value: this.model.cross.Gt4, unit: 'mm'},
      ];

    private get columns() {
      if (this.settings.inputType === 'slider') {
        return [
          {
            data: 'unit',
            readOnly: true
          },
          {
            data: 'value',
            type: 'numeric',
            renderer: (instance: any, td: any, row: any, col: any, prop: any, value: any, cellProperties: any) => {
              const item = this.dataset[row];
              if (item && typeof item.value === 'number' && item.name !== 'Cross' && item.name !== 'Gusset04') {
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
      }
    }


    public get dynamicHotSettings(): Handsontable.GridSettings {
      return {
        data: this.dataset,
        colHeaders: false,
        rowHeaders: this.rowheader,
        width: '300',
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
            this.model.cross[name] = value;
          }
          this.redraw();
          return true;
        },
      };
    }
}
