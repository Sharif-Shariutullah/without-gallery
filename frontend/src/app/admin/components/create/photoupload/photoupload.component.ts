import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { photoUploadModel } from 'src/app/_model/photoUpload.model';
import { PhotoUploadService } from 'src/app/_service/photoUpload/photo-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-photoupload',
  templateUrl: './photoupload.component.html',
  styleUrls: ['./photoupload.component.scss'],
})
export class PhotouploadComponent {
  @ViewChild('galleryForm') galleryForm!: NgForm; // Reference the form template

  constructor(
    private router: Router,
    private serviceClass: PhotoUploadService
  ) {}

  title: string = '';
  subtitle: string = '';
  details: string = '';
  captions: string[] = [];
  images: File[] = [];
  imagePreviews: string[] = []; // To store the image preview URLs

  uploadGallery(): void {
    const formData = new FormData();

    // Append non-file fields
    formData.append('title', this.title);
    formData.append('subtitle', this.subtitle);
    formData.append('details', this.details);
    formData.append('captions', JSON.stringify(this.captions)); // Convert array to string

    // Append images
    for (let i = 0; i < this.images.length; i++) {
      formData.append('images', this.images[i], this.images[i].name);
    }

    this.serviceClass.uploadGallery(formData).subscribe(
      (response) => {
        console.log('Gallery uploaded successfully:', response);

        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Photo Upload Successfully',
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          // Reset form fields and form state
          this.galleryForm.reset(); // This resets the form
          this.galleryForm.resetForm(); // Reset the form validation state if needed

          // Clear other component properties
          this.captions = [];
          this.images = [];
          this.imagePreviews = [];

          location.reload();
        });
      },
      (error) => {
        console.error('Error uploading gallery:', error);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );
  }

  onCaptionsChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Cast to HTMLInputElement
    this.captions = inputElement.value.split(',');
  }

  // _______________________FRONTEND______________________-

  // drag and drop

  dragging: boolean = false;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragging = true;
  }

  onDragLeave(event: DragEvent) {
    this.dragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;

    if (event.dataTransfer?.files) {
      this.images = Array.from(event.dataTransfer.files);

      // Preview the images
      this.imagePreviews = [];
      for (let i = 0; i < this.images.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(this.images[i]);
      }
    }
  }

  // Method to remove selected image
  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
    this.images.splice(index, 1);
  }

  // Method to handle file selection and generate previews
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.images = event.target.files;
      this.imagePreviews = []; // Clear previous previews

      // Loop through the selected files
      for (let i = 0; i < this.images.length; i++) {
        const reader = new FileReader();

        // Closure to capture the file information
        reader.onload = (e: any) => {
          // Push the file's data URL (base64-encoded image) to previews array
          this.imagePreviews.push(e.target.result);
        };

        // Read the file as a Data URL (base64 encoded string)
        reader.readAsDataURL(this.images[i]);
      }
    }
  }
}
