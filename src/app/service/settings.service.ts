import { Injectable } from '@angular/core';

export interface ComponentColors {
  pavement: string;
  slab: string;
  beam: string;
  mid: string;
  cross: string;
  crossbeam: string;
  endbeam: string;
}

export interface SideMenuVisibility {
  others: boolean;
  display: boolean;
  pavement: boolean;
  slab: boolean;
  beam: boolean;
  mid: boolean;
  cross: boolean;
  crossbeam: boolean;
  endbeam: boolean;
}

export interface CustomInputMenu {
  id: string;
  name: string;
  parameters: CustomParameter[];
}

export interface CustomParameter {
  category: string;
  key: string;
  label: string;
  type: 'number' | 'text';
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private readonly STORAGE_KEY = 'girder-ui-settings';

  public lodMode: 200 | 300 = 300;

  public inputType: 'numeric' | 'slider' = 'numeric';

  public componentColors: ComponentColors = {
    pavement: '#7f8f9f',
    slab: '#8f9faf',
    beam: '#9fafbf',
    mid: '#afbfcf',
    cross: '#bfcfdf',
    crossbeam: '#cfdfef',
    endbeam: '#dfefff'
  };

  public sideMenuVisibility: SideMenuVisibility = {
    others: true,
    display: true,
    pavement: true,
    slab: true,
    beam: true,
    mid: true,
    cross: true,
    crossbeam: true,
    endbeam: true
  };

  public customInputMenus: CustomInputMenu[] = [];

  public sideMenuOrder: string[] = [
    'others', 'display', 'pavement', 'slab', 'beam', 
    'mid', 'cross', 'crossbeam', 'endbeam'
  ];

  public showAttributeInfo: boolean = true;

  constructor() {
    this.loadSettings();
  }

  public getLOD200Parameters(): any {
    return {
      others: [
        'Name_P', 'Name_R', 'Class_R', 'L', 'L_01', 'L_02', 'amount_H'
      ],
      pavement: [],
      slab: [],
      beam: ['amount_V'], // 主桁本数 moved from others
      mid: [],
      cross: [],
      crossbeam: [],
      endbeam: []
    };
  }

  public isParameterVisible(category: string, paramKey: string): boolean {
    if (this.lodMode === 300) {
      return true; // Show all parameters in LOD300
    }
    
    const lod200Params = this.getLOD200Parameters();
    return lod200Params[category]?.includes(paramKey) || false;
  }

  public getDefaultValue(category: string, paramKey: string, currentValue: any): any {
    if (typeof currentValue === 'string') {
      return '-'; // Text fields get "-" when hidden
    }
    return currentValue; // Numeric fields keep their current value as default
  }

  public hexToThreeColor(hex: string): number {
    return parseInt(hex.replace('#', '0x'));
  }

  public getComponentColor(component: keyof ComponentColors): number {
    return this.hexToThreeColor(this.componentColors[component]);
  }

  public saveSettings(): void {
    const settings = {
      lodMode: this.lodMode,
      inputType: this.inputType,
      componentColors: this.componentColors,
      sideMenuVisibility: this.sideMenuVisibility,
      customInputMenus: this.customInputMenus,
      sideMenuOrder: this.sideMenuOrder,
      showAttributeInfo: this.showAttributeInfo
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
  }

  public loadSettings(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const settings = JSON.parse(stored);
        this.lodMode = settings.lodMode || 300;
        this.inputType = settings.inputType || 'numeric';
        this.componentColors = { ...this.componentColors, ...settings.componentColors };
        this.sideMenuVisibility = { ...this.sideMenuVisibility, ...settings.sideMenuVisibility };
        this.customInputMenus = settings.customInputMenus || [];
        this.sideMenuOrder = settings.sideMenuOrder || this.sideMenuOrder;
        this.showAttributeInfo = settings.showAttributeInfo !== undefined ? settings.showAttributeInfo : true;
      } catch (e) {
        console.warn('Failed to load settings from localStorage:', e);
      }
    }
  }

  public addCustomInputMenu(menu: CustomInputMenu): void {
    this.customInputMenus.push(menu);
    this.saveSettings();
  }

  public removeCustomInputMenu(menuId: string): void {
    this.customInputMenus = this.customInputMenus.filter(m => m.id !== menuId);
    this.saveSettings();
  }

  public getAvailableParameters(): CustomParameter[] {
    return [
      { category: 'others', key: 'Name_P', label: '業務名', type: 'text' },
      { category: 'others', key: 'Name_R', label: '路線名', type: 'text' },
      { category: 'others', key: 'Class_R', label: '道路種別', type: 'text' },
      { category: 'others', key: 'L', label: '橋長', type: 'number' },
      { category: 'others', key: 'L_01', label: '桁長', type: 'number' },
      { category: 'others', key: 'L_02', label: '支間長', type: 'number' },
      { category: 'others', key: 'amount_H', label: '横桁・対傾構の列数', type: 'number' },
      
      { category: 'pavement', key: 'T1', label: '舗装厚', type: 'number' },
      { category: 'pavement', key: 'T2', label: '上層路盤厚', type: 'number' },
      { category: 'pavement', key: 'T3', label: '下層路盤厚', type: 'number' },
      
      { category: 'beam', key: 'amount_V', label: '主桁本数', type: 'number' },
      { category: 'beam', key: 'W', label: '主桁幅', type: 'number' },
      { category: 'beam', key: 'D', label: '主桁高', type: 'number' },
      
    ];
  }
}
