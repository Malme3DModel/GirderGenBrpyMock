import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GirderPalamService } from '../../service/girder-palam.service';

@Component({
  selector: 'app-settings-custom-menu',
  templateUrl: './settings-custom-menu.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SettingsCustomMenuComponent {
  
  public availableItems: any[] = [];
  public selectedItems: any[] = [];
  public customMenuName: string = '';
  public editingMenuId: number | null = null;
  public showCreateForm: boolean = false;
  public Object = Object;

  constructor(
    public dialogRef: MatDialogRef<SettingsCustomMenuComponent>,
    public model: GirderPalamService
  ) {
    this.availableItems = this.model.getAllAvailableInputItems();
  }

  public getCustomMenus(): any[] {
    return this.model.customMenus.menus;
  }

  public startCreateMenu(): void {
    this.showCreateForm = true;
    this.editingMenuId = null;
    this.customMenuName = '';
    this.selectedItems = [];
  }

  public startEditMenu(menu: any): void {
    this.showCreateForm = true;
    this.editingMenuId = menu.id;
    this.customMenuName = menu.name;
    this.selectedItems = [...menu.items];
  }

  public cancelEdit(): void {
    this.showCreateForm = false;
    this.editingMenuId = null;
    this.customMenuName = '';
    this.selectedItems = [];
  }

  public saveCustomMenu(): void {
    if (!this.customMenuName.trim() || this.selectedItems.length === 0) {
      alert('メニュー名と入力項目を設定してください。');
      return;
    }

    const menuData = {
      name: this.customMenuName,
      items: this.selectedItems,
      createdAt: new Date().toISOString()
    };

    if (this.editingMenuId) {
      this.model.updateCustomMenu(this.editingMenuId, menuData);
    } else {
      this.model.addCustomMenu(menuData);
    }

    this.cancelEdit();
  }

  public deleteCustomMenu(id: number): void {
    if (confirm('このカスタムメニューを削除しますか？')) {
      this.model.deleteCustomMenu(id);
    }
  }

  public toggleItemSelection(item: any): void {
    const index = this.selectedItems.findIndex(selected => 
      selected.menuKey === item.menuKey && selected.name === item.name
    );
    
    if (index === -1) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(index, 1);
    }
  }

  public isItemSelected(item: any): boolean {
    return this.selectedItems.some(selected => 
      selected.menuKey === item.menuKey && selected.name === item.name
    );
  }

  public getItemsByMenu(): any {
    const grouped: any = {};
    this.availableItems.forEach(item => {
      if (!grouped[item.menuKey]) {
        grouped[item.menuKey] = [];
      }
      grouped[item.menuKey].push(item);
    });
    return grouped;
  }

  public getMenuKeys(): string[] {
    return Object.keys(this.getItemsByMenu());
  }

  public getMenuLabel(menuKey: string): string {
    const labels: any = {
      'others': '共通',
      'beam': '主桁',
      'slab': '床版',
      'pavement': '舗装',
      'cross': '横構',
      'mid': '中間対傾構',
      'crossbeam': '荷重分配横桁',
      'endbeam': '端横桁'
    };
    return labels[menuKey] || menuKey;
  }

  public savePreset(): void {
    const presetData = {
      customMenus: this.model.customMenus,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };

    const dataStr = JSON.stringify(presetData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `custom-menu-preset-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  public triggerFileInput(): void {
    const fileInput = document.getElementById('custom-menu-file-input') as HTMLInputElement;
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
        if (presetData.customMenus) {
          this.model.customMenus = presetData.customMenus;
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
