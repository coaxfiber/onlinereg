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
import { LoginComponent } from './login/login.component';
import { UpdateRegComponent } from './update-reg/update-reg.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { ReportcardComponent } from './reportcard/reportcard.component';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'online reg';
  proglevel=[]
  bdate = ''
  pdate = ''

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
  login=undefined
  type=''

  cetsched:any=[]
  result=true
  NewStudent = ''
  constructor(private authService: SocialAuthService,private _snackBar: MatSnackBar,private elRef:ElementRef,public dialog: MatDialog,private global: GlobalService,private http: Http){
    
    setTimeout(console.log.bind(console, '%cStop!', 'color: red;font-size:75px;font-weight:bold;-webkit-text-stroke: 1px black;'), 0);
    setTimeout(console.log.bind(console, '%cThis is a browser feature intended for developers.', 'color: black;font-size:20px;'), 0);
  	
    this.currentdate=new Date().getFullYear()+1
    for (var i = 0; i < 19; ++i) {
    this.currdatearray[i] = this.currentdate--
    }

this.loading=true
    this.http.get(this.global.api+'OnlineRegistration/ProgramLevel')
                     .map(response => response.json())
                     .subscribe(res => {
                       this.proglevel=[]
                       for (var i = 0; i < res.data.length; ++i) {
                         if (res.data[i].programLevel=="06") {
                           this.proglevel.push(res.data[i])
                         }
                       }
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

                                             for (var i = 0; i < res.data.length; ++i) {
                                               if (res.data[i].strandCode=='ABM'||res.data[i].strandCode=='HUMSS'||res.data[i].strandCode=='STEM-NH'||res.data[i].strandCode=='STEM-H') {
                                                 this.strandfiltered.push(res.data[i])
                                               }
                                             }
                                             this.strandfiltered=[]
                                             this.strandfiltered.push({strandId:'900009',strandTitle:'Accountancy, Business and Management Strand'})
                                             this.strandfiltered.push({strandId:'900011',strandTitle:'Humanities and Social Sciences Strand'})
                                             this.strandfiltered.push({strandId:'900013',strandTitle:'Science, Technology, Engineering and Mathematics Health Strand'})
                                             this.strandfiltered.push({strandId:'900010',strandTitle:'Science, Technology, Engineering and Mathematics-Non-Health Strand'})
                                             this.loading = false

                                              if (sessionStorage.getItem("email")==null) {
                                                this.googlelogin()
                                              }else{
                                                this.global.email= sessionStorage.getItem("email")
                                                this.runupdate()
                                              }
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

  onedata
  remarks=''
  applicantNo=''
  googlelogin(): void {
        const dialogRef = this.dialog.open(LoginComponent, {
          width: '950px', disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result!='cancel') {
             this.runupdate()
          }
        });
      } 
signOuttemp=0 
signOut(): void {

  sessionStorage.removeItem("email");
    if (this.signOuttemp==0) {
      this.signOuttemp=1
      this.authService.signOut();
      location.reload();
    }else
      location.reload();
  }
openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }


vars
textsent=false
runupdate(){
      this.login=false
            this.http.get(this.global.api+'OnlineRegistration/Applicants/'+this.global.sy+'?emailAdd='+this.global.email)
                     .map(response => response.json())
                     .subscribe(res => {
                       this.login = true
                       this.type = 'reg'
                       if (res.data!=null||res.data!=undefined) {
                         if (res.data.length==1) {
                           sessionStorage.setItem("email", this.global.email);
                           this.type = 'stat'
                           this.onedata = res.data[0]
                           this.applicantNo = this.onedata.applicantNo
                          this.proglevelval=this.onedata.programLevel
                          this.fname=this.onedata.firstName
                          this.mname=this.onedata.middleName
                          this.lname=this.onedata.lastName
                          this.suffix=this.onedata.suffixName
                          this.bdate=this.onedata.dateOfBirth
                          this.gender=this.onedata.gender
                          this.cnumber=this.onedata.contactNumber
                          this.cperson=this.onedata.contactPerson
                          this.gradfrom=this.onedata.schoolGraduatedFrom
                          this.collegestrandval=this.onedata.strandId
                          this.courseval=this.onedata.preferredCourseID
                          this.courseval1=this.onedata.alternativeCourseID1
                          this.courseval2=this.onedata.alternativeCourseID2
                          this.yeargrad=this.onedata.yearGraduated
                          this.address=this.onedata.schoolAddressNoStreet
                          this.permPSGC=this.onedata.schoolAddressPSGC
                          this.strandval=this.onedata.shS_PriorityStrandID1
                          this.strandval1=this.onedata.shS_PriorityStrandID2
                          this.condition=this.onedata.topOfMyClass
                          this.img=this.onedata.proofOfPayment
                          this.pdate=this.onedata.datePaid
                          this.remarks=this.onedata.remarks
                          
                          this.vars={
                            "ProgramLevel": this.proglevelval,
                            "FirstName": this.fname.toUpperCase(),
                            "MiddleName": this.mname.toUpperCase(),
                            "LastName": this.lname.toUpperCase(),
                            "SuffixName": this.suffix.toUpperCase(),
                            "DateOfBirth": this.bdate,
                            "pdate": this.pdate,
                            "Gender": this.gender,
                            "ContactNumber": this.cnumber,
                            "ContactPerson": this.cperson,
                            "SchoolGraduatedFrom": this.gradfrom,
                            "StrandId": this.collegestrandval,
                            "PreferredCourseId": this.courseval,
                            "AlternativeCourseId1": this.courseval1,
                            "AlternativeCourseId2": this.courseval2,
                            "YearGraduated": this.yeargrad,
                            "SchoolAddressNoStreet": this.address,
                            "SchoolAddressPSGC": this.permPSGC,
                            "SHS_PriorityStrandID1": this.strandval,
                            "SHS_PriorityStrandID2": this.strandval1,
                            "TopOfMyClass": this.condition
                          }
                          this.placementdata=null
                          if (res.data[0].idNumber!=null||res.data[0].idNumber!='') {
                            //+res.data[0].idNumber
                            this.http.get(this.global.api+'OnlineRegistration/'+res.data[0].idNumber,this.global.option)         
                                  .map(response => response.json())
                                  .subscribe(res => {
                                   if (res.data!=null) {
                                     this.textsent=res.data.testSchedSent
                                     this.placementdata=res.data
                                     this.cetsched = res.data
                                     if (this.placementdata.examForSchoolYear==null) {
                                       this.placementdata.examForSchoolYear=''
                                     }
                                   }

                                   this.onedata.proofOfPayment=null
                                    this.http.get(this.global.api+'OnlineRegistration/Applicant/'+this.global.sy+"/"+this.onedata.applicantNo)
                                       .map(response => response.json())
                                       .subscribe(res => {
                                         this.onedata.proofOfPayment = res.data[0].proofOfPayment
                                         this.onedata.reportCard = res.data[0].reportCard
                                         console.log()
                                       });
                                   
                                },err=>{
                                  console.log(err)
                                });
                          }
                           
                         }
                       }
                     });
}
  placementdata:any=null
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
    var pdate
    pdate = new Date(this.pdate).toLocaleString();
  	var x=''
    if (this.fname == '') {
      x=x+"*First name is required!<br>"
    }
    if (this.NewStudent == '') {
      x=x+"*Please answer the question 'Have you been to USL before?'.<br>"
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
    
    if (this.pdate == '') {
      x=x+"*Date of Payment is required!<br>"
    }
    if (this.img == '') {
      x=x+"*Proof Payment is required!<br>"
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

       var NewStudent
       if (this.NewStudent=='true') {
         NewStudent = true
       }else
         NewStudent = false

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
        "SchoolAddressPSGC":  this.permPSGC,
        "SHS_PriorityStrandID1": this.strandval,
        "SHS_PriorityStrandID2": this.strandval1,
        "TopOfMyClass": this.condition,
        "Remark": "",
        "SchoolYear": this.global.sy,
        "ProofOfPayment": this.img,
        "EmailAddress": this.global.email,
        "DatePaid": this.pdate,
        "NewStudent": NewStudent
			},option)
            .map(response => response.json())
            .subscribe(res => {
              this.vars = {
                      "ProgramLevel": this.proglevelval,
                      "FirstName": this.fname.toUpperCase(),
                      "MiddleName": this.mname.toUpperCase(),
                      "LastName": this.lname.toUpperCase(),
                      "SuffixName": this.suffix.toUpperCase(),
                      "DateOfBirth": date,
                      "pdate": pdate,
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
                    }
                  this.openDialogmain(this.vars)
            	
      this.accept = true
                              },Error=>{
                                this.global.swalAlertError();
                                console.log(Error)
      this.accept = true
                              });
  	}else{
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

   filetype=''
  attachment=''
  img=''
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (file.type.includes('jpg')||file.type.includes('png')||file.type.includes('JPG')||file.type.includes('PNG')||file.type.includes('jpeg')) {
          this.filetype = file.type
          this.attachment = "data:image/png;base64,"+reader.result.toString().split(',')[1]
          this.img = reader.result.toString().split(',')[1]
        }else{
          alert("Invalid Image Type");
        }
      };
    }
   
  }
  openDialogmain(data): void {
    const dialogRef = this.dialog.open(MainComponent, {
      width: '750px',data:{
        data: data,
        proglevel:this.proglevel,
        strand:this.strand,
        strand2:this.strandfiltered,
        courses:this.courses,
        gradcourses:this.gradcourses
      }, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined) {
       this.type=''
       this.runupdate()
       this.global.swalClose()
      }
    });
  }

  openDialogUpdate(data): void {
    const dialogRef = this.dialog.open(UpdateRegComponent, {
      width: '800px',data:{ 
        onedata:data,
        proglevel:this.proglevel,
        schools:this.schools,
        courses:this.courses,
        gradcourses:this.gradcourses,
        strandfiltered:this.strandfiltered,
        strand:this.strand
      }, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.result!=undefined) {
        this.type='stat'
        if (result.result=='updated') {
          this.runupdate()
        }
      }
    });
  }

  ngAfterViewInit() {
     let loader = this.elRef.nativeElement.querySelector('#loader'); 
     document.getElementById("loader").style.display = "none";
  }

  openprint(){
    var date
    var pdate
    pdate = new Date(this.pdate).toLocaleString();
    date = new Date(this.bdate).toLocaleString();
    var strandid = parseInt(this.collegestrandval)
    var year
      if (this.yeargrad=='') {
        year = 0
      }else
        year = parseInt(this.yeargrad)

    this.openDialogmain({
                      "ProgramLevel": this.proglevelval,
                      "FirstName": this.fname.toUpperCase(),
                      "MiddleName": this.mname.toUpperCase(),
                      "LastName": this.lname.toUpperCase(),
                      "SuffixName": this.suffix.toUpperCase(),
                      "DateOfBirth": date,
                      "pdate": pdate,
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
  }

  getproglevelval(x){
    for (var i = 0; i < this.proglevel.length; ++i) {
      if (this.proglevel[i].programLevel==x) {
        return this.proglevel[i].progLevelDesc
      }
    }
  }

  getCurrentStrand(x){
    for (var i = 0; i < this.strand.length; ++i) {
      if (this.strand[i].strandId==x) {
        return this.strand[i].strandTitle
      }
    }
  }


  getCourse(x){
    for (var i = 0; i < this.courses.length; ++i) {
      if (this.courses[i].programId==x) {
        return this.courses[i].course
      }
    }
  }


  openreportcard(): void {
    const dialogRef = this.dialog.open(ReportcardComponent, {
      width: '750px', data:this.onedata,disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined) {
       this.onedata.reportCard=result.result
      }

    });
  }


  seeexpandend(){
    if (this.onedata!=undefined) {
      if (this.onedata.paymentVerified==0) {
        return 1
      }

      if (this.onedata.paymentVerified==1) {
        if (this.placementdata==null) {
          return 2
        }else{
          if (this.placementdata.testSchedule!=null) {
            if (this.placementdata.result=="F"||this.placementdata.result=="P"||this.placementdata.result=="R") {
              return 5
            }
            return 4
          }
        }
      }

      if (this.onedata.paymentVerified==2) {
        return 3
      }
    }else{
      return 0
    }
  }


   generatePDF(){
   //place this block of codes inside a function
      var SY = this.global.syDisplay(this.global.sy);


       var headers = [
              {text:'No.',bold:true},
              {text:'IDNUMBER',bold:true,alignment:'center'},
              {text:'NAME',bold:true,alignment:'center'},
              {text:'GENDER',bold:true,alignment:'center'},
              {text:'GRADE',bold:true,alignment:'center'},
              {text:'REMARKS',bold:true,alignment:'center'},
              ];
          var tableData = [];
          var res = [];
          
          res.push(headers);

      var dd = {
          pageSize:'LEGAL',
        content: [
          {text:'University of Saint Louis\nTuguegarao City, Cagayan\nFINAL GRADES\n\n',bold:true,fontSize:10,alignment:'center'},
          {text:'*Grade Legend: D is Dropped; N is NFE; WP is for Withdrawn with Permission',italics:true,fontSize:7},
          {
              table:{
                  headerRows: 1,
                  pageBreak:'before',
                  dontBreakRows: true,
                  widths:[20,47,260,45,45,45],
                  body:res,
              },fontSize:9,
              layout:{
                        hLineWidth: function (i, node) { return 0.75; },
                          vLineWidth: function (i, node) { return 0.75; },
                          paddingTop: function(i, node) { return 1; },
                          paddingBottom: function(i, node) { return 1; },
                    }
          },
          {text:'\n'},
          {text:'Checked by:\n\n\nName and Signature',fontSize:9}
        ],
        footer:function(currentPage, pageCount, pageSize) {
            return [
                {text:currentPage+' of '+pageCount,alignment:'right',fontSize:9,margin:[0,0,40,0]}
            ]
        }
        
      }
      pdfMake.createPdf(dd).open();
  }
}

