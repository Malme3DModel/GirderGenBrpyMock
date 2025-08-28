import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';
import { SettingsService } from 'src/app/service/settings.service';

@Component({
  selector: 'app-side-right-endbeam',
  templateUrl: './side-right-endbeam.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightEndbeamComponent {

  constructor(public dialogRef: MatDialogRef<SideRightEndbeamComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService,
    public settings: SettingsService) {
    
    document.addEventListener('sliderChange', (event: any) => {
      const { row, value } = event.detail;
      const currentDataset = this.dataset;
      const name: string = currentDataset[row].name;
      const numericValue = parseFloat(value);
      
      if (name !== 'Endbeam') {
        this.model.endbeam[name] = numericValue;
        this.redraw();
      }
    });
  }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

    private rowheader: string[] = [
      '端横桁',
      'フランジ幅',
      'フランジ厚',
      'ウェブ幅',
      'ウェブ厚',
      '離隔（外側）',
      '離隔（内側）'
    ];

    private dataset: any[] = [
      { name: 'endbeam', value: '', unit: ''},
      {name: 'D5', value: this.model.endbeam.D5, unit: 'mm'},
      {name: 'tf4', value: this.model.endbeam.tf4, unit: 'mm'},
      {name: 'W5', value: this.model.endbeam.W5, unit: 'mm'},
      {name: 'tw4', value: this.model.endbeam.tw4, unit: 'mm'},
      {name: 's_edge3', value: this.model.endbeam.s_edge3, unit: 'mm'},
      {name: 's_middle3', value: this.model.endbeam.s_middle3, unit: 'mm'},    ];

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
              if (item && typeof item.value === 'number' && item.name !== 'Endbeam') {
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
            this.model.endbeam[name] = value;
          }
          this.redraw();
          return true;
        },
      };
    }
}
