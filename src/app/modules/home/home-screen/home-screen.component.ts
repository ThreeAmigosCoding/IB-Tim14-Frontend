import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit{
    public isImageLoaded: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    public onImageLoad(): void {
        this.isImageLoaded = true;
    }
}
