import { Directive, Input, HostListener, ElementRef, Renderer2, HostBinding } from "@angular/core";

@Directive({
    selector: '[appDropdown]',
})

export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') openMenu(){
    this.isOpen = !this.isOpen;
  }
}