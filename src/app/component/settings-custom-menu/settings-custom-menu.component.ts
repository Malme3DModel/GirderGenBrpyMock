import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-custom-menu',
  templateUrl: './settings-custom-menu.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SettingsCustomMenuComponent {

  constructor(public dialogRef: MatDialogRef<SettingsCustomMenuComponent>) { }

}
