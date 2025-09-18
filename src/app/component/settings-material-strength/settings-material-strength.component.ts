import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GirderPalamService } from '../../service/girder-palam.service';

@Component({
  selector: 'app-settings-material-strength',
  templateUrl: './settings-material-strength.component.html',
  styleUrls: ['../side-right/side-right.component.scss']
})
export class SettingsMaterialStrengthComponent {

  constructor(
    public dialogRef: MatDialogRef<SettingsMaterialStrengthComponent>,
    public model: GirderPalamService
  ) { }

  onSteelTypeChange(selectedType: string): void {
    const steelType = this.model.materialStrength.steel.types.find(
      (type: any) => type.name === selectedType
    );
    if (steelType) {
      this.model.materialStrength.steel.selectedType = selectedType;
      this.model.materialStrength.steel.fy = steelType.fy;
      this.model.materialStrength.steel.fu = steelType.fu;
    }
  }

  onRebarTypeChange(selectedType: string): void {
    const rebarType = this.model.materialStrength.rebar.types.find(
      (type: any) => type.name === selectedType
    );
    if (rebarType) {
      this.model.materialStrength.rebar.selectedType = selectedType;
      this.model.materialStrength.rebar.fy = rebarType.fy;
      this.model.materialStrength.rebar.fu = rebarType.fu;
    }
  }

  onRebarDiameterChange(selectedDiameter: string): void {
    const diameter = this.model.materialStrength.rebar.diameters.find(
      (d: any) => d.name === selectedDiameter
    );
    if (diameter) {
      this.model.materialStrength.rebar.selectedDiameter = selectedDiameter;
      this.model.materialStrength.rebar.area = diameter.area;
    }
  }

  onConcreteStrengthChange(selectedFc: number): void {
    const fcOption = this.model.materialStrength.concrete.fcOptions.find(
      (option: any) => option.fc === selectedFc
    );
    if (fcOption) {
      this.model.materialStrength.concrete.selectedFc = selectedFc;
      this.model.materialStrength.concrete.fc = selectedFc;
      this.model.materialStrength.concrete.ec = fcOption.ec;
    }
  }

  onSpacingChange(event: any): void {
    const spacing = parseFloat(event.target.value);
    if (!isNaN(spacing)) {
      this.model.materialStrength.rebar.spacing = spacing;
    }
  }

}
