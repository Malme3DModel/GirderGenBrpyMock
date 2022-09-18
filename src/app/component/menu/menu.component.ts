import { Component, OnInit } from '@angular/core';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public model: pvGirderService) { }

  ngOnInit(): void {
  }

  download(){
    this.model.download();
  }
}
