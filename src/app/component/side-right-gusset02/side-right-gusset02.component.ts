import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GirderPalamService } from 'src/app/service/girder-palam.service';
import { pvGirderService } from 'src/app/three/pvGirder.service';

@Component({
  selector: 'app-side-right-gusset02',
  templateUrl: './side-right-gusset02.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SideRightGusset02Component {

  constructor(public dialogRef: MatDialogRef<SideRightGusset02Component>,
    public model: GirderPalamService,
    private girder: pvGirderService) { }

    public redraw(): void {
      this.girder.createGirder(this.model.palam());
    }

}
