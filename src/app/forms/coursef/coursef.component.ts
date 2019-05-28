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
  courseInfo: FormGroup;

  constructor( private fb : FormBuilder, private route: ActivatedRoute,private router: Router, private modalService: NgbModal) { }
  ngOnInit(){
  this.courseInfo = this.fb.group({
    name:         ['',[Validators.required, Validators.minLength(5)]],
    startDate:    ['',Validators.required],
    endDate:      ['', Validators.required],
    credits:      ['',Validators.required],
    tuition:      ['',Validators.required]
  },Validators.required);
  this.id = +this.route.snapshot.paramMap.get('id');
  console.log(this.id)
}
Onsubmit(content){
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });

}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    this.router.navigate(["/courses"]);
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    this.router.navigate(["/courses"]);
    return 'by clicking on a backdrop';
  } else {
    this.router.navigate(["/courses"]);
    return  `with: ${reason}`;
  }
}

}
