import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-coursef',
  templateUrl: './coursef.component.html',
  styleUrls: ['./coursef.component.css']
})
export class CoursefComponent implements OnInit {
  @Input() id: number
  closeResult: string;
  valid=false;
  status: string[]=['Incoming','In processing','Closed']
  courseInfo: FormGroup;
  message: string;

  constructor( private fb : FormBuilder, private route: ActivatedRoute,private router: Router, private modalService: NgbModal) { }
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
  if(this.valid)
    this.router.navigate(["/courses"]);
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

}
