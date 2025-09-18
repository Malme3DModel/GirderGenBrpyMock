import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GirderPalamService } from '../../service/girder-palam.service';
import { pvGirderService } from '../../three/pvGirder.service';

@Component({
  selector: 'app-settings-model-appearance',
  templateUrl: './settings-model-appearance.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SettingsModelAppearanceComponent {

  constructor(
    public dialogRef: MatDialogRef<SettingsModelAppearanceComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService
  ) { }

  public redraw(): void {
    this.girder.createGirder(this.model.palam());
  }

  onColorChange(componentType: string, event: any): void {
    if (this.model.componentAppearance[componentType] && event.target) {
      this.model.componentAppearance[componentType].color = event.target.value;
      this.redraw();
    }
  }

  onOpacityChange(componentType: string, event: any): void {
    if (this.model.componentAppearance[componentType] && event.value !== null) {
      this.model.componentAppearance[componentType].opacity = event.value;
      this.redraw();
    }
  }

  getComponentTypes(): string[] {
    return Object.keys(this.model.componentAppearance);
  }

  savePreset(): void {
    const presetData = {
      componentAppearance: this.model.componentAppearance,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };

    const dataStr = JSON.stringify(presetData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `model-appearance-preset-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('preset-file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  loadPreset(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const presetData = JSON.parse(e.target.result);
        if (presetData.componentAppearance) {
          this.model.componentAppearance = presetData.componentAppearance;
          this.redraw();
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
