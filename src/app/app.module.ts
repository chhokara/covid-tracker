import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CovidTableComponent } from './covid-table/covid-table.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { MoreInfoComponent } from './more-info/more-info.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', component: CovidTableComponent },
  { path: 'reportForm', component: ReportFormComponent },
  { path: 'moreInfo', component: MoreInfoComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CovidTableComponent,
    ReportFormComponent,
    MoreInfoComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
