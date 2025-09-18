import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GirderPalamService } from '../../service/girder-palam.service';

@Component({
  selector: 'app-settings-general',
  templateUrl: './settings-general.component.html',
  styleUrls: ['./settings-general.component.scss']
})
export class SettingsGeneralComponent {

  constructor(
    public dialogRef: MatDialogRef<SettingsGeneralComponent>,
    public model: GirderPalamService
  ) { }

  onLodModeChange(mode: string): void {
    this.model.generalSettings.lodMode = mode;
  }

  onAttributeDisplayChange(show: boolean): void {
    this.model.generalSettings.showAttributeInfo = show;
  }

}
