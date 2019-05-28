import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http : HttpClient) { }
  loadData(){
    return this.http.get('http://localhost:3000/courses/', {observe: 'response'});
  }
  loadCourse(id : number){
    return this.http.get('http://localhost:3000/courses/'+id, {observe: 'response'});
  }
  addCourse(Course: any){
    return this.http.post('http://localhost:3000/courses/',Course);
  }
  updateCourse(id : number, Course : any){
    return this.http.put('http://localhost:3000/courses/'+id, Course)  
  }
  deleteCourse(id : number){
    return this.http.delete('http://localhost:3000/courses/'+id);
  }
}
