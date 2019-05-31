import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: any;
  chosenCourse: any;
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.loadData().subscribe(data =>{
      this.courses = data.body;
    })
  }
  delete(i: number){
    this.chosenCourse = this.courses[i];
  }
  deleteNow(){
    console.log(this.chosenCourse)
    this.courseService.deleteCourse(this.chosenCourse.id).subscribe(data=>{console.log(data)});
    window.location.reload();
  }
}
