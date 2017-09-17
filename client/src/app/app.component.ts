import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ImageUploadService } from './image-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
   filesToUpload: Array<File> = [];
   product = [{
     photo:''
   }];

   userDetails;

   constructor(
     private http: Http,
     private imageUploadService:ImageUploadService) {}


  ngOnInit(){
    
  }

  // getTimeStamp(){
  //   return new Date();
  // }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    let age = new Date();
    console.log(files);
    // formData.append("Name","Hariharan");
    // formData.append("Age",Math.floor((Math.random() * 100) + 1));
    

    for(let i = 0;i<files.length;i++){
      formData.append("Name",files[i].name);
      formData.append("uploads[]", files[i], files[i]['name'])
    }
   // formData.append("uploads[]", files[0], files[0]['name']);
    
    console.log(formData);
   

    this.imageUploadService.uploadImage(formData).subscribe(data => {
      console.log(data);
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(fileInput);
    console.log(fileInput.target.files.length);

    // for(let i=0;i<fileInput.target.files.length;i++){
    //   this.product[i].photo
    // }
    // this.product.photo = fileInput.target.files[0]['name'];
  }

  retrieveUsers(){
    this.imageUploadService.retriveUsers().subscribe(data => {
      this.userDetails = data.message;
    });
  }



}
