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
  material: boolean;
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

  public lodMode: 200 | 300 = 200;


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
    material: true,
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
    'others', 'material', 'pavement', 'slab', 'beam', 
    'mid', 'cross', 'crossbeam', 'endbeam'
  ];

  public attributeDisplay: boolean = true;

  constructor() {
    this.loadSettings();
  }

  public getLOD200Parameters(): any {
    return {
      others: [
        'Name_P', 'Name_R', 'Class_R', 'L', 'L_02', 'amount_H'
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

  public modelOpacity: number = 1.0;
  public backgroundColor: string = '#ffffff';
  public sideMenuMinimized: boolean = false;
  public unitSystem: 'default' | 'metric' = 'default';

  public saveSettings(): void {
    const settings = {
      lodMode: this.lodMode,
      componentColors: this.componentColors,
      sideMenuVisibility: this.sideMenuVisibility,
      customInputMenus: this.customInputMenus,
      sideMenuOrder: this.sideMenuOrder,
      attributeDisplay: this.attributeDisplay,
      modelOpacity: this.modelOpacity,
      backgroundColor: this.backgroundColor,
      sideMenuMinimized: this.sideMenuMinimized,
      unitSystem: this.unitSystem
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
  }

  public loadSettings(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const settings = JSON.parse(stored);
        this.lodMode = settings.lodMode || 200;
        this.componentColors = { ...this.componentColors, ...settings.componentColors };
        this.sideMenuVisibility = { 
          ...this.sideMenuVisibility, 
          ...settings.sideMenuVisibility,
          material: settings.sideMenuVisibility?.material !== undefined ? settings.sideMenuVisibility.material : true
        };
        this.customInputMenus = settings.customInputMenus || [];
        this.sideMenuOrder = settings.sideMenuOrder || this.sideMenuOrder;
        this.attributeDisplay = settings.attributeDisplay !== undefined ? settings.attributeDisplay : true;
        this.modelOpacity = settings.modelOpacity !== undefined ? settings.modelOpacity : 1.0;
        this.backgroundColor = settings.backgroundColor || '#ffffff';
        this.sideMenuMinimized = settings.sideMenuMinimized !== undefined ? settings.sideMenuMinimized : false;
        this.unitSystem = settings.unitSystem || 'default';
      } catch (e) {
        console.warn('Failed to load settings from localStorage:', e);
        this.initializeDefaults();
      }
    } else {
      this.initializeDefaults();
    }
  }

  private initializeDefaults(): void {
    this.lodMode = 200;
    this.sideMenuVisibility = {
      others: true,
      material: true,
      pavement: true,
      slab: true,
      beam: true,
      mid: true,
      cross: true,
      crossbeam: true,
      endbeam: true
    };
    this.customInputMenus = [];
    this.sideMenuOrder = [
      'others', 'material', 'pavement', 'slab', 'beam', 
      'mid', 'cross', 'crossbeam', 'endbeam'
    ];
    this.attributeDisplay = true;
    this.modelOpacity = 1.0;
    this.backgroundColor = '#ffffff';
    this.sideMenuMinimized = false;
    this.unitSystem = 'default';
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
      { category: 'others', key: 'BPx', label: 'BPx', type: 'number' },
      { category: 'others', key: 'BPy', label: 'BPy', type: 'number' },
      { category: 'others', key: 'BPz', label: 'BPz', type: 'number' },
      { category: 'others', key: 'EPx', label: 'EPx', type: 'number' },
      { category: 'others', key: 'EPy', label: 'EPy', type: 'number' },
      { category: 'others', key: 'EPz', label: 'EPz', type: 'number' },
      { category: 'others', key: 'amount_H', label: '横桁・対傾構の列数', type: 'number' },
      
      { category: 'beam', key: 'amount_V', label: '主桁本数', type: 'number' },
      { category: 'beam', key: 'D', label: 'フランジ幅', type: 'number' },
      { category: 'beam', key: 'tf', label: 'フランジ厚', type: 'number' },
      { category: 'beam', key: 'W', label: 'ウェブ幅', type: 'number' },
      { category: 'beam', key: 'tw', label: 'ウェブ厚', type: 'number' },
      
      { category: 'slab', key: 'b1', label: '左幅員', type: 'number' },
      { category: 'slab', key: 'b2', label: '右幅員', type: 'number' },
      { category: 'slab', key: 'b3', label: '地覆幅', type: 'number' },
      { category: 'slab', key: 'SH', label: '壁高', type: 'number' },
      { category: 'slab', key: 'i1', label: '床版上面勾配（左）', type: 'number' },
      { category: 'slab', key: 'i2', label: '床版上面勾配（右）', type: 'number' },
      { category: 'slab', key: 'j1', label: '床版底面勾配（左）', type: 'number' },
      { category: 'slab', key: 'j2', label: '床版底面勾配（右）', type: 'number' },
      { category: 'slab', key: 'T1', label: '床版厚', type: 'number' },
      { category: 'slab', key: 'T2', label: 'ハンチ高', type: 'number' },
      { category: 'slab', key: 'n', label: 'ハンチ勾配', type: 'number' },
      { category: 'slab', key: 'Ss', label: '床版端部から主桁までの離隔', type: 'number' },
      
      { category: 'pavement', key: 'i1', label: '舗装勾配（左）', type: 'number' },
      { category: 'pavement', key: 'i2', label: '舗装勾配（右）', type: 'number' },
      { category: 'pavement', key: 'T3', label: '表層厚', type: 'number' },
      { category: 'pavement', key: 'T2', label: '上層路盤厚', type: 'number' },
      { category: 'pavement', key: 'T1', label: '下層路盤厚', type: 'number' },
      
      { category: 'mid', key: 'A', label: 'L鋼底面幅', type: 'number' },
      { category: 'mid', key: 'B', label: 'L鋼側面幅', type: 'number' },
      { category: 'mid', key: 't', label: 'L鋼厚', type: 'number' },
      { category: 'mid', key: 's', label: '水平部離隔', type: 'number' },
      { category: 'mid', key: 's_out', label: '斜部離隔（外側）', type: 'number' },
      { category: 'mid', key: 's_in', label: '斜部離隔（内側）', type: 'number' },
      { category: 'mid', key: 'dz', label: '中間対傾構配置高', type: 'number' },
      { category: 'mid', key: 'H', label: '中間対傾構全体高', type: 'number' },
      { category: 'mid', key: 'GA1', label: 'ガセット全体高（斜材）', type: 'number' },
      { category: 'mid', key: 'GD1', label: 'ガセット短辺高（斜材）', type: 'number' },
      { category: 'mid', key: 'GB1', label: 'ガセット天端幅（斜材）', type: 'number' },
      { category: 'mid', key: 'GC1', label: 'ガセット底面幅（斜材）', type: 'number' },
      { category: 'mid', key: 'Gt1', label: 'ガセット厚さ（斜材）', type: 'number' },
      { category: 'mid', key: 'GA2', label: 'ガセット長辺高（上弦材）', type: 'number' },
      { category: 'mid', key: 'GD2', label: 'ガセット短辺高（上弦材）', type: 'number' },
      { category: 'mid', key: 'GB2', label: 'ガセット天端幅（上弦材）', type: 'number' },
      { category: 'mid', key: 'GC2', label: 'ガセット底面幅（上弦材）', type: 'number' },
      { category: 'mid', key: 'Gt2', label: 'ガセット厚さ（上弦材）', type: 'number' },
      { category: 'mid', key: 'Gdx2', label: '主桁からの離隔（上弦材）', type: 'number' },
      { category: 'mid', key: 'GA3', label: 'ガセット長辺高（下弦材）', type: 'number' },
      { category: 'mid', key: 'GD3', label: 'ガセット短辺高（下弦材）', type: 'number' },
      { category: 'mid', key: 'GC3', label: 'ガセット天端幅（下弦材）', type: 'number' },
      { category: 'mid', key: 'GB3', label: 'ガセット底面幅（下弦材）', type: 'number' },
      { category: 'mid', key: 'Gt3', label: 'ガセット厚さ（下弦材）', type: 'number' },
      { category: 'mid', key: 'Gdx3', label: '主桁からの離隔（下弦材）', type: 'number' },
      
      { category: 'cross', key: 'D3', label: 'フランジ幅', type: 'number' },
      { category: 'cross', key: 'tf2', label: 'フランジ厚', type: 'number' },
      { category: 'cross', key: 'W2', label: 'ウェブ幅', type: 'number' },
      { category: 'cross', key: 'tw2', label: 'ウェブ厚', type: 'number' },
      { category: 'cross', key: 's_edge', label: '離隔（外側）', type: 'number' },
      { category: 'cross', key: 's_middle', label: '離隔（内側）', type: 'number' },
      { category: 'cross', key: 'GA4', label: 'ガセット全体高', type: 'number' },
      { category: 'cross', key: 'GD4', label: 'ガセット短辺高', type: 'number' },
      { category: 'cross', key: 'GB4', label: 'ガセット天端幅', type: 'number' },
      { category: 'cross', key: 'GC4', label: 'ガセット底面幅', type: 'number' },
      { category: 'cross', key: 'Gt4', label: 'ガセット厚さ', type: 'number' },
      
      { category: 'crossbeam', key: 'D4', label: 'フランジ幅', type: 'number' },
      { category: 'crossbeam', key: 'tf3', label: 'フランジ厚', type: 'number' },
      { category: 'crossbeam', key: 'W3', label: 'ウェブ幅', type: 'number' },
      { category: 'crossbeam', key: 'tw3', label: 'ウェブ厚', type: 'number' },
      { category: 'crossbeam', key: 's_edge2', label: '離隔（外側）', type: 'number' },
      { category: 'crossbeam', key: 's_middle2', label: '離隔（内側）', type: 'number' },
      { category: 'crossbeam', key: 'location2', label: '配置列数', type: 'number' },
      
      { category: 'endbeam', key: 'D5', label: 'フランジ幅', type: 'number' },
      { category: 'endbeam', key: 'tf4', label: 'フランジ厚', type: 'number' },
      { category: 'endbeam', key: 'W5', label: 'ウェブ幅', type: 'number' },
      { category: 'endbeam', key: 'tw4', label: 'ウェブ厚', type: 'number' },
      { category: 'endbeam', key: 's_edge3', label: '離隔（外側）', type: 'number' },
      { category: 'endbeam', key: 's_middle3', label: '離隔（内側）', type: 'number' },
    ];
  }
}
