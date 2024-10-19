export interface photoUploadModel{

 
    id: number;
    title: string;
    subtitle: string;
    postDate: string; // or Date depending on your handling
    details: string;
    images: ImageGallery[];
    thumbnailImage: string;  // New thumbnail field to hold the base64 image data

} 

interface ImageGallery {
    img: string; // or any appropriate type depending on your image handling
    // img: Uint8Array; // Change to Uint8Array if you're treating it as byte data
    caption: string;
  }