import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { UISettingsComponent } from './ui-settings.component';
import { UISettingsService } from '../../service/ui-settings.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

describe('UISettingsComponent', () => {
  let component: UISettingsComponent;
  let fixture: ComponentFixture<UISettingsComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<UISettingsComponent>>;
  let mockUISettingsService: jasmine.SpyObj<UISettingsService>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const uiSettingsServiceSpy = jasmine.createSpyObj('UISettingsService', [
      'getSettings', 'updateSettings', 'resetSettings', 'resetCategory', 
      'exportSettings', 'importSettings'
    ]);

    await TestBed.configureTestingModule({
      declarations: [ UISettingsComponent ],
      imports: [
        BrowserAnimationsModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSliderModule,
        MatCheckboxModule,
        MatButtonModule,
        FormsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: UISettingsService, useValue: uiSettingsServiceSpy }
      ]
    })
    .compileComponents();

    mockDialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<UISettingsComponent>>;
    mockUISettingsService = TestBed.inject(UISettingsService) as jasmine.SpyObj<UISettingsService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UISettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateSettings when onSettingsChange is called', () => {
    component.onSettingsChange();
    expect(mockUISettingsService.updateSettings).toHaveBeenCalledWith(component.settings);
  });

  it('should call resetSettings when resetAllSettings is called', () => {
    component.resetAllSettings();
    expect(mockUISettingsService.resetSettings).toHaveBeenCalled();
  });

  it('should call resetCategory when resetCategory is called', () => {
    component.resetCategory('appearance');
    expect(mockUISettingsService.resetCategory).toHaveBeenCalledWith('appearance');
  });

  it('should close dialog when close is called', () => {
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
