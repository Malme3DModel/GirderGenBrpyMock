import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpatialTreeComponent } from './spatial-tree/spatial-tree.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { PropertyMenuComponent } from './property-menu/property-menu.component';
import { IfcService } from './services/ifc.service';
import { SummaryPipe } from './pipes/summary';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SpatialTreeComponent,
    ClickStopPropagationDirective,
    PropertyMenuComponent,
    SummaryPipe,
    CodeEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTreeModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatTooltipModule
  ],
  providers: [IfcService],
  bootstrap: [AppComponent]
})
export class AppModule {}
