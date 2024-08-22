import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Hls from 'hls.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    this.loadHls();
  }

  private loadHls(): void {
    const video = this.videoPlayer.nativeElement;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource('https://localhost:7186/Videos/index.m3u8'); // Replace with your HLS stream URL
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = 'https://localhost:7186/index.m3u8'; // Replace with your HLS stream URL
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    } else {
      console.error('HLS is not supported in this browser.');
    }
  }}
