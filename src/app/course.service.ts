import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http : HttpClient) { }
  apiUrl="http://localhost:8080/courses/";
  loadData(){
    return this.http.get(this.apiUrl, {observe: 'response'});
  }
  loadCourse(id : number){
    return this.http.get(this.apiUrl+id, {observe: 'response'});
  }
  addCourse(Course: any){
    return this.http.post(this.apiUrl, Course);
  }
  updateCourse(id : number, Course : any){
    return this.http.put(this.apiUrl+id, Course)  
  }
  deleteCourse(id : number){
    return this.http.delete(this.apiUrl+id);
  }
}
