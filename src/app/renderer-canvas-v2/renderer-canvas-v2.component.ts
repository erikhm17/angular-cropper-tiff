import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import Cropper from "cropperjs";
import Tiff from "tiff.js";

// declare var Tiff: any;

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
  public cropperOptions: Cropper.Options<HTMLCanvasElement> = {
    autoCrop: true,
    movable: false,
    zoomable: true,
    rotatable: true,
    scalable: false,
    center: true,
    responsive: false,
    background: true,
    modal: true,
    dragMode: 'crop', // as any,
    ready(event: Cropper.ReadyEvent<HTMLCanvasElement>) {
      console.log("is ready === ",event)
    }
  }
  constructor() {
    this.imageDestination = "";
  }

  public ngAfterViewInit() {
    let imageSource = '../../assets/images/10.TIFF';

    let onDoCrop = document.getElementById('onDoCrop');
    let onStartCrop = document.getElementById('onStartCrop');
    let onRotateLeft = document.getElementById('onRotateLeft');
    let onRotateRight = document.getElementById('onRotateRight');
    let onCancel = document.getElementById('onCancel');
    let onStop = document.getElementById('onStop ');
    let onBox = document.getElementById('onBox ');



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
    //xhr.open('GET', imageSource);
    xhr.open('GET', 'https://blobemstest.blob.core.windows.net/ems-storage/voter-documents/335/Signature-637891200253411978.tif');
    xhr.onload = (e) => {
      const tiff = new Tiff({buffer: xhr.response});

      const canvas = tiff.toCanvas() as HTMLCanvasElement;
      container.append(canvas); // beautify!
      // canvas.width = 100;
      // canvas.height = 100;
      this.cropper = new Cropper(canvas, this.cropperOptions);
    };
    xhr.send();

    onDoCrop.onclick = () => {
      result.innerHTML = '';
      let canvasResult : HTMLCanvasElement= this.cropper.getCroppedCanvas();
      // canvasResult.width = 2000;
      // canvasResult.height = 2000;
      result.appendChild(canvasResult);
      console.log("canvasResult",canvasResult)
    };
    onStartCrop.onclick = () =>{
        this.cropperOptions.autoCrop = true;
        this.cropper.reset()
    }
    onRotateLeft.onclick = () =>{
      this.cropper.rotate(-90)
    }
    onRotateRight.onclick = () =>{
      this.cropper.rotate(90)
    }
    onCancel.onclick = () =>{
      this.cropper.clear()
    }
    onStop.onclick = () =>{
      this.cropper.destroy()
    }
    onBox.onclick = () =>{
      var canvasData = this.cropper.getCanvasData();
      this.cropper.setCropBoxData({
        left: 20,
        top: 20,
        width: 20,
        height: 20
      });


    }
  }

  public ngOnInit() {
  }
}

