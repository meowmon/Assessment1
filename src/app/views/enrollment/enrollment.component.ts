import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from 'src/app/enrollment.service';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {
  enrollments: any;
  chosenEnroll: any;
  constructor(private enrollService: EnrollmentService) { }

  ngOnInit() {
    this.enrollService.loadData().subscribe(data =>{
      this.enrollments = data.body;
      console.log(data.body)
    })

  }
  
  delete(i: number){
    this.chosenEnroll = this.enrollments[i];
  }
  deleteNow(){
    console.log(this.chosenEnroll)
    this.enrollService.deleteEnrollment(this.chosenEnroll.id).subscribe(data=>{console.log(data)});
    window.location.reload();
  }

}
