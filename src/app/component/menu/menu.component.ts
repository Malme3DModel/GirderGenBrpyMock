import { Component, OnInit } from '@angular/core';
import { ModelJsService } from 'src/app/three/geo/model-js.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public model: ModelJsService) { }

  ngOnInit(): void {
  }

  download(){
    this.model.download();
  }
}
