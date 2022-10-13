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
import { MenuComponent } from './component/menu/menu.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { SideLeftComponent } from './component/side-left/side-left.component';
import { SideRightSlabComponent } from './component/side-right-slab/side-right-slab.component';
import { SideRightBeamComponent } from './component/side-right-beam/side-right-beam.component';
import { SideRightMidComponent } from './component/side-right-mid/side-right-mid.component';
import { SideRightCrossComponent } from './component/side-right-cross/side-right-cross.component';
import { SideRightCrossbeamComponent } from './component/side-right-crossbeam/side-right-crossbeam.component';
import { SideRightEndbeamComponent } from './component/side-right-endbeam/side-right-endbeam.component';
import { SideRightGusset01Component } from './component/side-right-gusset01/side-right-gusset01.component';
import { SideRightGusset02Component } from './component/side-right-gusset02/side-right-gusset02.component';
import { SideRightGusset03Component } from './component/side-right-gusset03/side-right-gusset03.component';
import { SideRightOthersComponent } from './component/side-right-others/side-right-others.component';
import { ChatComponent } from './component/chat/chat.component';
import { SocketioService } from './component/chat/socketio-service.service';

@NgModule({
  declarations: [
    AppComponent,
    ThreeComponent,
    MenuComponent,
    SideLeftComponent,
    SideRightOthersComponent,
    SideRightSlabComponent,
    SideRightBeamComponent,
    SideRightMidComponent,
    SideRightCrossComponent,
    SideRightCrossbeamComponent,
    SideRightEndbeamComponent,
    SideRightGusset01Component,
    SideRightGusset02Component,
    SideRightGusset03Component,
    ChatComponent
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
    BrowserAnimationsModule
  ],
  providers: [SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
