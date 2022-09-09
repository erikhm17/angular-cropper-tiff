import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RendererCanvasV2Component } from './renderer-canvas-v2/renderer-canvas-v2.component';

@NgModule({
  declarations: [
    AppComponent,
    RendererCanvasV2Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
