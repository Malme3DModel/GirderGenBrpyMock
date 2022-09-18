import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayH1Service {

  constructor() { }

  public Array(L: number, D: number, W: number, tf: number, tw: number, s_BP: number, s_EP: number, amount: number, interval: number){
    const pointlist: number[][] = [];
    let x = -(amount - 1.0) * interval / 2.0;
    const y = -(s_BP + s_EP) / 2.0;
    const z = (W/2.0 + tf);
    for(let i=0; i<amount; i++){
        const point = [x, y, z];
        pointlist.push(point);
        x += interval;
    }

    Models = []
    for i in range(int(amount)):
        Model = Hsteel.CreateBeam(Hsteel, L=L, D=D, W=W, tf=tf, tw=tw, position=pointlist[i])
        Models.append(Model)

    Obj = Models[0]
    for i in range(len(Models)-1):
        Obj += Models[i+1]
    return Obj
  }

}
