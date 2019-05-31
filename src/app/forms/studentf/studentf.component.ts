import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from 'src/app/student.service';

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
  student: any;
  constructor( private fb : FormBuilder, private route: ActivatedRoute,private router: Router, private modalService: NgbModal,private studentService: StudentService) {
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
      })
    },Validators.required);
    this.id = +this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if(this.id != 0){
      this.studentService.loadStudent(this.id).subscribe(data => {
        this.student = data;
        this.studentInfo.patchValue({
          firstName : this.student.body.firstName,
          lastName : this.student.body.lastName,
          bday : this.student.body.bday,
          gender : this.student.body.gender,
          contact :{
            email : this.student.body.contact.email,
            phone : this.student.body.contact.phone
          },
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
    console.log(this.studentInfo.value);
  if(this.studentInfo.status=="VALID"){
      this.message="Your student has been added!!";
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
        this.studentService.updateStudent(this.id,this.studentInfo.value).subscribe(data => {location.reload()});
      else
        this.studentService.addStudent(this.studentInfo.value).subscribe(data => {location.reload()});
    this.router.navigate([""]);
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
