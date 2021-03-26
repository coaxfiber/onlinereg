import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked, } from '@angular/core';
import { GlobalService } from './../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import { InputComponent } from './input/input.component';
import * as jspdf from 'jspdf';
import { Inject} from '@angular/core';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  vars
  proglevelval=''
  fullname=''
  applicantNo=''
  currentstrand=''

  strandp1=''
  strandp2=''

  pcourse=''
  acourse1=''
  acourse2=''

  visible=true
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<MainComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }
  
  time=0

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  
  ngAfterViewChecked() {        
        this.scrollToBottom();        
    } 
    scrollToBottom(){ 
      if (this.time<100) {
      setTimeout(() => {
        try {
          this.time++
              this.myScrollContainer.nativeElement.scrollTop = 0;
          } catch(err) {console.log(err) }
          });
        // code...
      }

    }

  ngOnInit() {
    this.vars=this.data.data
    for (var i = 0; i < this.data.proglevel.length; ++i) {
      if (this.data.proglevel[i].programLevel == this.vars.ProgramLevel) {
        this.proglevelval = this.data.proglevel[i].progLevelDesc
      }
    }
    for (var i = 0; i < this.data.strand.length; ++i) {
      if (this.data.strand[i].strandId == this.vars.StrandId) {
        this.currentstrand = this.data.strand[i].strandTitle
      }
    }
    for (var i = 0; i < this.data.strand2.length; ++i) {
      if (this.data.strand2[i].strandId == this.vars.SHS_PriorityStrandID1) {
        this.strandp1 = this.data.strand2[i].strandTitle
      }
    }
    for (var i = 0; i < this.data.strand2.length; ++i) {
      if (this.data.strand2[i].strandId == this.vars.SHS_PriorityStrandID2) {
        this.strandp2 = this.data.strand2[i].strandTitle
      }
    }


    for (var i = 0; i < this.data.courses.length; ++i) {
      if (this.data.courses[i].programId == this.vars.PreferredCourseId) {
        this.pcourse = this.data.courses[i].course
      }
    }
    for (var i = 0; i < this.data.courses.length; ++i) {
      if (this.data.courses[i].programId == this.vars.AlternativeCourseId1) {
        this.acourse1 = this.data.courses[i].course
      }
    }
    for (var i = 0; i < this.data.courses.length; ++i) {
      if (this.data.courses[i].programId == this.vars.AlternativeCourseId2) {
        this.acourse2 = this.data.courses[i].course
      }
    }
    this.fullname = this.vars.LastName + ', ' + this.vars.FirstName + " " + this.vars.MiddleName +" " + this.vars.SuffixName
    this.applicantNo = this.vars.applicantNo
  }

closethis(){
  
       this.dialogRef.close({result:'cancel'});
}

downloadAsPDF() {
    this.visible=false
    var data = document.getElementById('pdfTable');  //Id of the table
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      let imgWidth = 150;   
      let pageHeight = 500;    
      let imgHeight = canvas.height * imgWidth / canvas.width;  
      let heightLeft = imgHeight;  

      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 20;  
      pdf.addImage(contentDataURL, 'PNG', 30, position, imgWidth, imgHeight)  
      pdf.save('USLOnlineRegistration.pdf'); // Generated PDF   
    });  
        
        
  }
}
