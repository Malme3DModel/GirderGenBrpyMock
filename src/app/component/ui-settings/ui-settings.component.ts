import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UISettingsService, UISettings } from 'src/app/service/ui-settings.service';
import { Subscription } from 'rxjs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-ui-settings',
  templateUrl: './ui-settings.component.html',
  styleUrls: ['./ui-settings.component.scss']
})
export class UISettingsComponent implements OnInit, OnDestroy {
  public settings: UISettings;
  private subscription!: Subscription;

  constructor(
    public dialogRef: MatDialogRef<UISettingsComponent>,
    private uiSettingsService: UISettingsService
  ) {
    this.settings = this.uiSettingsService.getSettings();
  }

  ngOnInit(): void {
    this.subscription = this.uiSettingsService.settings$.subscribe(settings => {
      this.settings = { ...settings };
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onSettingsChange(): void {
    this.uiSettingsService.updateSettings(this.settings);
  }

  public resetAllSettings(): void {
    this.uiSettingsService.resetSettings();
  }

  public resetCategory(category: keyof UISettings): void {
    this.uiSettingsService.resetCategory(category);
  }

  public exportSettings(): void {
    const settingsJson = this.uiSettingsService.exportSettings();
    const blob = new Blob([settingsJson], { type: 'application/json' });
    saveAs(blob, 'ui-settings.json');
  }

  public onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (this.uiSettingsService.importSettings(content)) {
          alert('設定をインポートしました');
        } else {
          alert('設定ファイルの形式が正しくありません');
        }
      };
      reader.readAsText(file);
    }
  }

  public close(): void {
    this.dialogRef.close();
  }
}
