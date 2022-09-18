import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-slab',
  templateUrl: './side-right-slab.component.html',
  styleUrls: ['./side-right-slab.component.scss']
})
export class SideRightSlabComponent{

  constructor(public dialogRef: MatDialogRef<SideRightSlabComponent>,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

}
