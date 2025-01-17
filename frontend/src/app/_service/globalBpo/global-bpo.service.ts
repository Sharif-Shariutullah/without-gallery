import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { globalBpoModel } from 'src/app/_model/globalBpo.model';


// Model of ImageGB

interface ImageGB {
  img: string; // or any appropriate type depending on your image handling
  // img: Uint8Array; // Change to Uint8Array if you're treating it as byte data
  caption: string;

}

// Model of GlobalBPO


interface GlobalBPO {
  id: number;
  title: string;
  subtitle: string;
  postDate: string; // or Date depending on your handling
  details: string;
  images: ImageGB[];
  thumbnailImage: string;  // New thumbnail field to hold the base64 image data

}


@Injectable({
  providedIn: 'root'
})
export class GlobalBpoService {


  
  private baseUrl = 'http://localhost:8080/api/admin'; // Adjust base URL if needed

  constructor(private http: HttpClient) {}




  createGlobalBPO(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/createGlobalBPO`, formData);
  }

  // getAllGlobalBPOs(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/getAllGlobalBPOs`);
  // }


  getAllGlobalBPOs(): Observable<GlobalBPO[]> {
    return this.http.get<GlobalBPO[]>(`${this.baseUrl}/getAllGlobalBPOs`).pipe(
      catchError(this.handleError) // Handle any errors here
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Log the error or display a user-friendly message
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }



  deleteGlobalBPO(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteGlobalBPO/${id}`);
  }


    // edit 
  public getGlobalBPOById(id: number) : Observable<globalBpoModel> {
    return this.http.get<globalBpoModel>(
      `http://localhost:8080/api/admin/getGlobalBPOById/${id}`
    );
    // return this.httpClient.get<globalBpoModel>("http://localhost:8080/api/getGlobalBPOById/"+id));
  }

}

