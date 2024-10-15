import { jobPosting } from 'src/app/_model/jobPosting.model';
import { JobpostService } from './../../_service/jobpost.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  // Image and text animation data
  imagesAndText: { image: string; text: string }[] = [
    { image: 'assets/photo/offer/call.png', text: 'Call Center Services' },
    { image: 'assets/photo/offer/call-2.png', text: 'Digital Marketing' },
    { image: 'assets/photo/offer/call-3.png', text: 'Skills Development' },
    { image: 'assets/photo/offer/call-4.png', text: 'Creative Design' },
    { image: 'assets/photo/offer/call-5.png', text: 'Back-Office Services' },
    { image: 'assets/photo/offer/call-7.png', text: 'Software Development' },
  ];

  currentImageAndText = this.imagesAndText[0];
  i: number = 0;
  typed: any;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.startAnimationCycle();
  }

  // Synchronize both image and text animation
  startAnimationCycle(): void {
    this.updateTypedText(); // Initialize the first text typing animation
    setInterval(() => {
      this.i = (this.i + 1) % this.imagesAndText.length;
      this.fadeOutTextAndImage(() => {
        this.currentImageAndText = this.imagesAndText[this.i];
        this.updateTypedText(); // Update and animate text with typing effect
      });
    }, 4000); // Change every 4 seconds
  }

  // Smooth fade out and fade in for both text and image changes
  fadeOutTextAndImage(callback: Function): void {
    const textElement = document.getElementById('typed-text');
    const imageElement = document.getElementById('slideImg');

    if (textElement && imageElement) {
      // Add fade-out class to both text and image
      this.renderer.addClass(textElement, 'fade-out');
      this.renderer.addClass(imageElement, 'fade-out');

      setTimeout(() => {
        callback(); // Update text and image after fade out
        this.renderer.removeClass(textElement, 'fade-out');
        this.renderer.addClass(textElement, 'fade-in');
        
        this.renderer.removeClass(imageElement, 'fade-out');
        this.renderer.addClass(imageElement, 'fade-in');
        
        // Remove fade-in class after animation completes
        setTimeout(() => {
          this.renderer.removeClass(textElement, 'fade-in');
          this.renderer.removeClass(imageElement, 'fade-in');
        }, 500); // 500ms for fade-in duration
      }, 500); // Wait for fade out to complete (500ms)
    }
  }

  // Reinitialize Typed.js for typing animation when text changes
  updateTypedText(): void {
    if (this.typed) {
      this.typed.destroy(); // Destroy previous instance before creating a new one
    }

    const options = {
      strings: [this.currentImageAndText.text],
      typeSpeed: 60,
      backSpeed: 20,
      showCursor: false,
    };

    this.typed = new Typed('#typed-text', options);
  }

























// constructor(private JobPostSer : JobpostService){}


// ngOnInit(){
//   // this.getAllJobs();
// };


//array 
// jobDetails = [];


// public getAllJobs() {

//   this.JobPostSer.getAllJobs().subscribe(
//     (response: jobPosting[]) => {
//       console.log(response);

//       this.jobDetails = response;

//     }, (error: HttpErrorResponse) => { console.log(error); }


//   );
// }


}
