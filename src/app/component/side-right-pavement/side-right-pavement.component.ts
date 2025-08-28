import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';
import { SettingsService } from 'src/app/service/settings.service';

@Component({
  selector: 'app-side-right-pavement',
  templateUrl: './side-right-pavement.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightPavementComponent{

  constructor(public dialogRef: MatDialogRef<SideRightPavementComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService,
    public settings: SettingsService) {
    
    document.addEventListener('sliderChange', (event: any) => {
      const { row, value } = event.detail;
      const currentDataset = this.dataset;
      const name: string = currentDataset[row].name;
      const numericValue = parseFloat(value);
      
      if (name !== 'pavement') {
        this.model.pavement[name] = numericValue;
        this.redraw();
      }
    });
  }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

    private rowheader: string[] = [
      '舗装',
      '舗装勾配（左）',
      '舗装勾配（右）',
      '表層厚',
      '上層路盤厚',
      '下層路盤厚',
    ];


    private dataset: any[] = [
      { name: 'pavement', value: '', unit: ''},
      {name: 'i1', value: this.model.pavement.i1, unit: '%'},
      {name: 'i2', value: this.model.pavement.i2, unit: '%'},
      {name: 'T3', value: this.model.pavement.T3, unit: 'm'},
      {name: 'T2', value: this.model.pavement.T2, unit: 'm'},
      {name: 'T1', value: this.model.pavement.T1, unit: 'm'},
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
              if (item && typeof item.value === 'number' && item.name !== 'pavement') {
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
              pattern: '0,0.000'
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
        columns: this.columns,
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
            this.model.pavement[name] = value;
          }
          this.redraw();
          return true;
        },
      };
    }
}
