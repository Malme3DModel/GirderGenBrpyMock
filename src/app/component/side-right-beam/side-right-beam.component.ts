import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-beam',
  templateUrl: './side-right-beam.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightBeamComponent {

  constructor(public dialogRef: MatDialogRef<SideRightBeamComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

}
