import { Directive, Input, HostListener, ElementRef, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]',
})

export class DropdownDirective {
    @Input() ("appDropdown") index!: number;

  constructor(private theElementRef: ElementRef, private theRenderer: Renderer2) { }

  @HostListener("click") toggleDrawer() {
    let elements = this.theElementRef.nativeElement.querySelectorAll('.show');

    if (elements.length > 0) {
      this.theRenderer.removeClass(this.theElementRef.nativeElement.children[this.index], "show");
    } else {
      this.theRenderer.addClass(this.theElementRef.nativeElement.children[this.index], "show");
    }
  }

}