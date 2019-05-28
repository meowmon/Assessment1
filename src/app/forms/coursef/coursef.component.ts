import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'; 
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-coursef',
  templateUrl: './coursef.component.html',
  styleUrls: ['./coursef.component.css']
})
export class CoursefComponent implements OnInit {
  @Input() id: number
  closeResult: string;
  valid=false;
  course:any;
  status: string[]=['Incoming','In processing','Closed']
  courseInfo: FormGroup;
  message: string;

  constructor(private courseService: CourseService, 
    private fb : FormBuilder, 
    private route: ActivatedRoute,
    private router: Router, 
    private modalService: NgbModal) { }
  ngOnInit(){
  this.courseInfo = this.fb.group({
    name:         ['',[Validators.required, Validators.minLength(5)]],
    status:       [this.status[0],Validators.required],
    startDate:    ['',Validators.required],
    endDate:      ['',Validators.required],
    credits:      ['',Validators.required],
    tuition:      ['',Validators.required]
  },Validators.required);
  this.id = +this.route.snapshot.paramMap.get('id');
  console.log(this.id)
  if(this.id != 0){
    this.courseService.loadCourse(this.id).subscribe(data => {
      this.course = data;
      this.courseInfo.patchValue({
        name : this.course.body.name,
        status : this.course.body.status,
        startDate : this.course.body.startDate,
        endDate : this.course.body.endDate,
        credits : this.course.body.credits,
        tuition : this.course.body.tuition
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
Onsubmit(content){
  console.log(this.courseInfo);
  if(this.courseInfo.status=="VALID"){
      this.message="Your course has been added!!";
      this.valid=true;
  }else{ 
    this.message="Please fill in all blanks!!"
  }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
  

  
}
private getDismissReason(reason: any): string {
  if(this.valid){
    if(this.id !=0)
      this.courseService.updateCourse(this.id,this.courseInfo.value).subscribe();
    else
      this.courseService.addCourse(this.courseInfo.value).subscribe();
    this.router.navigate(["/courses"]);
  }
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

}
