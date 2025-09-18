import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SettingsMenuComponent {

  constructor(public dialogRef: MatDialogRef<SettingsMenuComponent>) { }

}
