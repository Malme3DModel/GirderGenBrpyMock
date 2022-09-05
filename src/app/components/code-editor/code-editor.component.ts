import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IfcService } from 'src/app/services/ifc.service';
import { CodeServiceService } from '../code-service.service';
  
@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {
  ifc: IfcService;
  
  constructor(    
    service: IfcService,
    public my_code: CodeServiceService,
    private http: HttpClient, 
    ) { 
      this.ifc = service;
    }

  public obj!: string;

  ngOnInit(){
    this.obj = JSON.stringify(this.my_code.value, null , "\t");
  }

  onCreateIfc() {
    this.my_code.busy = true;
    const url: string = 'https://kv4hx2ue8c.execute-api.ap-northeast-1.amazonaws.com/default/GirderGenBrpy';
    const inputJson: string = JSON.stringify(this.my_code.value);
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

        if(!('body' in response)){
          if('errorMessage' in response){
            alert(response.errorMessage);
          } else {
            alert('unknown error');
          }
          this.my_code.busy = false;
          return;
        }

        const text: string = response.body;
        // string -> file に変換して読み込ませる
        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const file = new File([blob], "file1.ifc", { type: "text/plain;charset=utf-8" })

        // ifcViewer に読み込ませる
        this.ifc.loadIfc(file);
        this.my_code.busy = false;

        },
        (error) => {
          alert(error.message);
          this.my_code.busy = false;
      });
        },
      (error) => {
        alert(error.message);
        this.my_code.busy = false;
      });

  }

}
