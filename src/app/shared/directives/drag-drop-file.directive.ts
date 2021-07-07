import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dragDropFile]'
})
export class DragDropFileDirective {

  @Output() onFileDropped = new EventEmitter<any>();

  @HostBinding('style.border-color') private borderColor = 'lightgray';
  @HostBinding('style.opacity') private opacity = '1';

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    this.borderColor = '#1C3FAA';
    this.opacity = '0.8';
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    this.borderColor = 'lightgray';
    this.opacity = '1';
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    this.borderColor = 'lightgray';
    this.opacity = '1';
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files);
    }
  }

}
