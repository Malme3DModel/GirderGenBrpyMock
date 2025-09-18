import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-units',
  templateUrl: './settings-units.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SettingsUnitsComponent {

  constructor(public dialogRef: MatDialogRef<SettingsUnitsComponent>) { }

}
