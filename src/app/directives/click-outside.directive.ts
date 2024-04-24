import { Directive, ElementRef, EventEmitter, HostListener, input, Input, Output, signal } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class 
ClickOutsideDirective {

    @Output() clickOutside = new EventEmitter<Event>();
     disabled = input(true);
  
    constructor(private elementRef: ElementRef) { }
  
    @HostListener('document:click', ['$event'])
    public onDocumentClick(event: MouseEvent): void {
      if (this.disabled()) {
        return;
      }
      const targetElement = event.target as HTMLElement;
      // Check if the click was outside the element
      if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
        this.clickOutside.emit(event);
      }
    }
}
