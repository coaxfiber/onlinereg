import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { GlobalService } from './../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import { ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
    provinces
	towncity
	barangay

	prov=''
	town=''
	bar=''
	bara=''
 constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<InfoComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private global: GlobalService,private http: Http) { 
    this.http.get(this.global.api+'PublicAPI/Provinces',this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	   this.provinces = res
	  },Error=>{
	    this.global.swalAlertError(Error);
	  });
  } gettowncity(province){
	this.town = '';
	this.bar= '';
	this.http.get(this.global.api+'PublicAPI/TownsCities/'+province,this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	   this.towncity = res
	  },Error=>{
	    this.global.swalAlertError(Error);
	  });
  }

  getbarangay(province,town){
	this.bar = '';
	this.http.get(this.global.api+'PublicAPI/Barangays/'+province+'/'+town,this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	   this.barangay = res
	  },Error=>{
	    this.global.swalAlertError(Error);
	  });
  }


  onNoClick(): void {
  	var x='';
  	if (this.prov=='')
  		x=x+"*Province is required!\n"
  	if (this.town=='')
  		x=x+"*Town/City is required!\n"
  	if (this.bar=='')
  		x=x+"*Barangay is required!"

  	if (x=='') {
      var bar
      for (var i = 0; i < this.barangay.length; ++i) {
        if (this.bar == this.barangay[i].barangay) {
          bar = this.barangay[i].psgc
        }
        // code...
      }
      //console.log({result:this.bar +", "+ this.town+", "+this.prov,data:bar})
       this.dialogRef.close({result:this.bar +", "+ this.town+", "+this.prov,data:bar});
  	}else{
  		alert(x)
  	}

  }
  onNoClickclose(): void {
       this.dialogRef.close({result:'cancel',data:this.bar});
  }
  see(z){
  	this.bara = z;
  }
  ngOnInit() {
  }
  check(x){
    console.log(x)
  }

}
