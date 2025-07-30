import { Injectable } from '@angular/core';
import { UISettingsService } from './ui-settings.service';
import { SceneService } from '../three/scene.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UISettingsIntegrationService {
  private subscription: Subscription;

  constructor(
    private uiSettingsService: UISettingsService,
    private sceneService: SceneService
  ) {
    this.subscription = this.uiSettingsService.settings$.subscribe(settings => {
      this.applySettingsToScene(settings);
    });
  }

  private applySettingsToScene(settings: any): void {
    if (this.sceneService.scene) {
      this.sceneService.updateBackgroundColor();
      this.sceneService.updateLighting();
    }
  }

  public destroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
