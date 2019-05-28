import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from 'src/app/course.service';
import { StudentService } from 'src/app/student.service';
import { EnrollmentService } from 'src/app/enrollment.service';
import { HttpErrorResponse } from '@angular/common/http';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-enrollmentf',
  templateUrl: './enrollmentf.component.html',
  styleUrls: ['./enrollmentf.component.css']
})
export class EnrollmentfComponent implements OnInit {
  @Input() id: number
  date = new Date();
  enrollmentForm : FormGroup;
  students: any;
  courses: any;
  student: number =0;
  course: number =0;
  constructor(private studentService: StudentService,
    private enrollmentService: EnrollmentService, 
    private courseService: CourseService, 
    private fb : FormBuilder,
    private route: ActivatedRoute,
    private router: Router, 
    private modalService: NgbModal) { }

  ngOnInit() {
    this.studentService.loadData().subscribe(data=>{
      this.students = data.body;
    })
    this.courseService.loadData().subscribe(data=>{
      this.courses = data.body;
    })
    this.enrollmentForm = this.fb.group({
      student: this.fb.group({
        name:  ['',[Validators.required,Validators.minLength(10)]],
        studentId:  ['',[Validators.required,Validators.email]]
      }),
      course: this.fb.group({
        name: ['',[Validators.required,Validators.minLength(10)]],
        courseId:  ['',Validators.required]
      }),
      time: ['',Validators.required]
    },Validators.required);
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    if(this.id != 0){
      this.courseService.loadCourse(this.id).subscribe(data => {
        this.enrollmentForm.patchValue({
        })
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      })
      
    } 
  }
  getStudent(){
      this.enrollmentForm.patchValue({
        student: {
          name: this.students[this.student].firstName +" "+ this.students[this.student].lastName,
          studentId : this.students[this.student].id
        }
      })
  }
  getCourse(){
    this.enrollmentForm.patchValue({
      course: {
        name: this.courses[this.course].name,
        courseId : this.courses[this.course].id
      }
    })

  }
  Onsubmit(){
    console.log(this.enrollmentForm.value)
    this.enrollmentForm.patchValue({
      time: formatDate(this.date, 'dd-MM-yyyy hh:mm:ss a','vi', '+0700')
    });
    this.enrollmentService.addEnrollment(this.enrollmentForm.value).subscribe();
    this.router.navigate(["/enroll"]);
  }
}
