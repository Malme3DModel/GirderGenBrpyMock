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

    private columns = [
      {
        data: 'unit',
        readOnly: true,
        width: 10,
      },
      {
        data: 'value',
        type: 'numeric',
        width: 10,
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
