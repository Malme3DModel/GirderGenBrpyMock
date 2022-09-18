import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-crossbeam',
  templateUrl: './side-right-crossbeam.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightCrossbeamComponent {

  constructor(public dialogRef: MatDialogRef<SideRightCrossbeamComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

}
