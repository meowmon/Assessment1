import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/student.service';
import { Router } from '@angular/router';
import { EnrollmentService } from 'src/app/enrollment.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  enrollments: any ; //load all assessment
  students: any; //load all student
  page = 1;
  constructor(private studentService: StudentService, private router: Router,private enrollmentService: EnrollmentService) { }
  chosenStudent: any;
  ngOnInit() {
    this.studentService.loadData().subscribe(data =>{
      this.students = data.body;
      console.log(data)
    });
    this.enrollmentService.loadData().subscribe(data =>{
      this.enrollments = data.body;
    })
  }
  delete(i: number){
    this.chosenStudent = this.students[i];
  }
  deleteNow(){
    console.log(this.chosenStudent)
    this.studentService.deleteStudent(this.chosenStudent.id).subscribe(data=>{console.log(data)});
    window.location.reload();
  }
}
