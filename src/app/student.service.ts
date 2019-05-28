import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http : HttpClient) { }
  loadData(){
    return this.http.get('http://localhost:3000/student/', {observe: 'response'});
  }
  loadStudent(id : number){
    return this.http.get('http://localhost:3000/student/'+id, {observe: 'response'});
  }
  addStudent(Student: any){
    return this.http.post('http://localhost:3000/student/' , Student);
  }
  updateStudent(id : number, Student : any){
    return this.http.put('http://localhost:3000/student/'+id, Student)  
  }
  deleteStudent(id : number){
    return this.http.delete('http://localhost:3000/student/'+id);
  }
}
