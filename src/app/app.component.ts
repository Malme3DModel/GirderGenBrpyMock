import {  ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from './component/chat/chat.component';
import { GirderPalamService } from './service/girder-palam.service';
import { pvGirderService } from './three/pvGirder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog){ }

    public openChat(){
      this.dialog.open(ChatComponent, {
        width: '350px',
        position: { right: '10px', bottom: '10px' },
        hasBackdrop: false
      });
    }
}
