export interface globalBpoModel{

    id: number;
    title: string;
    subtitle: string;
    postDate: string; // or Date depending on your handling
    details: string;
    images: ImageGB[];
    thumbnailImage: string;  // New thumbnail field to hold the base64 image data

} 


interface ImageGB {
    img: string; // or any appropriate type depending on your image handling
    // img: Uint8Array; // Change to Uint8Array if you're treating it as byte data
    caption: string;
  }
  