import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') IsOpen = false;
  @HostListener('click') toggleDown() {
    this.IsOpen = !this.IsOpen;
  }
}
