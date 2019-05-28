import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './views/student/student.component';
import { CourseComponent } from './views/course/course.component';
import { EnrollmentComponent } from './views/enrollment/enrollment.component';
import { NavbarComponent } from './templates/navbar/navbar.component';
// import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { StudentfComponent } from './forms/studentf/studentf.component';
import { CoursefComponent } from './forms/coursef/coursef.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    CourseComponent,
    EnrollmentComponent,
    NavbarComponent,
    StudentfComponent,
    CoursefComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
