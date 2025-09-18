import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreeComponent } from './three/three.component';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotTableModule } from '@handsontable/angular';
import { registerAllModules } from 'handsontable/registry';
// register Handsontable's modules
registerAllModules();


import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MenuComponent } from './component/menu/menu.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { SideLeftComponent } from './component/side-left/side-left.component';
import { SideRightSlabComponent } from './component/side-right-slab/side-right-slab.component';
import { SideRightPavementComponent } from './component/side-right-pavement/side-right-pavement.component';
import { SideRightBeamComponent } from './component/side-right-beam/side-right-beam.component';
import { SideRightMidComponent } from './component/side-right-mid/side-right-mid.component';
import { SideRightCrossComponent } from './component/side-right-cross/side-right-cross.component';
import { SideRightCrossbeamComponent } from './component/side-right-crossbeam/side-right-crossbeam.component';
import { SideRightEndbeamComponent } from './component/side-right-endbeam/side-right-endbeam.component';
import { SideRightOthersComponent } from './component/side-right-others/side-right-others.component';
import { SideRightDisplayComponent } from './component/side-right-display/side-right-display.component';
import { AttributeDisplayComponent } from './component/attribute-display/attribute-display.component';
import { ChatComponent } from './component/chat/chat.component';
import { SocketioService } from './component/chat/socketio-service.service';
import { SettingsGeneralComponent } from './component/settings-general/settings-general.component';
import { SettingsModelComponent } from './component/settings-model/settings-model.component';
import { SettingsMenuComponent } from './component/settings-menu/settings-menu.component';
import { SettingsCustomMenuComponent } from './component/settings-custom-menu/settings-custom-menu.component';
import { SettingsUnitsComponent } from './component/settings-units/settings-units.component';
import { SettingsMaterialStrengthComponent } from './component/settings-material-strength/settings-material-strength.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreeComponent,
    MenuComponent,
    SideLeftComponent,
    SideRightOthersComponent,
    SideRightDisplayComponent,
    SideRightPavementComponent,
    SideRightSlabComponent,
    SideRightBeamComponent,
    SideRightMidComponent,
    SideRightCrossComponent,
    SideRightCrossbeamComponent,
    SideRightEndbeamComponent,
    AttributeDisplayComponent,
    ChatComponent,
    SettingsGeneralComponent,
    SettingsModelComponent,
    SettingsMenuComponent,
    SettingsCustomMenuComponent,
    SettingsUnitsComponent,
    SettingsMaterialStrengthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HotTableModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatSliderModule,
    MatBadgeModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  providers: [SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
