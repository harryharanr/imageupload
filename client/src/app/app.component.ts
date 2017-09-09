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
   product = {
     photo:''
   };

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
    formData.append("Name","Hariharan");
    formData.append("Age",Number(age));
    formData.append("uploads[]", files[0], files[0]['name']);
    
    console.log(formData);
    // this.http.post('http://localhost:3000/upload', formData)
    //   .map(files => files.json())
    //   .subscribe(files => console.log('files', files))

    this.imageUploadService.uploadImage(formData).subscribe(data => {
      console.log(data);
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.product.photo = fileInput.target.files[0]['name'];
  }

  retrieveUsers(){
    this.imageUploadService.retriveUsers().subscribe(data => {
      this.userDetails = data.message;
    });
  }

  // getImage(imagePath){
  //   return this.imageUploadService.getImage(imagePath);
  // }

}
