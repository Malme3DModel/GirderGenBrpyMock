import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-general',
  templateUrl: './settings-general.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SettingsGeneralComponent {

  constructor(public dialogRef: MatDialogRef<SettingsGeneralComponent>) { }

}
