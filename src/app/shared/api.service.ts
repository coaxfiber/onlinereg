import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../global.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: Http, public global:GlobalService) { }
  

  getPublicAPICurrentServerTime(){
    return this.http.get(this.global.api+'PublicAPI/CurrentServerTime',this.global.option)
  }
  getOnlineRegistrationSettings(){
    return this.http.get(this.global.api+'OnlineRegistration/Settings')
  }
  getOnlineRegistrationProgramLevel(){
    return this.http.get(this.global.api+'OnlineRegistration/ProgramLevel')
  }
  getOnlineRegistrationCoursesWithStrand(){
    return this.http.get(this.global.api+'OnlineRegistration/CoursesWithStrand')
  }
  getPublicAPISchools(){
    return this.http.get(this.global.api+'PublicAPI/Schools')
  }
  getPublicAPIStrands(){
    return this.http.get(this.global.api+'PublicAPI/Strands')
  }
  getOnlineRegistrationApplicants(sy){
    return this.http.get(this.global.api+'OnlineRegistration/Applicants/'+sy+'?emailAdd='+this.global.email)
  }
  getOnlineRegistration(idNumber){
    return this.http.get(this.global.api+'OnlineRegistration/'+idNumber,this.global.option)   
  }



  
  getOnlineRegistrationApplicant(schoolYear,applicantNo){
    return this.http.get(this.global.api+'OnlineRegistration/Applicant/'+schoolYear+"/"+applicantNo)  
  }
  postOnlineRegistrationApplicant(data,option){
    return this.http.post(this.global.api+'OnlineRegistration/Applicant' ,data,option)   
  }
  getPublicAPIProvinces(){
    return this.http.get(this.global.api+'PublicAPI/Provinces',this.global.option)
  }
  getPublicAPITownsCities(province){
    return this.http.get(this.global.api+'PublicAPI/TownsCities/'+province,this.global.option)  
  }
  getPublicAPIBarangays(province,town){
    return this.http.get(this.global.api+'PublicAPI/Barangays/'+province+'/'+town,this.global.option) 
  }

  putOnlineRegistrationApplicant(applicantNo,data,option){
    return this.http.put(this.global.api+'OnlineRegistration/Applicant/'+ applicantNo,data,option)
  }
}
