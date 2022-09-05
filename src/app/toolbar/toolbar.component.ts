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
    // sconst url: string = 'https://api.twitter.com/1.1/search/tweets.json';
    const inputJson: string = JSON.stringify({
    })
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      })
    };

    this.http.post(url, {}, options )
    .subscribe((response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
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
