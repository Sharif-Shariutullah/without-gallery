import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface photoUploadModel {
  id: number;
  title: string;
  subtitle: string;
  postDate: string; // or Date depending on your handling
  details: string;
  images: ImageGallery[];
  thumbnailImage: string; // New thumbnail field to hold the base64 image data
}

interface ImageGallery {
  img: string; // or any appropriate type depending on your image handling
  // img: Uint8Array; // Change to Uint8Array if you're treating it as byte data
  caption: string;
}

@Injectable({
  providedIn: 'root',
})
export class PhotoUploadService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:8080/api/admin'; // Adjust base URL if needed

  uploadGallery(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/createGallery`, formData);
  }

  getAllGallery(): Observable<photoUploadModel[]> {
    return this.http.get<photoUploadModel[]>(`${this.baseUrl}/getAllGallery`)
      .pipe(
        catchError(this.handleError) // Handle any errors here
      );
  }

  private handleError(error: HttpErrorResponse) {
    // Log the error or display a user-friendly message
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }

  deleteGallery(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteGallery/${id}`);
  }

  // edit
  public getGalleryById(id: number): Observable<photoUploadModel> {
    return this.http.get<photoUploadModel>(
      `http://localhost:8080/api/admin/getGalleryById/${id}`
    );
    // return this.httpClient.get<globalBpoModel>("http://localhost:8080/api/getGlobalBPOById/"+id));
  }
}
