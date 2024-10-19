import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FileEntity } from 'src/app/_model/FileEntity.model';
import { photoUploadModel } from 'src/app/_model/photoUpload.model';
import { FileUploadService } from 'src/app/_service/file-upload.service';
import { PhotoUploadService } from 'src/app/_service/photoUpload/photo-upload.service';
import { PracticeService } from 'src/app/Practice/service/practice.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  // frontend ----------------------------------------

  routingViewPage() {
    // this.route.navigateByUrl('gallery-view');
  }

  constructor(private service: PhotoUploadService, private router: Router) {}

  // --------------------------frontend -------------------

  isModalOpen = false;
  currentImage: string;

  // Method to open the modal with the clicked image
  openModal(imageSrc: string): void {
    this.currentImage = imageSrc;
    this.isModalOpen = true;
  }

  // Method to close the modal
  closeModal(): void {
    this.isModalOpen = false;
    this.currentImage = '';
  }

  // --------------------------Backend -------------------

  gallery: photoUploadModel[] = [];
  errorMessage: string | null = null; // To hold any error messages

  ngOnInit(): void {
    this.getAllGallery();
  }

  getAllGallery() {
    this.service.getAllGallery().subscribe({
      next: (data) => {
        this.gallery = data;
        this.handleImageData(); // Call to handle image data conversion
        this.handleImageDataThumbnail();
      },
      error: (error) => {
        this.errorMessage = error; // Capture error for display
      },
    });
  }

  private handleImageDataThumbnail() {
    this.gallery.forEach((gallery) => {
      // Assuming the thumbnailImage is in a base64 format or needs conversion
      gallery.thumbnailImage = 'data:image/jpeg;base64,' + gallery.thumbnailImage;
    });
  }

  private handleImageData() {
    this.gallery.forEach((gallery) => {
      gallery.images.forEach((image) => {
        // If your backend returns base64 directly, use it directly
        image.img = 'data:image/jpeg;base64,' + image.img; // Make sure to prepend the correct data URI scheme
      });
    });
  }

  // Helper function to convert Uint8Array to base64
  private arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    const len = buffer.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(buffer[i]);
    }
    return window.btoa(binary); // Convert binary string to base64
  }



  // call the details page
  getGalleryById(id: number) {
    this.router.navigate(['/gallery-view', id]);
  }
}
