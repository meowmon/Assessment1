import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './views/student/student.component';
import { CourseComponent } from './views/course/course.component';
import { EnrollmentComponent } from './views/enrollment/enrollment.component';
import { StudentfComponent } from './forms/studentf/studentf.component';
import { CoursefComponent } from './forms/coursef/coursef.component';
import { EnrollmentfComponent } from './forms/enrollmentf/enrollmentf.component';

const routes: Routes = [
  { path: '', component: StudentComponent},
  { path: 'newStudent', component: StudentfComponent},
  { path: 'editStudent/:id', component: StudentfComponent},
  { path: 'courses', component: CourseComponent},
  { path: 'editCourse/:id', component: CoursefComponent},
  { path: 'editEnroll/id',component:EnrollmentfComponent},
  { path: 'newCourse', component : CoursefComponent},
  { path: 'enroll', component: EnrollmentComponent},
  { path: 'newEnroll', component: EnrollmentfComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
