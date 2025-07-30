import { TestBed } from '@angular/core/testing';
import { UISettingsService } from './ui-settings.service';

describe('UISettingsService', () => {
  let service: UISettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UISettingsService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return default settings initially', () => {
    const settings = service.getSettings();
    expect(settings.appearance.primaryColor).toBe('#3f51b5');
    expect(settings.layout.sidebarWidth).toBe(15);
    expect(settings.menu.position).toBe('top');
    expect(settings.viewport3d.modelColor).toBe('#7f8f9f');
  });

  it('should update settings and save to localStorage', () => {
    const newSettings = {
      appearance: {
        primaryColor: '#ff0000'
      }
    };
    
    service.updateSettings(newSettings as any);
    const updatedSettings = service.getSettings();
    
    expect(updatedSettings.appearance.primaryColor).toBe('#ff0000');
    
    const stored = localStorage.getItem('girder-ui-settings');
    expect(stored).toBeTruthy();
    const parsedStored = JSON.parse(stored!);
    expect(parsedStored.appearance.primaryColor).toBe('#ff0000');
  });

  it('should reset settings to defaults', () => {
    service.updateSettings({ appearance: { primaryColor: '#ff0000' } } as any);
    service.resetSettings();
    
    const settings = service.getSettings();
    expect(settings.appearance.primaryColor).toBe('#3f51b5');
  });

  it('should reset specific category', () => {
    service.updateSettings({ 
      appearance: { primaryColor: '#ff0000' },
      layout: { sidebarWidth: 25 }
    } as any);
    
    service.resetCategory('appearance');
    
    const settings = service.getSettings();
    expect(settings.appearance.primaryColor).toBe('#3f51b5');
    expect(settings.layout.sidebarWidth).toBe(25);
  });

  it('should export settings as JSON string', () => {
    const exported = service.exportSettings();
    const parsed = JSON.parse(exported);
    
    expect(parsed.appearance).toBeDefined();
    expect(parsed.layout).toBeDefined();
    expect(parsed.menu).toBeDefined();
    expect(parsed.viewport3d).toBeDefined();
  });

  it('should import valid settings', () => {
    const testSettings = {
      appearance: { primaryColor: '#00ff00' },
      layout: { sidebarWidth: 20 },
      menu: { position: 'left' },
      viewport3d: { modelColor: '#ff00ff' }
    };
    
    const result = service.importSettings(JSON.stringify(testSettings));
    expect(result).toBe(true);
    
    const settings = service.getSettings();
    expect(settings.appearance.primaryColor).toBe('#00ff00');
  });

  it('should reject invalid settings import', () => {
    const invalidSettings = { invalid: 'data' };
    const result = service.importSettings(JSON.stringify(invalidSettings));
    expect(result).toBe(false);
  });

  it('should convert hex colors to numbers correctly', () => {
    service.updateSettings({ viewport3d: { modelColor: '#ff0000' } } as any);
    const modelColor = service.getModelColor();
    expect(modelColor).toBe(0xff0000);
  });
});
