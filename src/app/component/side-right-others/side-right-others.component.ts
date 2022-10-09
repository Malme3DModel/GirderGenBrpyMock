import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-others',
  templateUrl: './side-right-others.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightOthersComponent{

  constructor(public dialogRef: MatDialogRef<SideRightOthersComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

    private rowheader: string[] = [
      '起点端部から端横構までの離隔',
      '終点端部から端横構までの離隔',
      '端横構、荷重分配横桁、中間対傾構の総和',
      '橋長',
    ];

    private dataset: any[] = [
      {name: 's_BP', value: this.model.others.s_BP, unit: 'm'},
      {name: 's_EP', value: this.model.others.s_EP, unit: 'm'},
      {name: 'amount_H', value: this.model.others.amount_H, unit: '本'},
      {name: 'L', value: this.model.others.L, unit: 'm'},
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

    private integer_cell: any[] = [
      {row: 2, col: 2, type: 'numeric', numericFormat: {pattern: 'mantissa'}},
    ];

    public hotSettings: Handsontable.GridSettings = {
      data: this.dataset,
      colHeaders: false,
      rowHeaders: this.rowheader,
      columns: this.columns,
      cell: this.integer_cell,
      allowEmpty: false,
      beforeChange: (changes, source)=>{
        for(const [row, prop, oldValue, newValue] of changes){
          let value = parseFloat(newValue);
          if( isNaN(value) )
            return false;
          const name: string = this.dataset[row].name;
          const isInteger = this.integer_cell.find( element => element.row === row);
          if(isInteger != null)
            value = Math.round(value);
          this.model.others[name] = value;
        }
        // 再描画
        this.redraw();
        return true;
      },
    };
}
