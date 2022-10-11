import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-crossbeam',
  templateUrl: './side-right-crossbeam.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightCrossbeamComponent {

  constructor(public dialogRef: MatDialogRef<SideRightCrossbeamComponent>,
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
      '離隔（外側）',
      '離隔（内側）',
      '配置列番号',
    ];


    private dataset: any[] = [
      { name: 'D4', value: this.model.crossbeam.D4, unit: 'm'},
      { name: 'tf3', value: this.model.crossbeam.tf3, unit: 'm'},
      { name: 'W3', value: this.model.crossbeam.W3, unit: 'm'},
      { name: 'tw3', value: this.model.crossbeam.tw3, unit: 'm'},
      { name: 's_edge2', value: this.model.crossbeam.s_edge2, unit: 'm'},
      { name: 's_middle2', value: this.model.crossbeam.s_middle2, unit: 'm'},
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
          this.model.crossbeam[name] = value;
        }
        // 再描画
        this.redraw();
        return true;
      },
    };
    
}
