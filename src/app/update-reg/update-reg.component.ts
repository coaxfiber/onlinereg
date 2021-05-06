import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GlobalService } from './../global.service';
import { InfoComponent } from './../info/info.component';
import Swal from 'sweetalert2';
const swal = Swal;
@Component({
  selector: 'app-update-reg',
  templateUrl: './update-reg.component.html',
  styleUrls: ['./update-reg.component.css']
})
export class UpdateRegComponent implements OnInit {

  constructor(public global: GlobalService,public dialog: MatDialog,public dialogRef: MatDialogRef<UpdateRegComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private http: Http) { }
  proglevel
  proglevelval=''
  fname=''
  mname=''
  lname=''
  suffix=''
  bdate=''
  gender=''
  cnumber=''
  cperson=''
  gradfrom=''
  collegestrandval=''
  courseval=''
  courseval1=''
  courseval2=''
  yeargrad=''
  address=''
  permPSGC=''
  strandval=''
  strandval1=''
  condition=true
  img=''
  pdate=''
  remarks=''
  attachment=''

  schools
  courses
  gradcourses=[]
  strandfiltered=[]
  currentdate
  currdatearray=[]
  strand=[]
  orfor=''
  ngOnInit() {
    this.currentdate=this.global.currentdate
    this.currdatearray=this.global.currdatearray
    this.strand=this.data.strand
    this.proglevel=this.data.proglevel
	  this.schools=this.data.schools
	  this.courses=this.data.courses
	  this.gradcourses=this.data.gradcourses
	  this.strandfiltered=this.data.strandfiltered

  	this.proglevelval=this.data.onedata.programLevel
	  this.fname=this.data.onedata.firstName
	  this.mname=this.data.onedata.middleName
	  this.lname=this.data.onedata.lastName
	  this.suffix=this.data.onedata.suffixName
	  this.bdate=this.data.onedata.dateOfBirth
	  this.gender=this.data.onedata.gender
	  this.cnumber=this.data.onedata.contactNumber
	  this.cperson=this.data.onedata.contactPerson
	  this.gradfrom=this.data.onedata.schoolGraduatedFrom
	  this.collegestrandval=this.data.onedata.strandId.toString()
	  this.courseval=this.data.onedata.preferredCourseID
	  this.courseval1=this.data.onedata.alternativeCourseID1
	  this.courseval2=this.data.onedata.alternativeCourseID2
	  this.yeargrad=this.data.onedata.yearGraduated.toString()
	  this.address=this.data.onedata.schoolAddressNoStreet
	  this.permPSGC=this.data.onedata.schoolAddressPSGC
	  this.strandval=this.data.onedata.shS_PriorityStrandID1
	  this.strandval1=this.data.onedata.shS_PriorityStrandID2
	  this.pdate=this.data.onedata.datePaid
	  this.remarks=this.data.onedata.remarks
    if (this.data.onedata.paymentType==1) {
      this.orfor = '2'
    }else{
      this.orfor = '1'
    }
    if ('0001-01-01T00:00:00'==this.data.onedata.datePaid) {
      this.pdate = ''
    }
     if (this.data.type==2) {
        this.img=this.data.onedata.proofOfPayment
     }
     if (this.data.type==3) {
        this.img=this.data.onedata.reportCard
     }

	  this.attachment = 'data:image/png;base64,'+this.img

      if (this.proglevelval=='05'&&this.data.type==2&&(this.data.onedata.idNumber!=null&&this.data.onedata.idNumber!='')) {
        this.checkverified()
      }
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
  filetype
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
  closethis(){
       this.dialogRef.close({result:'cancel'});
  }

  update(){
var date
    var pdate
    pdate = new Date(this.pdate).toLocaleString();
  	var x=''
    var gradcheck = false

    if(this.proglevelval=='04'||this.proglevelval=='05'||this.proglevelval=='06'||this.proglevelval=='07'){
      var gradcheck = true
      for (var i2 = 0; i2 < this.schools.length; ++i2) {
       if(this.gradfrom==this.schools[i2].companyName){
         gradcheck=false
         break
       }
      }
    }
    if (gradcheck) {
      x=x+"*School Graduated from must be selected!<br>"
    }
  	if (this.fname == '') {
  		x=x+"*First name is required!<br>"
  	}
  	if (this.lname == '') {
  		x=x+"*Last name is required!<br>"
  	}
  	if (this.gender == '') {
  		x=x+"*Sex is required!<br>"
  	}
    if (this.cnumber == '') {
      x=x+"*Contact number is required!<br>";
    }else{
      if (this.cnumber.length!= 11) {
      x=x+"*Contact number is invalid!<br>"
      }
    }
    
    // if (this.pdate == '') {
    //   x=x+"*Date of Payment is required!<br>"
    // }
    // if (this.img == '') {
    //   x=x+"*Proof Payment is required!<br>"
    // }
    
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
        x=x+"*Strand Priority is required!<br>"
      }
      if (this.strandval1 == ''&&this.orfor=='1') {
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

      if (this.img!=''&&this.data.type==2) {
         if (this.pdate == '') {
          x=x+"*Date of Payment is required!<br>"
        }
      }
      if (this.pdate != ''&&this.data.type==2) {
        if (this.img == '') {
          x=x+"*Proof Payment is required!<br>"
        }
      }
  	if (x=='') {
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
        this.global.swalLoading("")
    	var option=this.global.requestToken()


      var sy = this.global.sy

      var PaymentType=0
      if(this.orfor=='2'&&this.proglevelval=='05'&&(this.data.type==1||this.data.type==3||this.data.type==2)){
        PaymentType=1
      }
      if (this.proglevelval=='01'||this.proglevelval=='02'||this.proglevelval=='04'||this.proglevelval=='05') {
        if(this.global.sy.length == 7){
          sy = this.global.sy.slice(0, -1) 
        }
      }

      if (this.data.type==3) {
        this.data.onedata.reportCard = this.img
      }
      if (this.data.type==2) {
        this.data.onedata.proofOfPayment = this.img
      }
      var SupportingDocumentStatus= this.data.onedata.supportingDocumentStatus

      if (this.data.type==3) {
        SupportingDocumentStatus = 0
      }
     	this.http.put(this.global.api+'OnlineRegistration/Applicant/'+ this.data.onedata.applicantNo,
    	{
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
        "Remark": this.data.onedata.remarks,
        "SchoolYear": sy,
        "ProofOfPayment": this.data.onedata.proofOfPayment,
        "EmailAddress": this.global.email,
        "PaymentVerified": 0,
    		"RemarksVerification":  this.data.onedata.remarksVerification,
    		"ReportCard": this.data.onedata.reportCard,
    		"ReferenceNo": "",
        "DatePaid": this.pdate,
        "PaymentType": PaymentType,
        "SupportingDocumentStatus": SupportingDocumentStatus
			},option)
            .map(response => response.json())
            .subscribe(res => {
              
                this.global.swalSuccess2("Applicant Info Updated!")
                this.dialogRef.close({result:'updated'});
              },Error=>{
                this.global.swalAlertError(Error);
                console.log(Error)
              });
  	}else{
  	 this.global.swalAlert("Error Found:", x,"warning")
    }
  }

  lookup(){
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

  getAge(dateString) {
    var today = new Date("october 31, "+this.global.yearnow);
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
 }
 top
 accept
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

  encryp=''
  preenrollment=false
  serverdate
  checkverified(){
    this.global.swalLoading('')
this.http.get(this.global.api+'PublicAPI/CurrentServerTime')
  .map(response => response.json())
  .subscribe(res => {
    var today:any = new Date(res.data);
    var dd = String(today.getDate()-1).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    this.serverdate = today
    this.http.get(this.global.api+'OnlineRegistration/EncryptedString/'+this.data.onedata.idNumber,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          this.encryp=res.data
           this.http.get(this.global.api2+'?action=VerifyPreEnrollment&en='+encodeURIComponent(this.encryp)+'&year='+encodeURIComponent(this.serverdate.substr(this.serverdate.length - 4)))
              .map(response => response.json())
              .subscribe(res => {
                this.global.swalClose()
                this.preenrollment=res.data
                //this.preenrollment=true
              },Error=>{
                console.log(Error);
                this.global.swalAlert("Server not found!","ACCOUNTING SERVER MAY NOT BE AVAILABLE!",'warning');
                });
         },Error=>{
            console.log(Error);
            this.global.swalAlert("Server not found!","ACCOUNTING SERVER MAY NOT BE AVAILABLE!",'warning');
          });
    },Error=>{
        console.log(Error);
        this.global.swalAlertError(Error);
      });
  }



  message=''
  preference:any=[]
  swalConfirm(title,text,type,button)
  {
    swal.fire({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: button
      }).then((result) => {
        if (result.value) {
        var date = new Date(this.bdate).toLocaleString();
        var pdate = new Date(this.pdate).toLocaleString();
        if (this.preenrollment) {
          pdate = null
          this.img=null
        }
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
        this.global.swalLoading("")
      var option=this.global.requestToken()


      var sy = this.global.sy

      var PaymentType=0
      if(this.orfor=='2'&&this.proglevelval=='05'&&(this.data.type==1||this.data.type==3||this.data.type==2)){
        PaymentType=1
      }
      if (this.proglevelval=='01'||this.proglevelval=='02'||this.proglevelval=='04'||this.proglevelval=='05') {
        if(this.global.sy.length == 7){
          sy = this.global.sy.slice(0, -1) 
        }
      }

      if (this.data.type==3) {
        this.data.onedata.reportCard = this.img
      }
      if (this.data.type==2) {
        this.data.onedata.proofOfPayment = this.img
      }
                  this.accept = true
                     this.http.put(this.global.api+'OnlineRegistration/Applicant/'+this.data.onedata.applicantNo ,{
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
                        "Remark": this.data.onedata.remarks,
                        "SchoolYear": sy,
                        "ProofOfPayment": this.data.onedata.proofOfPayment,
                        "EmailAddress": this.global.email,
                        "PaymentVerified": 1,
                        "RemarksVerification":  this.data.onedata.remarksVerification,
                        "ReportCard": this.data.onedata.reportCard,
                        "ReferenceNo": "",
                        "DatePaid": this.pdate,
                        "PaymentType": PaymentType,
                        "SupportingDocumentStatus": 1
                      },this.global.option)
                        .map(response => response.json())
                        .subscribe(res => {

                          if (this.preenrollment) {
                           this.http.get(this.global.api+'OnlineRegistration/'+this.data.onedata.idNumber,this.global.option)
                           .map(response => response.json())
                              .subscribe(res => {
                                this.preference=res.data
                                 this.preference.shS_PriorityStrandId1 = this.getnotnull(this.strandval)
                                 this.preference.examForSchoolYear = this.global.sy
                                 this.http.put(this.global.api+'OnlineRegistration/Placement/'+this.data.onedata.idNumber,{
                                    "ExamDate": this.preference.examDate,
                                    "PreferredCourse": this.preference.preferredCourse,
                                    "AlternativeCourse": this.preference.alternativeCourse,
                                    "Level": 0,
                                    "VIT": this.preference.vit,
                                    "NVIT": this.preference.nvit,
                                    "PreferredCourseId": this.preference.preferredCourseId,
                                    "AlternativeCourseId1": this.preference.alternativeCourseId1,
                                    "AlternativeCourseId2": this.preference.alternativeCourseId2,
                                    "ExemptionType":this.preference.exemptionType,
                                    "Strand": this.preference.strand,
                                    "Result": "P",
                                    "GResult": this.preference.gResult,
                                    "TestSchedule":this.preference.testScheduleId,
                                    "ExamRoom":this.preference.examRoom,
                                    "ExamForSchoolYear": this.preference.examForSchoolYear,
                                    "Elem_ExamResult": this.preference.elem_ExamResult,
                                    "Elem_CourseId": this.preference.elem_CourseId,
                                    "Elem_Course": this.preference.elem_Course,
                                    "JHS_ExamResult":this.preference.jhS_ExamResult,
                                    "JHS_CourseId": this.preference.jhS_CourseId,
                                    "JHS_Course": this.preference.jhS_Course,
                                    "SHS_ExamResult":this.preference.shS_ExamResult,
                                    "SHS_PriorityStrandId1": this.preference.shS_PriorityStrandId1,
                                    "SHS_PriorityStrand1": this.preference.shS_PriorityStrand1,
                                    "SHS_PriorityStrandId2": this.preference.shS_PriorityStrandId2,
                                    "SHS_PriorityStrand2": this.preference.shS_PriorityStrand2
                                  },this.global.option)
                                    .map(response => response.json())
                                    .subscribe(res => {
                                      console.log(res)
                                        this.global.swalSuccess2("Pre-enrollment success!")
                                        this.dialogRef.close({result:'updated'});
                                    });
                                });
                                }else{
                                 //this.global.swalSuccess2("Pre-enrollment success!")
                                }
                                //this.getdata()
                                },Error=>{
                                  this.global.swalAlertError(Error);
                                });
                  }  
      })
  }
  getnotnull(y){
    var x=y
    if (x==null) {
      x=''
    }
    return x
  }
}
