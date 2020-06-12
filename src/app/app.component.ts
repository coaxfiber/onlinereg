import { Component } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './global.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { InputComponent } from './main/input/input.component';
import { AfterViewInit, ElementRef, } from '@angular/core';
import { OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MainComponent } from './main/main.component';
import { InfoComponent } from './info/info.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'aurasystem';
  proglevel=[]
  bdate = ''

  fname = ''
  mname = ''
  lname = ''
  suffix = ''
  gender = ''
  cnumber = ''
  cperson = ''
  gradfrom = ''
  proglevelval = ''
  courses=[]
  gradcourses=[]
  schools=[]
  strand=[]

  loading=true

  condition = false
  yeargrad=''
  collegestrandval=''
  courseval=''
  courseval1=''
  courseval2=''
  strandval=''
  strandval1=''
  top = false

  currentdate
  currdatearray=[]

  strandfiltered=[]
  constructor(private elRef:ElementRef,public dialog: MatDialog,private global: GlobalService,private http: Http){
    
    setTimeout(console.log.bind(console, '%cStop!', 'color: red;font-size:75px;font-weight:bold;-webkit-text-stroke: 1px black;'), 0);
    setTimeout(console.log.bind(console, '%cThis is a browser feature intended for developers.', 'color: black;font-size:20px;'), 0);
  	
this.currentdate=new Date().getFullYear()
for (var i = 0; i < 19; ++i) {
  this.currdatearray[i] = this.currentdate--
}
    this.http.get(this.global.api+'OnlineRegistration/ProgramLevel')
                     .map(response => response.json())
                     .subscribe(res => {
                       this.proglevel=res.data
                       this.http.get(this.global.api+'OnlineRegistration/CoursesWithStrand')
                           .map(response => response.json())
                           .subscribe(res => {
                             for (var i = 0; i < res.data.length; ++i) {
                               if (res.data[i].programLevel=="50") {
                                 this.courses.push(res.data[i])
                               }
                               if (res.data[i].programLevel=="80"||res.data[i].programLevel=="90") {
                                 this.gradcourses.push(res.data[i])
                               }
                             }

                             this.http.get(this.global.api+'PublicAPI/Schools')
                                   .map(response => response.json())
                                   .subscribe(res => {
                                     this.schools=res
                                     //console.log(res)
                                     this.http.get(this.global.api+'PublicAPI/Strands')
                                           .map(response => response.json())
                                           .subscribe(res => {
                                             this.strand=res.data
                                             this.strandfiltered=[]
                                             this.strandfiltered.push({strandId:'900009',strandTitle:'Accountancy, Business and Management Strand'})
                                             this.strandfiltered.push({strandId:'900011',strandTitle:'Humanities and Social Sciences Strand'})
                                             this.strandfiltered.push({strandId:'900013',strandTitle:'Science, Technology, Engineering and Mathematics Health Strand'})
                                             this.strandfiltered.push({strandId:'900010',strandTitle:'Science, Technology, Engineering and Mathematics-Non-Health Strand'})
                                             this.loading = false
                                        },Error=>{
                                             this.global.swalAlertError()
                                            });
                                   },Error=>{
                                     this.global.swalAlertError()
                                    });
                           },Error=>{
                             this.global.swalAlertError()
                            });
                     },Error=>{
                       this.global.swalAlertError()
                      });
  }

  permPSGC=''
  address=''
  street=''
  lookup(lookup): void {
        const dialogRef = this.dialog.open(InfoComponent, {
          width: '500px', disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result!='cancel') {
              this.permPSGC = result.data;
              this.address = result.result;
          }
        });
      } 
  schoolstemp=[]
  keyDownFunction(){
      this.schoolstemp=[]
    if (this.gradfrom!=''&&this.gradfrom.length>=4) {
      for (var i = 0; i < this.schools.length; ++i) {
        if (this.schools[i].companyName.toLowerCase().includes(this.gradfrom.toLowerCase())) {
          this.schoolstemp.push(this.schools[i].companyName)
        }
      }
    }else{
      this.schoolstemp=[]
    }
    
  }
  getAge(dateString) {
    var today = new Date("october 31, 2020");
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
 }
  check(){
     if (this.proglevelval=='01'||this.proglevelval=='02'||this.proglevelval=='04'||this.proglevelval=='05') {
      this.condition = false
    }else
      this.condition = true

    this.yeargrad = ''
    this.gradfrom = ''
    this.collegestrandval=''
    this.courseval=''
    this.courseval1=''
    this.courseval2=''
    this.strandval=''
    this.strandval1=''
    this.top = false
    this.accept = false
  }
