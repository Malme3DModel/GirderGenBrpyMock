import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GirderPalamService {

  constructor() { }

  public slab = {
    'b1': 4.25,
    'b2': 4.25,
    'b3': 0.6,
    'i1': 0.02,
    'i2': 0.02,
    'SH': 0.55,
    'T1': 0.2,
    'T2': 0.35,
    'n': 3.0,
    'Ss': 1.0
  };

  public beam = {
    'amount_V': 3.0,
    'W': 1.70,
    'D': 0.31,
    'tw': 0.028,
    'tf': 0.024,
  };

  public mid = {
    'A': 0.15,
    'B': 0.15,
    'H': 1.38,
    't': 0.009,
    's': 0.1,
    's_in': 0.16,
    's_out': 0.16,
    'dz': 0.30,
  };

  public cross = { 
    'W2': 0.12,
    'D3': 0.18,
    'tf2': 0.012,
    'tw2': 0.012,
    's_edge': 0.2, 
    's_middle': 0.2,
  };

  public crossbeam = {
    'W3': 1.28,
    'D4': 0.25,
    'tf3': 0.012,
    'tw3': 0.012,
    'location2':[3], 
    's_edge2': 0.0, 
    's_middle2': 0.0
  };

  public endbeam = {
    'D5': 0.25,
    'tf4': 0.012,
    'tw4': 0.012,
    's_edge3': 0.0,
    's_middle3': 0.0
  };

  public others = {
    's_BP': 0.4, 
    's_EP': 0.4, 
    'L': 33.0,
    'amount_H': 6.0
  };

  public palam(): any {
    return {
    'slab': this.slab,
    'beam': this.beam,
    'mid': this.mid,
    'cross': this.cross,
    'crossbeam': this.crossbeam,
    'endbeam': this.endbeam,
    'others': this.others
    };
  }

  
  public ProjectName = 'プロジェクト名'
  public Name1 = '橋梁'     // 階層1のオブジェクト分類名
  public Name2 = '上部構造' // 階層2のオブジェクト分類名
  public Name3 = '主桁'     // 階層3のオブジェクト分類名

}
