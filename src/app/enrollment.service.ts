import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  constructor(private http : HttpClient) { }
  loadData(){
    return this.http.get('http://localhost:3000/enrollment/', {observe: 'response'});
  }
  loadEnrollment(id : number){
    return this.http.get('http://localhost:3000/enrollment/'+id, {observe: 'response'});
  }
  addEnrollment(enrollment: any){
    return this.http.post('http://localhost:3000/enrollment/' , enrollment);
  }
  updateEnrollment(id : number, enrollment : any){
    return this.http.put('http://localhost:3000/enrollment/'+id, enrollment)  
  }
  deleteEnrollment(id : number){
    return this.http.delete('http://localhost:3000/enrollment/'+id);
  }
}
