import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-endbeam',
  templateUrl: './side-right-endbeam.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightEndbeamComponent {

  constructor(public dialogRef: MatDialogRef<SideRightEndbeamComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

    private rowheader: string[] = [
      'フランジ幅',
      'フランジ厚',
      'ウェブ厚',
      '離隔（外側）',
      '離隔（内側）'
    ];

    private dataset: any[] = [
      {name: 'D5', value: this.model.endbeam.D5, unit: 'mm'},
      {name: 'tf4', value: this.model.endbeam.tf4, unit: 'mm'},
      {name: 'tw4', value: this.model.endbeam.tw4, unit: 'mm'},
      {name: 's_edge3', value: this.model.endbeam.s_edge3, unit: 'mm'},
      {name: 's_middle3', value: this.model.endbeam.s_middle3, unit: 'mm'},    ];

    private columns = [
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


    public hotSettings: Handsontable.GridSettings = {
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
        // 再描画
        this.redraw();
        return true;
      },
    };
}
