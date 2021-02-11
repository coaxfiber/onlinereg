import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GlobalService } from './../global.service';
import { InfoComponent } from './../info/info.component';
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
  ngOnInit() {

this.currentdate=new Date().getFullYear()
for (var i = 0; i < 19; ++i) {
  this.currdatearray[i] = this.currentdate--
}
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
	  this.yeargrad=this.data.onedata.yearGraduated
	  this.address=this.data.onedata.schoolAddressNoStreet
	  this.permPSGC=this.data.onedata.schoolAddressPSGC
	  this.strandval=this.data.onedata.shS_PriorityStrandID1
	  this.strandval1=this.data.onedata.shS_PriorityStrandID2
	  this.img=this.data.onedata.proofOfPayment
	  this.pdate=this.data.onedata.datePaid
	  this.remarks=this.data.onedata.remarks

	  this.attachment = 'data:image/png;base64,'+this.img
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
        "SchoolYear": this.global.sy,
        "ProofOfPayment": this.img,
        "EmailAddress": this.global.email,
        "PaymentVerified": 0,
    		"RemarksVerification":  this.data.onedata.remarksVerification,
    		"ReportCard": this.data.onedata.reportCard,
    		"ReferenceNo": "",
        "DatePaid": this.pdate,
        "PaymentType": 0,
			},option)
            .map(response => response.json())
            .subscribe(res => {
                this.global.swalSuccess2("Applicant Info Updated!")
                this.dialogRef.close({result:'updated'});
              },Error=>{
                this.global.swalAlertError();
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
    var today = new Date("october 31, 2020");
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
}
