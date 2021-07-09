import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GlobalService } from './../global.service';

@Component({
  selector: 'app-reportcard',
  templateUrl: './reportcard.component.html',
  styleUrls: ['./reportcard.component.css']
})
export class ReportcardComponent implements OnInit {
	attachment=''
	img=''
	filetype=''
   constructor(public global: GlobalService,public dialog: MatDialog,public dialogRef: MatDialogRef<ReportcardComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private http: Http) { }
  
  ngOnInit() {
  	if(this.data.reportCard!=null&&this.data.reportCard!=''){
  		this.attachment = "data:image/png;base64,"+this.data.reportCard
        this.img = this.data.reportCard
  	}
  }
  
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
       this.dialogRef.close(undefined);
  }


  update(){
  	if (this.attachment != '') {
  		this.global.swalLoading("Uploading")
    	var option=this.global.requestToken()
      if(this.data.datePaid=='0001-01-01T00:00:00'){
        this.data.datePaid=''
      }
  		this.http.put(this.global.api+'OnlineRegistration/Applicant/'+ this.data.applicantNo,
    	{
        "ProgramLevel": this.data.programLevel,
        "FirstName": this.data.firstName,
        "MiddleName": this.data.middleName,
        "LastName": this.data.lastName,
        "SuffixName": this.data.suffixName,
        "DateOfBirth": this.data.dateOfBirth,
        "Gender": this.data.gender,
        "ContactNumber": this.data.contactNumber,
        "ContactPerson": this.data.contactPerson,
        "SchoolGraduatedFrom": this.data.schoolGraduatedFrom,
        "StrandId": this.data.strandId,
        "PreferredCourseId": this.data.preferredCourseID,
        "AlternativeCourseId1": this.data.alternativeCourseID1,
        "AlternativeCourseId2": this.data.alternativeCourseID2,
        "YearGraduated": this.data.yearGraduated,
        "SchoolAddressNoStreet": this.data.schoolAddressNoStreet,
        "SchoolAddressPSGC":  this.data.schoolAddressPSGC,
        "SHS_PriorityStrandID1":this.data.shS_PriorityStrandID1,
        "SHS_PriorityStrandID2": this.data.shS_PriorityStrandID2,
        "TopOfMyClass":this.data.topOfMyClass,
        "Remark": this.data.remarks,
        "SchoolYear": this.data.schoolYear,
        "ProofOfPayment":this.data.proofOfPayment,
        "EmailAddress": this.data.emailAdd,
        "PaymentVerified": this.data.paymentVerified,
    		"RemarksVerification":  this.data.remarksVerification,
    		"ReportCard": this.img,
    		"ReferenceNo": this.data.referenceNo,
        "DatePaid": this.data.datePaid
			},option)
            .map(response => response.json())
            .subscribe(res => {
                if ('Applicant information updated successfully.'==res.message) {
                  this.global.swalSuccess2("Report Card Updated!")
                  this.dialogRef.close({result:this.img});
                }else{
                  this.global.swalAlert(res.message,'','warning')
                }
              },Error=>{
                this.global.swalAlertError(Error);
                console.log(Error)
              });
  		// code...
  	}else{
  		this.global.swalAlert('No file detected!','','warning')
  	}
  }
}
