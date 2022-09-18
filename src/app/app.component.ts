import {  ChangeDetectorRef, Component } from '@angular/core';
import { GirderPalamService } from './service/girder-palam.service';
import { pvGirderService } from './three/pvGirder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor(
    public changeDetectorRef: ChangeDetectorRef){ }

}
