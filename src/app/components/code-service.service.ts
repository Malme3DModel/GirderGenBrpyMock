import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeServiceService {

  constructor() { }

  public busy: boolean = false;

  public value = {
    "body": {
      "slab": {
        "b1": 4.25,
        "b2": 4.25,
        "b3": 0.6,
        "i1": 0.02,
        "i2": 0.02,
        "SH": 0.55,
        "T1": 0.2,
        "T2": 0.35,
        "n": 3,
        "Ss": 1
      },
      "beam": {
        "amount_V": 3,
        "W": 1.7,
        "D": 0.31,
        "tw": 0.028,
        "tf": 0.024
      },
      "mid": {
        "A": 0.15,
        "B": 0.15,
        "H": 1.38,
        "t": 0.009,
        "s": 0.1,
        "s_in": 0.16,
        "s_out": 0.16,
        "dz": 0.3
      },
      "cross": {
        "W2": 0.12,
        "D3": 0.18,
        "tf2": 0.012,
        "tw2": 0.012,
        "s_edge": 0.2,
        "s_middle": 0.2
      },
      "crossbeam": {
        "W3": 1.28,
        "D4": 0.25,
        "tf3": 0.012,
        "tw3": 0.012,
        "location2": [
          3
        ],
        "s_edge2": 0,
        "s_middle2": 0
      },
      "endbeam": {
        "D5": 0.25,
        "tf4": 0.012,
        "tw4": 0.012,
        "s_edge3": 0,
        "s_middle3": 0
      },
      "others": {
        "s_BP": 0.4,
        "s_EP": 0.4,
        "L": 33,
        "amount_H": 5.5
      }
    }
  };
}
