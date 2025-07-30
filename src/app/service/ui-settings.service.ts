import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UISettings {
  appearance: {
    primaryColor: string
    backgroundColor: string
    sidebarColor: string
    textColor: string
    accentColor: string
    fontSize: number
    fontFamily: string
    iconDisplay: boolean
    iconSize: 'small' | 'medium' | 'large'
  }
  layout: {
    sidebarWidth: number
    parameterPanelWidth: number
    settingsPanelWidth: number
    showToolbar: boolean
    showStatusBar: boolean
    showLabels: boolean
    showDimensions: boolean
    compactMode: boolean
  }
  menu: {
    position: 'left' | 'right' | 'top' | 'bottom'
    orientation: 'vertical' | 'horizontal'
    visibleItems: Record<string, boolean>
    itemOrder: string[]
    grouping: boolean
    collapsible: boolean
    autoHide: boolean
  }
  viewport3d: {
    modelColor: string
    supportColor: string
    crossBeamColor: string
    environment: string
    lighting: string
    shadows: boolean
    wireframe: boolean
    gridSize: number
    gridColor: string
    gridOpacity: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class UISettingsService {
  private readonly STORAGE_KEY = 'girder-ui-settings';
  private settingsSubject = new BehaviorSubject<UISettings>(this.getDefaultSettings());
  public settings$ = this.settingsSubject.asObservable();

  constructor() {
    this.loadSettings();
    this.applySettings(this.settingsSubject.value);
  }

  private getDefaultSettings(): UISettings {
    return {
      appearance: {
        primaryColor: '#3f51b5',
        backgroundColor: '#ffffff',
        sidebarColor: '#f5f5f5',
        textColor: '#333333',
        accentColor: '#ff4081',
        fontSize: 14,
        fontFamily: 'Roboto, sans-serif',
        iconDisplay: true,
        iconSize: 'medium'
      },
      layout: {
        sidebarWidth: 15,
        parameterPanelWidth: 400,
        settingsPanelWidth: 400,
        showToolbar: true,
        showStatusBar: true,
        showLabels: true,
        showDimensions: true,
        compactMode: false
      },
      menu: {
        position: 'top',
        orientation: 'horizontal',
        visibleItems: {
          'file': true,
          'download': true,
          'help': true,
          'calculate': true
        },
        itemOrder: ['file', 'download', 'help', 'calculate'],
        grouping: false,
        collapsible: false,
        autoHide: false
      },
      viewport3d: {
        modelColor: '#7f8f9f',
        supportColor: '#ff6b6b',
        crossBeamColor: '#4ecdc4',
        environment: 'studio',
        lighting: 'default',
        shadows: true,
        wireframe: false,
        gridSize: 10,
        gridColor: '#cccccc',
        gridOpacity: 0.5
      }
    };
  }

  public getSettings(): UISettings {
    return this.settingsSubject.value;
  }

  public updateSettings(settings: Partial<UISettings>): void {
    const currentSettings = this.settingsSubject.value;
    const newSettings = this.mergeSettings(currentSettings, settings);
    this.settingsSubject.next(newSettings);
    this.saveSettings(newSettings);
    this.applySettings(newSettings);
  }

  public resetSettings(): void {
    const defaultSettings = this.getDefaultSettings();
    this.settingsSubject.next(defaultSettings);
    this.saveSettings(defaultSettings);
    this.applySettings(defaultSettings);
  }

  public resetCategory(category: keyof UISettings): void {
    const currentSettings = this.settingsSubject.value;
    const defaultSettings = this.getDefaultSettings();
    const newSettings = {
      ...currentSettings,
      [category]: defaultSettings[category]
    };
    this.settingsSubject.next(newSettings);
    this.saveSettings(newSettings);
    this.applySettings(newSettings);
  }

  public exportSettings(): string {
    return JSON.stringify(this.settingsSubject.value, null, 2);
  }

  public importSettings(jsonString: string): boolean {
    try {
      const importedSettings = JSON.parse(jsonString);
      if (this.validateSettings(importedSettings)) {
        this.settingsSubject.next(importedSettings);
        this.saveSettings(importedSettings);
        this.applySettings(importedSettings);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import settings:', error);
      return false;
    }
  }

  private loadSettings(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const settings = JSON.parse(stored);
        if (this.validateSettings(settings)) {
          this.settingsSubject.next(settings);
        }
      }
    } catch (error) {
      console.error('Failed to load settings from localStorage:', error);
    }
  }

  private saveSettings(settings: UISettings): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings to localStorage:', error);
    }
  }

  private validateSettings(settings: any): settings is UISettings {
    return settings &&
           typeof settings === 'object' &&
           settings.appearance &&
           settings.layout &&
           settings.menu &&
           settings.viewport3d;
  }

  private mergeSettings(current: UISettings, updates: Partial<UISettings>): UISettings {
    const result = { ...current };
    
    Object.keys(updates).forEach(key => {
      const categoryKey = key as keyof UISettings;
      if (updates[categoryKey]) {
        result[categoryKey] = { ...current[categoryKey], ...updates[categoryKey] } as any;
      }
    });
    
    return result;
  }

  private applySettings(settings: UISettings): void {
    this.applyCSSVariables(settings);
    this.applyLayoutSettings(settings.layout);
  }

  private applyCSSVariables(settings: UISettings): void {
    const root = document.documentElement;
    
    root.style.setProperty('--primary-color', settings.appearance.primaryColor);
    root.style.setProperty('--background-color', settings.appearance.backgroundColor);
    root.style.setProperty('--sidebar-color', settings.appearance.sidebarColor);
    root.style.setProperty('--text-color', settings.appearance.textColor);
    root.style.setProperty('--accent-color', settings.appearance.accentColor);
    root.style.setProperty('--font-size', `${settings.appearance.fontSize}px`);
    root.style.setProperty('--font-family', settings.appearance.fontFamily);
    
    const iconSize = settings.appearance.iconSize === 'small' ? '18px' : 
                    settings.appearance.iconSize === 'large' ? '32px' : '24px';
    root.style.setProperty('--icon-size', iconSize);
    
    root.style.setProperty('--sidebar-width', `${settings.layout.sidebarWidth}%`);
  }

  private applyLayoutSettings(layout: UISettings['layout']): void {
    const sidebarElement = document.querySelector('app-side-left') as HTMLElement;
    if (sidebarElement) {
      sidebarElement.style.width = `${layout.sidebarWidth}%`;
      sidebarElement.style.display = layout.compactMode ? 'none' : 'block';
    }

    const toolbarElement = document.querySelector('mat-toolbar') as HTMLElement;
    if (toolbarElement) {
      toolbarElement.style.display = layout.showToolbar ? 'flex' : 'none';
    }
  }

  public getModelColor(): number {
    const color = this.settingsSubject.value.viewport3d.modelColor;
    return parseInt(color.replace('#', '0x'), 16);
  }

  public getSupportColor(): number {
    const color = this.settingsSubject.value.viewport3d.supportColor;
    return parseInt(color.replace('#', '0x'), 16);
  }

  public getCrossBeamColor(): number {
    const color = this.settingsSubject.value.viewport3d.crossBeamColor;
    return parseInt(color.replace('#', '0x'), 16);
  }

  public getBackgroundColor(): number {
    const color = this.settingsSubject.value.appearance.backgroundColor;
    return parseInt(color.replace('#', '0x'), 16);
  }
}
