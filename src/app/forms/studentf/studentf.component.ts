import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-studentf',
  templateUrl: './studentf.component.html',
  styleUrls: ['./studentf.component.css']
})

export class StudentfComponent implements OnInit {
  @Input() id: number;
  submitted = false;
  studentInfo: FormGroup;
  gender: string[] = ['Male','Female'];
  closeResult: string;
  valid=false;
  message
  user: any;
  constructor( private fb : FormBuilder, private route: ActivatedRoute,private router: Router, private modalService: NgbModal) {
   }

  ngOnInit() {
    this.studentInfo = this.fb.group({
      firstName:   ['',[Validators.required, Validators.minLength(3)]],
      lastName:    ['',[Validators.required, Validators.minLength(3)]],
      bday:        ['', Validators.required],
      gender:      [this.gender[0], Validators.required],
      contact: this.fb.group({
        phone: ['',[Validators.required,Validators.minLength(10)]],
        email:  ['',[Validators.required,Validators.email]]
      }),
      courses:   ['null',Validators.required]
    },Validators.required);
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.id)
  }
  Onsubmit(content){
    console.log(this.studentInfo);
  if(this.studentInfo.status=="VALID"){
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
    this.router.navigate([""]);
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
