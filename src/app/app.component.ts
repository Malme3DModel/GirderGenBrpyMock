import {  ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from './component/chat/chat.component';
import { GirderPalamService } from './service/girder-palam.service';
import { pvGirderService } from './three/pvGirder.service';
import { UISettingsIntegrationService } from './service/ui-settings-integration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private uiSettingsIntegration: UISettingsIntegrationService){ }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.uiSettingsIntegration.destroy();
  }

    public openChat(){
      this.dialog.open(ChatComponent, {
        width: '350px',
        position: { right: '10px', bottom: '10px' },
        hasBackdrop: false
      });
    }
}
