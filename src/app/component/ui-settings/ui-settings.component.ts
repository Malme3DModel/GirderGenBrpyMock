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
  public selectedSidebarItem: string = '';
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

  public getSidebarItemsForReorder(): string[] {
    return this.settings.sidebar.itemOrder;
  }

  public getSidebarItemLabel(itemId: string): string {
    const labels: Record<string, string> = {
      'others': '共通',
      'display': '構成',
      'pavement': '舗装',
      'slab': '床版',
      'beam': '主桁',
      'mid': '中間対傾構',
      'cross': '横構',
      'crossbeam': '荷重分配横桁',
      'endbeam': '端横桁'
    };
    return labels[itemId] || itemId;
  }

  public moveSidebarItemUp(): void {
    if (!this.selectedSidebarItem) return;
    
    const currentIndex = this.settings.sidebar.itemOrder.indexOf(this.selectedSidebarItem);
    if (currentIndex > 0) {
      const newOrder = [...this.settings.sidebar.itemOrder];
      [newOrder[currentIndex], newOrder[currentIndex - 1]] = [newOrder[currentIndex - 1], newOrder[currentIndex]];
      
      this.settings = {
        ...this.settings,
        sidebar: {
          ...this.settings.sidebar,
          itemOrder: newOrder
        }
      };
      this.onSettingsChange();
    }
  }

  public moveSidebarItemDown(): void {
    if (!this.selectedSidebarItem) return;
    
    const currentIndex = this.settings.sidebar.itemOrder.indexOf(this.selectedSidebarItem);
    if (currentIndex < this.settings.sidebar.itemOrder.length - 1) {
      const newOrder = [...this.settings.sidebar.itemOrder];
      [newOrder[currentIndex], newOrder[currentIndex + 1]] = [newOrder[currentIndex + 1], newOrder[currentIndex]];
      
      this.settings = {
        ...this.settings,
        sidebar: {
          ...this.settings.sidebar,
          itemOrder: newOrder
        }
      };
      this.onSettingsChange();
    }
  }

  public close(): void {
    this.dialogRef.close();
  }
}
