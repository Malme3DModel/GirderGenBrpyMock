import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-slab',
  templateUrl: './side-right-slab.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightSlabComponent{

  constructor(public dialogRef: MatDialogRef<SideRightSlabComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

    private rowheader: string[] = [
      '左幅員',
      '右幅員',
      '地覆幅',
      '壁高',
      '床版勾配（左）',
      '床版勾配（右）',
      '床版厚',
      'ハンチ高',
      'ハンチ勾配',
      '床版端部から主桁までの離隔',
    ];


    private dataset: any[] = [
      {name: 'b1', value: this.model.slab.b1, unit: 'm'},
      {name: 'b2', value: this.model.slab.b2, unit: 'm'},
      {name: 'b3', value: this.model.slab.b3, unit: 'm'},
      {name: 'SH', value: this.model.slab.SH, unit: 'm'},
      {name: 'i1', value: this.model.slab.i1, unit: '%'},
      {name: 'i2', value: this.model.slab.i2, unit: '%'},
      {name: 'T1', value: this.model.slab.T1, unit: 'm'},
      {name: 'T2', value: this.model.slab.T2, unit: 'm'},
      {name: 'n', value: this.model.slab.n, unit: '1:n'},
      {name: 'Ss', value: this.model.slab.Ss, unit: 'm'},
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
          this.model.slab[name] = value;
        }
        // 再描画
        this.redraw();
        return true;
      },
    };
}
