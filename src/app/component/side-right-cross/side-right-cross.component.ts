import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-cross',
  templateUrl: './side-right-cross.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightCrossComponent {

  constructor(public dialogRef: MatDialogRef<SideRightCrossComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

    private rowheader: string[] = [
      'フランジ幅',
      'フランジ厚',
      'ウェブ幅',
      'ウェブ厚',
      '離隔（外側',
      '離隔（内側',
    ];

    
    private dataset: any[] = [
      {name: 'D3',        value: this.model.cross.D3,       unit: 'm'},
      {name: 'tf2',       value: this.model.cross.tf2,      unit: 'm'},
      {name: 'W2',        value: this.model.cross.W2,       unit: 'm'},
      {name: 'tw2',       value: this.model.cross.tw2,      unit: 'm'},
      {name: 's_edge',    value: this.model.cross.s_edge,   unit: 'm'},
      {name: 's_middle',  value: this.model.cross.s_middle, unit: 'm'},
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
          this.model.cross[name] = value;
        }
        // 再描画
        this.redraw();
        return true;
      },
    };
}
