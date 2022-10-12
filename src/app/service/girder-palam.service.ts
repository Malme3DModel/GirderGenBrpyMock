import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GirderPalamService {

  constructor() { }

  public coordinate: any = {
    'BPx': 0.0,
    'BPy': 0.0,
    'BPz': 0.0,
    'EPx': 0.0,
    'EPy': 30.0,
    'EPz': 0.0
  };

  public slab: any = {
    'b1': 4.25,
    'b2': 4.25,
    'b3': 0.6,
    'i1': 0.02,
    'i2': 0.02,
    'SH': 0.55,
    'T1': 0.2,
    'T2': 0.1,
    'n': 3.0,
    'Ss': 1.025
  };

  public beam: any = {
    'amount_V': 4.0,
    'W': 1.70,
    'D': 0.31,
    'tw': 0.028,
    'tf': 0.024,
  };

  public mid: any = {
    'A': 0.075,
    'B': 0.075,
    'H': 1.24,
    't': 0.009,
    's': 0.0745,
    's_in': 0.16,
    's_out': 0.16,
    'dz': 0.30,
  };

  public cross: any = { 
    'W2': 0.12,
    'D3': 0.18,
    'tf2': 0.012,
    'tw2': 0.012,
    's_edge': 0.2, 
    's_middle': 0.2,
  };

  public crossbeam: any = {
    'W3': 1.28,
    'D4': 0.25,
    'tf3': 0.012,
    'tw3': 0.012,
    'location2':[3], 
    's_edge2': 0.0, 
    's_middle2': 0.0
  };

  public endbeam: any = {
    'D5': 0.25,
    'tf4': 0.012,
    'tw4': 0.012,
    's_edge3': 0.0,
    's_middle3': 0.0
  };

  public gusset01: any = {
    'A': 0.31,
    'B': 0.49,
    'C': 0.49,
    'D': 0.15,
    't': 0.009
  };

  public gusset02: any = {
    'A': 0.23,
    'B': 0.25,
    'C': 0.12,
    'D': 0.15,
    't': 0.009,
    'dx':0.1
  };

  public gusset03: any = {
    'A': 0.34,
    'B': 0.29,
    'C': 0.1,
    'D': 0.34,
    't': 0.009,
    'dx':0.1
  };

  public others: any = {
    's_BP': 0.4,
    's_EP': 0.4,
    'L': 30.0,
    'amount_H': 6.0
  };

  public palam(): any {
    return {
    'coordinate': this.coordinate,
    'slab': this.slab,
    'beam': this.beam,
    'mid': this.mid,
    'cross': this.cross,
    'crossbeam': this.crossbeam,
    'endbeam': this.endbeam,
    'gusset01': this.gusset01,
    'gusset02': this.gusset02,
    'gusset03': this.gusset03,
    'others': this.others
    };
  }

  
  public ProjectName = 'プロジェクト名'
  public Name1 = '橋梁'     // 階層1のオブジェクト分類名
  public Name2 = '上部構造' // 階層2のオブジェクト分類名
  public Name3 = '主桁'     // 階層3のオブジェクト分類名

}
