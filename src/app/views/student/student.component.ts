import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  assessment: any ; //load all assessment
  student: any; //load all student
  constructor() { }

  ngOnInit() {
  }
  delete(id: number){
    
  }
}
