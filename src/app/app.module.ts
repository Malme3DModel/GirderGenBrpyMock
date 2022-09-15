import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreeComponent } from './three/three.component';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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

import { SideLeftComponent } from './component/side-left/side-left.component';
import { SideRightComponent } from './component/side-right/side-right.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreeComponent,
    MenuComponent,
    SideLeftComponent,
    SideRightComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
