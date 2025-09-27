import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GirderPalamService } from '../../service/girder-palam.service';

@Component({
  selector: 'app-settings-units',
  templateUrl: './settings-units.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SettingsUnitsComponent {

  constructor(
    public dialogRef: MatDialogRef<SettingsUnitsComponent>,
    public model: GirderPalamService
  ) { }

  public getUnitOptions(): any {
    return this.model.getUnitOptions();
  }

  public getUnitCategories(): string[] {
    return ['length', 'distance'];
  }

  public getCategoryLabel(category: string): string {
    const labels: any = {
      'length': '長さ単位',
      'distance': '距離単位'
    };
    return labels[category] || category;
  }

  public onUnitChange(category: string, newUnit: string): void {
    this.model.unitSettings[category] = newUnit;
  }

  public savePreset(): void {
    const presetData = {
      unitSettings: this.model.unitSettings,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };

    const dataStr = JSON.stringify(presetData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `unit-settings-preset-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  public triggerFileInput(): void {
    const fileInput = document.getElementById('unit-settings-file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  public loadPreset(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const presetData = JSON.parse(e.target.result);
        if (presetData.unitSettings) {
          this.model.unitSettings = presetData.unitSettings;
        } else {
          alert('無効なプリセットファイルです。');
        }
      } catch (error) {
        alert('プリセットファイルの読み込みに失敗しました。');
      }
    };
    reader.readAsText(file);
    
    event.target.value = '';
  }

}
