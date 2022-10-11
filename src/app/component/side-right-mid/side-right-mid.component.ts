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
      'L鋼底面幅',
      'L鋼側面幅',
      'L鋼厚',
      '水平部離隔',
      '斜部離隔（外側）',
      '斜部離隔（内側）',
      '斜部接合点間距離（X値）',
      '斜部接合点間距離（Z値）',
    ];


    private dataset: any[] = [
      { name: 'A', value: this.model.mid.A, unit: 'm'},
      { name: 'B', value: this.model.mid.B, unit: 'm'},
      { name: 't', value: this.model.mid.t, unit: 'm'},
      { name: 's', value: this.model.mid.s, unit: 'm'},
      { name: 's_out', value: this.model.mid.s_out, unit: 'm'},
      { name: 's_in', value: this.model.mid.s_in, unit: 'm'},
      { name: 'dz', value: this.model.mid.dz, unit: 'm'},
      { name: 'H', value: this.model.mid.H, unit: 'm'},
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


    public hotSettings: Handsontable.GridSettings = {
      data: this.dataset,
      colHeaders: false,
      rowHeaders: this.rowheader,
      columns: this.columns,
      allowEmpty: false,
      beforeChange: (changes, source)=>{
        for(const [row, prop, oldValue, newValue] of changes){
          let value = parseFloat(newValue);
          if( isNaN(value) )
            return false;
          const name: string = this.dataset[row].name;
          this.model.mid[name] = value;
        }
        // 再描画
        this.redraw();
        return true;
      },
    };
}
