import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-coordinate',
  templateUrl: './side-right-coordinate.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightCoordinateComponent {

  constructor(public dialogRef: MatDialogRef<SideRightCoordinateComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

    private rowheader: string[] = [
      'x座標',
      'y座標',
      'z座標',
      'x座標',
      'y座標',
      'z座標',
    ];

    private dataset: any[] = [
      {name: 'BPx',       value: this.model.coordinate.BPx,      unit: 'm'},
      {name: 'BPy',       value: this.model.coordinate.BPy,      unit: 'm'},
      {name: 'BPz',       value: this.model.coordinate.BPz,      unit: 'm'},
      {name: 'EPx',       value: this.model.coordinate.EPx,      unit: 'm'},
      {name: 'EPy',       value: this.model.coordinate.EPy,      unit: 'm'},
      {name: 'EPz',       value: this.model.coordinate.EPz,      unit: 'm'},
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
