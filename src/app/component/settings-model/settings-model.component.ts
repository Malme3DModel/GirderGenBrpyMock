import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-model',
  templateUrl: './settings-model.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SettingsModelComponent {

  constructor(public dialogRef: MatDialogRef<SettingsModelComponent>) { }

}
