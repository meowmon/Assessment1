import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: any;
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.loadData().subscribe(data =>{
      this.courses = data.body;
    })
  }
  delete(id: number){
    
  }
}
