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
        // 再描画
        this.redraw();
        return true;
      },
    };
}
