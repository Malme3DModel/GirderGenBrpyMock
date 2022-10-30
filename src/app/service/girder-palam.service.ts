import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GirderPalamService {

  constructor() { }

  public pavement: any = {
    'i1': 2.0,
    'i2': 2.0,
    'T2': 0.2,
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
    'T3': 0.15,
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
  }

}
