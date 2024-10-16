import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { photoUploadModel } from 'src/app/_model/photoUpload.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoUploadService {

  constructor(private httpClient: HttpClient) {}



  // get/show 
  public getAllGallery() {
    return this.httpClient.get<photoUploadModel[]>(
      'http://localhost:8080/api/admin/getAllGallery'
    );
  }

  //delete 
  public deleteGallery(id: number) {
    return this.httpClient.delete(
      `http://localhost:8080/api/admin/deleteGallery/${id}`
    );
    // return this.httpClient.delete("http://localhost:8080/api/admin/deleteGallery/"+id);
  }




  
  // edit 
  public getGalleryById(id) {
    return this.httpClient.get<photoUploadModel>(
      `http://localhost:8080/api/getGalleryById/${id}`
    );
    // return this.httpClient.get<photoUploadModel>("http://localhost:8080/api/getGalleryById/"+id));
  }





  private uploadUrl = 'http://localhost:8080/api/admin/upload';  // Backend URL
  private apiUrl = 'http://localhost:8080/api/admin/upload';  // Backend URL




  // Method to upload gallery with images-----------------previous
  //  uploadGallery(
  //   title: string,
  //   subtitle: string,
  //   details: string,
  //   captions: string[],
  //   images: File[]
  // ): Observable<any> {

  //   const formData: FormData = new FormData();

  //   // Append fields to FormData
  //   formData.append('title', title);
  //   formData.append('subtitle', subtitle);
  //   formData.append('details', details);

  //   captions.forEach(caption => {
  //     formData.append('captions', caption);
  //   });

  //   // Append multiple images
  //   for (let i = 0; i < images.length; i++) {
  //     formData.append('images', images[i]);
  //   }

  //   // Send POST request to backend
  //   return this.httpClient.post(this.uploadUrl, formData);
  // }






  uploadGallery(data: FormData): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/admin/upload', data, {
      headers: {
        // Note: Do not set 'Content-Type' header here, Angular will automatically set it for FormData
      },
    });
  }
  








  // testing -------------

  // Create gallery with form data
  public cretaGallery(photoUpMod: photoUploadModel): Observable<any> {
    const formData = new FormData();

    // Append text fields
    formData.append('title', photoUpMod.title);
    formData.append('subtitle', photoUpMod.subtitle);
    formData.append('details', photoUpMod.details);
    formData.append('captions', JSON.stringify(photoUpMod.captions)); // Converting captions array to a JSON string

    // Append images
    for (let i = 0; i < photoUpMod.images.length; i++) {
      formData.append('images', photoUpMod.images[i], photoUpMod.images[i].name);
    }

    // Post the form data to the server
    return this.httpClient.post(this.apiUrl, formData, {
      headers: {
        // Let Angular set the Content-Type for FormData
      },
    });
  }

  
}
