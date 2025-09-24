import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GirderPalamService {

  constructor() { }

  public pavement: any = {
    'i1': 2.0,
    'i2': 2.0,
    'T': 0.2,
  };

  public display: any = {
    'pavement': true,
    'slab': true,
    'beam': true,
    'mid': true,
    'gusset01': true,
    'gusset02': true,
    'gusset03': true,
    'cross': true,
    'cross_u': false,
    'cross_l': true,
    'gusset04': true,
    'crossbeam': true,
    'endbeam': true,
  };

  public slab: any = {
    'b1': 4.25,
    'b2': 4.25,
    'b3': 0.6,
    'i1': 2.0,
    'i2': 2.0,
    'j1': 2.0,
    'j2': 2.0,
    'SH': 0.55,
    'T1': 0.2,
    'T2': 0.1,
    'n': 3.0,
    'Ss': 1.025
  };

  public beam: any = {
    'amount_V': 4.0,
    'W': 1700,
    'D': 310,
    'tw': 28,
    'tf': 24,
  };

  public mid: any = {
    'A': 75,
    'B': 75,
    'H': 1240,
    't': 9,
    's': 0.0,
    's_in': 160,
    's_out': 160,
    'dz': 300,
    'GA1': 310,
    'GB1': 490,
    'GC1': 490,
    'GD1': 150,
    'Gt1': 9,
    'GA2': 230,
    'GB2': 250,
    'GC2': 120,
    'GD2': 150,
    'Gt2': 9,
    'Gdx2': 0.0,
    'GA3': 340,
    'GB3': 290,
    'GC3': 100,
    'GD3': 340,
    'Gt3': 9,
    'Gdx3': 0.0
  };

  public cross: any = {
    'W2': 120,
    'D3': 180,
    'tf2': 12,
    'tw2': 12,
    's_edge': 200,
    's_middle': 200,
    'GA4': 310,
    'GB4': 490,
    'GC4': 490,
    'GD4': 150,
    'Gt4': 9,
  };

  public crossbeam: any = {
    'W3': 1280,
    'D4': 250,
    'tf3': 12,
    'tw3': 12,
    's_edge2': 0.0,
    's_middle2': 0.0,
    'location2' : 1.0
  };

  public endbeam: any = {
    'D5': 250,
    'tf4': 12,
    'W5': 1280,
    'tw4': 12,
    's_edge3': 0.0,
    's_middle3': 0.0
  };


  public others: any = {
    'Name_P':'〇〇橋梁予備設計',
    'Name_R':'国道〇〇号〇〇橋',
    'Class_R':'第3種-第1級',
    'L': 30.0,
    'L_01': 29.8,
    'L_02': 29.0,
    'Milepost_B':23.20,
    'Milepost_E':23.23,
    'BP':'NO.1+10.0',
    'BPx': 0.0,
    'BPy': 0.0,
    'BPz': 0.0,
    'EP':'NO.3+0.0',
    'EPx': 0.0,
    'EPy': 30.0,
    'EPz': 0.0,
    'amount_H': 6.0
  };

  public generalSettings: any = {
    lodMode: 'LOD300', // 'LOD200' or 'LOD300'
    showAttributeInfo: false
  };

  public menuSettings: any = {
    visibleMenus: {
      pavement: true,    // 舗装
      slab: true,        // 床版
      beam: true,        // 主桁
      mid: true,         // 中間対傾構
      cross: true,       // 横構
      crossbeam: true,   // 荷重分配横桁
      endbeam: true      // 端横桁
    },
    menuOrder: [
      'pavement',    // 舗装
      'slab',        // 床版
      'beam',        // 主桁
      'mid',         // 中間対傾構
      'cross',       // 横構
      'crossbeam',   // 荷重分配横桁
      'endbeam'      // 端横桁
    ]
  };

  public componentAppearance: any = {
    slab: { color: '#7f8f9f', opacity: 0.85, name: '床版' },
    pavement: { color: '#404040', opacity: 0.85, name: '舗装' },
    mainGirder: { color: '#8B4513', opacity: 0.85, name: '主桁' },
    crossBeam: { color: '#CD853F', opacity: 0.85, name: '横桁' },
    endBeam: { color: '#D2691E', opacity: 0.85, name: '端横桁' },
    crossFrame: { color: '#A0522D', opacity: 0.85, name: '横構' },
    bracing: { color: '#8FBC8F', opacity: 0.85, name: '対傾構' },
    gussetPlate: { color: '#708090', opacity: 0.85, name: 'ガセットプレート' }
  };

  public customMenus: any = {
    menus: [],
    nextId: 1
  };

  public materialStrength: any = {
    steel: {
      mainGirder: {
        selectedType: 'SM490Y',
        fy: 355,
        fu: 490,
        density: 78.5,
        types: [
          { name: 'SM400A/B', fy: 235, fu: 400 },
          { name: 'SM490A/B', fy: 325, fu: 490 },
          { name: 'SM490Y', fy: 355, fu: 490 },
          { name: 'SM570', fy: 450, fu: 570 }
        ]
      },
      crossBeam: {
        selectedType: 'SM490Y',
        fy: 355,
        fu: 490,
        density: 78.5,
        types: [
          { name: 'SM400A/B', fy: 235, fu: 400 },
          { name: 'SM490A/B', fy: 325, fu: 490 },
          { name: 'SM490Y', fy: 355, fu: 490 },
          { name: 'SM570', fy: 450, fu: 570 }
        ]
      }
    },
    rebar: {
      selectedType: 'SD345',
      selectedDiameter: 'D16',
      spacing: 200,
      fy: 345,
      fu: 490,
      area: 199,
      types: [
        { name: 'SD295A', fy: 295, fu: 440 },
        { name: 'SD295B', fy: 295, fu: 440 },
        { name: 'SD345', fy: 345, fu: 490 },
        { name: 'SD390', fy: 390, fu: 560 },
        { name: 'SD490', fy: 490, fu: 620 }
      ],
      diameters: [
        { name: 'D10', diameter: 9.53, area: 71 },
        { name: 'D13', diameter: 12.7, area: 127 },
        { name: 'D16', diameter: 15.9, area: 199 },
        { name: 'D19', diameter: 19.1, area: 284 },
        { name: 'D22', diameter: 22.2, area: 387 },
        { name: 'D25', diameter: 25.4, area: 507 },
        { name: 'D29', diameter: 28.6, area: 642 },
        { name: 'D32', diameter: 31.8, area: 794 },
        { name: 'D35', diameter: 35.0, area: 962 },
        { name: 'D38', diameter: 38.2, area: 1145 },
        { name: 'D41', diameter: 41.3, area: 1333 }
      ]
    },
    concrete: {
      selectedFc: 30,
      fc: 30,
      ec: 27000,
      density: 24.0,
      fcOptions: [
        { fc: 24, ec: 23000 },
        { fc: 30, ec: 27000 },
        { fc: 36, ec: 30000 },
        { fc: 40, ec: 33000 }
      ]
    }
  };

  public getAllAvailableInputItems(): any[] {
    const items: any[] = [];
    
    const othersItems = [
      { menuKey: 'others', name: 'Name_P', label: '業務名', unit: '', dataPath: 'others.Name_P', inputType: 'text' },
      { menuKey: 'others', name: 'Name_R', label: '路線名', unit: '', dataPath: 'others.Name_R', inputType: 'text' },
      { menuKey: 'others', name: 'Class_R', label: '道路種別', unit: '', dataPath: 'others.Class_R', inputType: 'text' },
      { menuKey: 'others', name: 'L', label: '橋長', unit: 'm', dataPath: 'others.L', inputType: 'numeric' },
      { menuKey: 'others', name: 'L_01', label: '桁長', unit: 'm', dataPath: 'others.L_01', inputType: 'numeric' },
      { menuKey: 'others', name: 'L_02', label: '支間長', unit: 'm', dataPath: 'others.L_02', inputType: 'numeric' },
      { menuKey: 'others', name: 'amount_H', label: '横桁・対傾構の列数', unit: '列', dataPath: 'others.amount_H', inputType: 'numeric' }
    ];
    
    const beamItems = [
      { menuKey: 'beam', name: 'amount_V', label: '主桁本数', unit: '本', dataPath: 'beam.amount_V', inputType: 'numeric' },
      { menuKey: 'beam', name: 'D', label: 'フランジ幅', unit: 'mm', dataPath: 'beam.D', inputType: 'numeric' },
      { menuKey: 'beam', name: 'tf', label: 'フランジ厚', unit: 'mm', dataPath: 'beam.tf', inputType: 'numeric' },
      { menuKey: 'beam', name: 'W', label: 'ウェブ幅', unit: 'mm', dataPath: 'beam.W', inputType: 'numeric' },
      { menuKey: 'beam', name: 'tw', label: 'ウェブ厚', unit: 'mm', dataPath: 'beam.tw', inputType: 'numeric' }
    ];
    
    const slabItems = [
      { menuKey: 'slab', name: 'b1', label: '左幅員', unit: 'm', dataPath: 'slab.b1', inputType: 'numeric' },
      { menuKey: 'slab', name: 'b2', label: '右幅員', unit: 'm', dataPath: 'slab.b2', inputType: 'numeric' },
      { menuKey: 'slab', name: 'b3', label: '地覆幅', unit: 'm', dataPath: 'slab.b3', inputType: 'numeric' },
      { menuKey: 'slab', name: 'SH', label: '壁高', unit: 'm', dataPath: 'slab.SH', inputType: 'numeric' },
      { menuKey: 'slab', name: 'T1', label: '床版厚', unit: 'm', dataPath: 'slab.T1', inputType: 'numeric' },
      { menuKey: 'slab', name: 'T2', label: 'ハンチ高', unit: 'm', dataPath: 'slab.T2', inputType: 'numeric' }
    ];
    
    const pavementItems = [
      { menuKey: 'pavement', name: 'i1', label: '舗装勾配（左）', unit: '%', dataPath: 'pavement.i1', inputType: 'numeric' },
      { menuKey: 'pavement', name: 'i2', label: '舗装勾配（右）', unit: '%', dataPath: 'pavement.i2', inputType: 'numeric' },
      { menuKey: 'pavement', name: 'T', label: '舗装厚', unit: 'm', dataPath: 'pavement.T', inputType: 'numeric' }
    ];

    const crossItems = [
      { menuKey: 'cross', name: 'D3', label: 'フランジ幅', unit: 'mm', dataPath: 'cross.D3', inputType: 'numeric' },
      { menuKey: 'cross', name: 'tf2', label: 'フランジ厚', unit: 'mm', dataPath: 'cross.tf2', inputType: 'numeric' },
      { menuKey: 'cross', name: 'W2', label: 'ウェブ幅', unit: 'mm', dataPath: 'cross.W2', inputType: 'numeric' },
      { menuKey: 'cross', name: 'tw2', label: 'ウェブ厚', unit: 'mm', dataPath: 'cross.tw2', inputType: 'numeric' },
      { menuKey: 'cross', name: 's_edge', label: '離隔（外側）', unit: 'mm', dataPath: 'cross.s_edge', inputType: 'numeric' },
      { menuKey: 'cross', name: 's_middle', label: '離隔（内側）', unit: 'mm', dataPath: 'cross.s_middle', inputType: 'numeric' }
    ];

    const midItems = [
      { menuKey: 'mid', name: 'A', label: 'L鋼底面幅', unit: 'mm', dataPath: 'mid.A', inputType: 'numeric' },
      { menuKey: 'mid', name: 'B', label: 'L鋼側面幅', unit: 'mm', dataPath: 'mid.B', inputType: 'numeric' },
      { menuKey: 'mid', name: 't', label: 'L鋼厚', unit: 'mm', dataPath: 'mid.t', inputType: 'numeric' },
      { menuKey: 'mid', name: 'H', label: '中間対傾構全体高', unit: 'mm', dataPath: 'mid.H', inputType: 'numeric' },
      { menuKey: 'mid', name: 'dz', label: '中間対傾構配置高', unit: 'mm', dataPath: 'mid.dz', inputType: 'numeric' }
    ];

    const crossbeamItems = [
      { menuKey: 'crossbeam', name: 'D4', label: 'フランジ幅', unit: 'mm', dataPath: 'crossbeam.D4', inputType: 'numeric' },
      { menuKey: 'crossbeam', name: 'tf3', label: 'フランジ厚', unit: 'mm', dataPath: 'crossbeam.tf3', inputType: 'numeric' },
      { menuKey: 'crossbeam', name: 'W3', label: 'ウェブ幅', unit: 'mm', dataPath: 'crossbeam.W3', inputType: 'numeric' },
      { menuKey: 'crossbeam', name: 'tw3', label: 'ウェブ厚', unit: 'mm', dataPath: 'crossbeam.tw3', inputType: 'numeric' }
    ];

    const endbeamItems = [
      { menuKey: 'endbeam', name: 'D5', label: 'フランジ幅', unit: 'mm', dataPath: 'endbeam.D5', inputType: 'numeric' },
      { menuKey: 'endbeam', name: 'tf4', label: 'フランジ厚', unit: 'mm', dataPath: 'endbeam.tf4', inputType: 'numeric' },
      { menuKey: 'endbeam', name: 'W5', label: 'ウェブ幅', unit: 'mm', dataPath: 'endbeam.W5', inputType: 'numeric' },
      { menuKey: 'endbeam', name: 'tw4', label: 'ウェブ厚', unit: 'mm', dataPath: 'endbeam.tw4', inputType: 'numeric' }
    ];
    
    items.push(...othersItems, ...beamItems, ...slabItems, ...pavementItems, ...crossItems, ...midItems, ...crossbeamItems, ...endbeamItems);
    
    return items;
  }

  public getCustomMenuById(id: number): any {
    return this.customMenus.menus.find((menu: any) => menu.id === id);
  }

  public addCustomMenu(menu: any): void {
    menu.id = this.customMenus.nextId++;
    this.customMenus.menus.push(menu);
  }

  public updateCustomMenu(id: number, updatedMenu: any): void {
    const index = this.customMenus.menus.findIndex((menu: any) => menu.id === id);
    if (index !== -1) {
      this.customMenus.menus[index] = { ...updatedMenu, id };
    }
  }

  public deleteCustomMenu(id: number): void {
    this.customMenus.menus = this.customMenus.menus.filter((menu: any) => menu.id !== id);
  }

  public palam(): any {
    return {
    'others': this.others,
    'display': this.display,
    'pavement': this.pavement,
    'slab': this.slab,
    'beam': this.beam,
    'mid': this.mid,
    'cross': this.cross,
    'crossbeam': this.crossbeam,
    'endbeam': this.endbeam,
    'materialStrength': this.materialStrength,
    'generalSettings': this.generalSettings,
    'menuSettings': this.menuSettings,
    'componentAppearance': this.componentAppearance,
    'customMenus': this.customMenus,
    };
  }

  public set_palam(value: any){
    if('others' in value)
      this.others = value['others'];
    if('display' in value)
      this.display = value['display'];
    if('pavement' in value)
      this.pavement = value['pavement'];
    if('slab' in value)
      this.slab = value['slab'];
    if('beam' in value)
      this.beam = value['beam'];
    if('mid' in value)
      this.mid = value['mid'];
    if('cross' in value)
      this.cross = value['cross'];
    if('crossbeam' in value)
      this.crossbeam = value['crossbeam'];
    if('endbeam' in value)
      this.endbeam = value['endbeam'];
    if('materialStrength' in value)
      this.materialStrength = value['materialStrength'];
    if('generalSettings' in value)
      this.generalSettings = value['generalSettings'];
    if('menuSettings' in value)
      this.menuSettings = value['menuSettings'];
    if('componentAppearance' in value)
      this.componentAppearance = value['componentAppearance'];
    if('customMenus' in value)
      this.customMenus = value['customMenus'];
  }

}