accept=false
  register(){
    var date
  	var x=''
  	if (this.fname == '') {
  		x=x+"*First name is required!<br>"
  	}
  	if (this.lname == '') {
  		x=x+"*Last name is required!<br>"
  	}
  	if (this.gender == '') {
  		x=x+"*Gender is required!<br>"
  	}
    if (this.cnumber == '') {
      x=x+"*Contact number is required!<br>";
    }else{
      if (this.cnumber.length!= 11) {
      x=x+"*Contact number is invalid!<br>"
      }
    }
    
  	if (this.bdate == '') {
  		x=x+"*Birth date is required!<br>"
  	}else{
      date = new Date(this.bdate).toLocaleString();
      if (this.proglevelval=='01') {
        if (this.getAge(this.bdate)<4) {
          x=x+"*Sorry, age requirement is not met.<br>You are not qualified to register.<br>"
        }
      }if (this.proglevelval=='02') {
        if (this.getAge(this.bdate)<5) {
          x=x+"*Sorry, age requirement is not met.<br>You are not qualified to register.<br>"
        }
      }
    }

    if (this.proglevelval=='04'||this.proglevelval=='05'||this.proglevelval=='06'||this.proglevelval=='07') {
      if (this.address == '') {
        x=x+"*School Address is required!<br>"
      }
    }
    if (this.proglevelval=='05') {
      if (this.strandval == '') {
        x=x+"*Strand Priority 1 is required!<br>"
      }
      if (this.strandval1 == '') {
        x=x+"*Strand Priority 2 is required!<br>"
      }
    }
    if (this.proglevelval=='06') {
      if (this.collegestrandval == '') {
        x=x+"*Current Strand is required!<br>"
      }
      if (this.courseval == '') {
        x=x+"*Preffered Course is required!<br>"
      }
      if (this.courseval1 == ''&&this.courseval2 == '') {
        x=x+"Please select at least 1 Alternative Course<br>"
      }
    }
    if (this.proglevelval=='07') {
      if (this.courseval == '') {
        x=x+"*Course is required!<br>"
      }
    }
    if (this.proglevelval=='01'||this.proglevelval=='02'||this.proglevelval=='03') {
     
    }else{
       if (this.gradfrom == '') {
        x=x+"*School graduated from field is required!<br>"
      }
       if (this.yeargrad == '') {
        x=x+"*Year Graduated is required!<br>"
      }
    }

  	if (x=='') {
      this.accept = false
      var address=''
      var companyid=''
      //this.global.swalLoading('');
      for (var i = 0; i < this.schools.length; ++i) {
        if (this.schools[i].companyName == this.gradfrom) {
          address = this.schools[i].address
          companyid = this.schools[i].companyID
          break
        }
      }
      var strandid
      if (this.collegestrandval=='') {
        strandid = 0
      }else
        strandid = parseInt(this.collegestrandval)


      var year
      if (this.yeargrad=='') {
        year = 0
      }else
        year = parseInt(this.yeargrad)
      
      var strandval
      if (this.strandval=='') {
        strandval = 0
      }else
        strandval = parseInt(this.strandval)

      var strandval1
      if (this.strandval1=='') {
        strandval1 = 0
      }else
        strandval1 = parseInt(this.strandval1)

        console.log(this.strandval)
    	var option=this.global.requestToken()
    	this.http.post(this.global.api+'/OnlineRegistration/Applicant' ,{
			  "ProgramLevel": this.proglevelval,
			  "FirstName": this.fname.toUpperCase(),
			  "MiddleName": this.mname.toUpperCase(),
			  "LastName": this.lname.toUpperCase(),
			  "SuffixName": this.suffix.toUpperCase(),
			  "DateOfBirth": date,
			  "Gender": this.gender,
			  "ContactNumber": this.cnumber,
			  "ContactPerson": this.cperson,
			  "SchoolGraduatedFrom": this.gradfrom,
        "StrandId": strandid,
        "PreferredCourseId": this.courseval,
        "AlternativeCourseId1": this.courseval1,
        "AlternativeCourseId2": this.courseval2,
        "YearGraduated": year,
        "SchoolAddressNoStreet": this.address,
        "SchoolAddressPSGC": this.permPSGC,
        "SHS_PriorityStrandID1": this.strandval,
        "SHS_PriorityStrandID2": this.strandval1,
        "TopOfMyClass": this.condition
			},option)
            .map(response => response.json())
            .subscribe(res => {
                  this.openDialogmain({
                      "ProgramLevel": this.proglevelval,
                      "FirstName": this.fname.toUpperCase(),
                      "MiddleName": this.mname.toUpperCase(),
                      "LastName": this.lname.toUpperCase(),
                      "SuffixName": this.suffix.toUpperCase(),
                      "DateOfBirth": date,
                      "Gender": this.gender,
                      "ContactNumber": this.cnumber,
                      "ContactPerson": this.cperson,
                      "SchoolGraduatedFrom": this.gradfrom,

                      "StrandId": strandid,
                      "PreferredCourseId": this.courseval,
                      "AlternativeCourseId1": this.courseval1,
                      "AlternativeCourseId2": this.courseval2,
                      "YearGraduated": year,
                      "SchoolAddressNoStreet": this.address,
                      "SchoolAddressPSGC": this.permPSGC,
                      "SHS_PriorityStrandID1": this.strandval,
                      "SHS_PriorityStrandID2": this.strandval1,
                      "TopOfMyClass": this.condition
                    })
            	
      this.accept = true
                              },Error=>{
                                this.global.swalAlertError();
                                console.log(Error)
      this.accept = true
                              });
  	}else{
      console.log(this.condition)
  	 this.global.swalAlert("Error Found:", x,"warning")
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InputComponent, {
      width: '750px', disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined) {
      }
    });
  }

  openDialogmain(data): void {
    const dialogRef = this.dialog.open(MainComponent, {
      width: '750px',data:{data: data,proglevel:this.proglevel,strand:this.strand,strand2:this.strandfiltered,courses:this.courses,gradcourses:this.gradcourses}, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined) {
        
      if (this.proglevelval!='01'&&this.proglevelval!='02'&&this.proglevelval!='04'&&this.proglevelval!='05') {
        this.condition=false
      }
        this.proglevelval = ''
        this.fname = ''
       this. mname = ''
        this.lname = ''
        this.suffix = ''
        this.gender = ''
        this. cnumber = ''
        this.cperson = ''
        this.gradfrom = ''
        this.proglevelval = ''
        this.accept=false
        this.global.swalClose()
      }
    });
  }

  ngAfterViewInit() {
     let loader = this.elRef.nativeElement.querySelector('#loader'); 
     document.getElementById("loader").style.display = "none";
  }
  
}
