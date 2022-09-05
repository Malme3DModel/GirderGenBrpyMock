import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IfcService } from '../services/ifc.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  ifc: IfcService;
  clippingActive: boolean;
  private fileOpener: HTMLInputElement;

  constructor(private http: HttpClient, service: IfcService) {
    this.ifc = service;
    this.clippingActive = false;
    this.fileOpener = this.newFileOpener();
  }

  @Output('onOpenNavbar') onOpenNavbar = new EventEmitter();

  onCreateIfc() {
    const url: string = 'https://kv4hx2ue8c.execute-api.ap-northeast-1.amazonaws.com/default/GirderGenBrpy';
    const inputJson: string = JSON.stringify({
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
                "n": 2,
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
    
    })
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      })
    };

    // docker を起動する
    this.http.get(url, options )
    .subscribe((response) => {
      console.log(response);
      // docker が起動したらポストする
      this.http.post(url, inputJson, options )
      .subscribe((response: any) => {
        const text: string = response.body;

        // string -> file に変換して読み込ませる
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const file = new File([blob], "file1.ifc", { type: "application/octet-stream" })

        // ifcViewer に読み込ませる
        this.ifc.loadIfc(file);
        
        },
        (error) => {
          alert(error.message);
      });
        },
      (error) => {
        alert(error.message);
    });

  }


  onOpenIfc() {
    this.fileOpener.click();
  }

  onActivateClipping(){
    this.clippingActive = !this.clippingActive;
    this.ifc.ifcViewer?.toggleClippingPlanes();
  }

  private loadIfc = async (event: any) => {
    const file = event.target.files[0];
    if(!file) return;
    this.ifc.loadIfc(file);
  };

  private newFileOpener() {
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'file');
    inputElement.classList.add('hidden');
    inputElement.addEventListener('change', this.loadIfc, false);
    document.body.appendChild(inputElement);
    return inputElement;
  }
}
