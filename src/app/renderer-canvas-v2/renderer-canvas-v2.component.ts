import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import Cropper from "cropperjs";
declare var Tiff: any;

@Component({
  selector: 'app-renderer-canvas-v2',
  templateUrl: './renderer-canvas-v2.component.html',
  styleUrls: ['./renderer-canvas-v2.component.css']
})
export class RendererCanvasV2Component implements OnInit, AfterViewInit {

  @ViewChild("canvasRef") canvasRef: HTMLCanvasElement;

  @ViewChild("image", {static: false})
  public imageElement: ElementRef;

  @Input("src")
  public imageSource: string;

  public imageDestination: string;
  private cropper: Cropper;

  constructor() {
    this.imageDestination = "";
  }

  public ngAfterViewInit() {
    let imageSource = '../../assets/images/10.TIFF';

    let button = document.getElementById('button');
    let width = 400;
    let height = 250;
    let result = document.getElementById('result');
    let container = document.getElementById('img-container');

    // let canvas = document.getElementById("canvasContainer") as HTMLCanvasElement;
    let canvas = this.canvasRef;

    canvas.width = width;
    canvas.height = height;

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer';
    xhr.open('GET', imageSource);
    // xhr.open('GET', 'https://blobemstest.blob.core.windows.net/ems-storage/voter-documents/335/Signature-637891200253411978.tif');
    xhr.onload = (e) => {
      const tiff = new Tiff({buffer: xhr.response});
      const canvas = tiff.toCanvas() as HTMLCanvasElement;
      container.append(canvas); // beautify!
      // canvas.width = 100;
      // canvas.height = 100;

      this.cropper = new Cropper(canvas, {
        movable: false,
        zoomable: true,
        rotatable: false,
        scalable: false,
        center:true,
        responsive: false,
        background: true,
        modal:true,
        dragMode: 'crop', // as any

      });
    };
    xhr.send();

    button.onclick = () => {
      result.innerHTML = '';

      let canvasResult : HTMLCanvasElement= this.cropper.getCroppedCanvas();
      // canvasResult.width = 2000;
      // canvasResult.height = 2000;
      result.appendChild(canvasResult);
    };
  }

  public ngOnInit() {
  }
}

