import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
@Injectable()
export class ImageUploadService {

  constructor(
    private http:Http
  ) { }

  uploadImage(formData){
    console.log(formData);
    return this.http.post('http://localhost:3000/upload',formData)
                .map(files => files.json())
  }

  retriveUsers(){
    return this.http.get('http://localhost:3000/getDetails').map(files => files.json());
  }

  // getImage(imagePath){
  //   console.log(imagePath);
  //   return this.http.get('http://localhost:3000/uploads/'+imagePath)
  // }
}
