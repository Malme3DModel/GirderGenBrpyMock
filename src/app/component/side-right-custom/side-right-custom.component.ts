import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { GirderPalamService } from '../../service/girder-palam.service';
import { pvGirderService } from '../../three/pvGirder.service';

@Component({
  selector: 'app-side-right-custom',
  templateUrl: './side-right-custom.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightCustomComponent {

  public customMenu: any;
  public hotSettings: Handsontable.GridSettings = {};

  constructor(
    public dialogRef: MatDialogRef<SideRightCustomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public model: GirderPalamService,
    private girder: pvGirderService
  ) {
    this.customMenu = data.customMenu;
    console.log('Custom menu data:', this.customMenu);
    this.setupHandsontable();
  }

  public redraw(): void {
    this.girder.createGirder(this.model.palam());
  }

  private setupHandsontable(): void {
    const rowHeaders: string[] = [];
    const dataset: any[] = [];

    console.log('Setting up Handsontable with items:', this.customMenu.items);

    if (!this.customMenu.items || this.customMenu.items.length === 0) {
      console.warn('No items found in custom menu');
      return;
    }

    this.customMenu.items.forEach((item: any) => {
      rowHeaders.push(item.label);
      
      const value = this.getValueFromPath(item.dataPath);
      console.log(`Item ${item.label}: value=${value}, dataPath=${item.dataPath}`);
      
      dataset.push({
        name: item.name,
        value: value,
        unit: item.unit,
        dataPath: item.dataPath,
        menuKey: item.menuKey
      });
    });

    const columns = [
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

    this.hotSettings = {
      data: dataset,
      colHeaders: false,
      rowHeaders: rowHeaders,
      columns: columns,
      colWidths: [50, 150],
      allowEmpty: false,
      preventOverflow: 'horizontal',
      beforeChange: (changes, source) => {
        for (const item of changes) {
          if (item === null) {
            continue;
          }
          let value = parseFloat(item[3]);
          if (isNaN(value)) {
            return false;
          }
          
          const dataItem = dataset[item[0]];
          this.setValueFromPath(dataItem.dataPath, value);
        }
        this.redraw();
        return true;
      }
    };

    console.log('Handsontable settings:', this.hotSettings);
  }

  private getValueFromPath(path: string): any {
    const parts = path.split('.');
    let current: any = this.model;
    for (const part of parts) {
      current = current[part];
    }
    return current;
  }

  private setValueFromPath(path: string, value: any): void {
    const parts = path.split('.');
    let current: any = this.model;
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }
}
