import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SettingsService } from '../../service/settings.service';
import { GirderPalamService } from '../../service/girder-palam.service';

@Component({
  selector: 'app-side-right-material',
  templateUrl: './side-right-material.component.html',
  styleUrls: ['./side-right-material.component.scss']
})
export class SideRightMaterialComponent implements OnInit {

  public dataset: any[] = [];
  public hotSettings: any;
  public unitSystem: string = 'default';

  constructor(
    public dialogRef: MatDialogRef<SideRightMaterialComponent>,
    private settings: SettingsService,
    private girderService: GirderPalamService
  ) { }

  ngOnInit(): void {
    this.unitSystem = this.settings.unitSystem;
    this.initializeDataset();
    this.setupHotSettings();
    this.updateDisplayValues();
  }

  private initializeDataset(): void {
    this.dataset = [
      { category: '鋼材', parameter: '鋼材グレード', value: 'SS400', unit: '', unitSystem: 'default', type: 'dropdown', options: ['SS400', 'SM490', 'SM570'] },
      { category: '鋼材', parameter: '降伏点 fy', value: 235, unit: 'N/mm²', unitSystem: 'default', type: 'numeric' },
      { category: '鋼材', parameter: '引張強さ fu', value: 400, unit: 'N/mm²', unitSystem: 'default', type: 'numeric' },
      { category: '鋼材', parameter: 'ヤング率 Es', value: 2.05e5, unit: 'N/mm²', unitSystem: 'default', type: 'numeric' },
      { category: '鋼材', parameter: 'ポアソン比 νs', value: 0.3, unit: '', unitSystem: 'default', type: 'numeric' },
      { category: '鋼材', parameter: '単位体積重量 γs', value: 78.5, unit: 'kN/m³', unitSystem: 'default', type: 'numeric' },
      
      { category: 'コンクリート', parameter: '設計基準強度 fc', value: 24, unit: 'N/mm²', unitSystem: 'default', type: 'dropdown', options: [24, 27, 30, 36] },
      { category: 'コンクリート', parameter: '引張強度 fct', value: 2.3, unit: 'N/mm²', unitSystem: 'default', type: 'numeric' },
      { category: 'コンクリート', parameter: 'ヤング率 Ec', value: 2.1e4, unit: 'N/mm²', unitSystem: 'default', type: 'numeric' },
      { category: 'コンクリート', parameter: 'ポアソン比 νc', value: 0.2, unit: '', unitSystem: 'default', type: 'numeric' },
      { category: 'コンクリート', parameter: '単位体積重量 γc', value: 24, unit: 'kN/m³', unitSystem: 'default', type: 'numeric' },
      { category: 'コンクリート', parameter: 'クリープ係数 φ', value: '', unit: '', unitSystem: 'default', type: 'numeric' },
      { category: 'コンクリート', parameter: '乾燥収縮ひずみ εsh', value: '', unit: '', unitSystem: 'default', type: 'numeric' },
      
      { category: 'スタッド', parameter: '鋼種', value: 'SWRCH', unit: '', unitSystem: 'default', type: 'dropdown', options: ['SWRCH', 'その他'] },
      { category: 'スタッド', parameter: '降伏点 fy_st', value: 235, unit: 'N/mm²', unitSystem: 'default', type: 'numeric' },
      { category: 'スタッド', parameter: '引張強さ fu_st', value: 400, unit: 'N/mm²', unitSystem: 'default', type: 'numeric' },
      { category: 'スタッド', parameter: 'せん断耐力式', value: '規格式', unit: '', unitSystem: 'default', type: 'dropdown', options: ['規格式', '任意値入力'] },
      
      { category: '鉄筋', parameter: '鉄筋種別', value: 'SD295', unit: '', unitSystem: 'default', type: 'dropdown', options: ['SD295', 'SD345', 'SD390'] },
      { category: '鉄筋', parameter: '降伏点 fy', value: 295, unit: 'N/mm²', unitSystem: 'default', type: 'numeric' },
      { category: '鉄筋', parameter: 'ヤング率 Es', value: 2.05e5, unit: 'N/mm²', unitSystem: 'default', type: 'numeric' }
    ];
  }

  private setupHotSettings(): void {
    this.hotSettings = {
      data: this.dataset,
      columns: [
        { data: 'category', title: 'カテゴリ', readOnly: true, width: 100 },
        { data: 'parameter', title: 'パラメータ', readOnly: true, width: 150 },
        { 
          data: 'value', 
          title: '値', 
          width: 100,
          type: 'text',
          renderer: (instance: any, td: any, row: any, col: any, prop: any, value: any, cellProperties: any) => {
            const item = this.dataset[row];
            if (item && item.type === 'dropdown') {
              cellProperties.type = 'dropdown';
              cellProperties.source = item.options;
            }
            
            if (item && item.type === 'numeric' && item.unitSystem === 'metric') {
              const displayValue = this.getDisplayValue(value, item.unit, item.unitSystem);
              td.innerHTML = displayValue.toString();
              return displayValue;
            }
            
            return value;
          }
        },
        { data: 'unit', title: '単位', readOnly: true, width: 80 },
        { 
          data: 'unitSystem', 
          title: '単位系', 
          type: 'dropdown',
          source: ['default', 'metric'],
          width: 80 
        }
      ],
      rowHeaders: false,
      colHeaders: true,
      height: 400,
      licenseKey: 'non-commercial-and-evaluation',
      beforeChange: (changes: any, source: any) => {
        if (changes && source !== 'loadData') {
          changes.forEach((change: any) => {
            const [row, prop, oldValue, newValue] = change;
            const item = this.dataset[row];
            
            if (prop === 'unitSystem') {
              item.unitSystem = newValue;
              this.updateDisplayValues();
            } else if (prop === 'value' && item && item.type === 'numeric') {
              const convertedValue = this.convertInputToDefault(newValue, item.unit, item.unitSystem);
              change[3] = convertedValue;
            }
          });
        }
        return true;
      }
    };
  }

  private handleValueChange(row: number, newValue: any): void {
    const item = this.dataset[row];
    if (item && item.type === 'numeric') {
      const convertedValue = this.convertInputToDefault(newValue, item.unit);
      this.dataset[row].value = convertedValue;
    }
  }

  private convertInputToDefault(value: any, unit: string, unitSystem: string = 'default'): number {
    if (!value || isNaN(value)) return value;
    
    const numValue = parseFloat(value);
    
    if (unitSystem === 'metric') {
      if (unit.includes('mm')) {
        return numValue * 1000;
      } else if (unit.includes('N') && !unit.includes('kN')) {
        return numValue * 1000;
      }
    }
    
    return numValue;
  }

  public changeUnitSystem(system: string): void {
    this.unitSystem = system;
    this.updateDisplayValues();
    this.hotSettings.loadData(this.dataset);
  }

  private updateDisplayValues(): void {
    this.dataset.forEach((item, index) => {
      if (item.type === 'numeric' && item.value !== null && item.value !== undefined && item.value !== '') {
        const displayValue = this.getDisplayValue(item.value, item.unit, item.unitSystem);
        this.dataset[index].displayValue = displayValue;
      }
    });
  }

  private getDisplayValue(value: number, unit: string, unitSystem: string = 'default'): number {
    if (unitSystem === 'metric') {
      if (unit.includes('mm')) {
        return value / 1000;
      } else if (unit.includes('N') && !unit.includes('kN')) {
        return value / 1000;
      }
    }
    return value;
  }

  public save(): void {
    this.girderService.setMaterialProperties(this.dataset);
    this.dialogRef.close();
  }

  public close(): void {
    this.dialogRef.close();
  }
}
