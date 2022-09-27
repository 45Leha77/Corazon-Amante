import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDisableFormControl]',
  standalone: true,
})
export class DisableFormControlDirective {
  @Input() set appDisableFormControl(isDisabled: boolean) {
    const action = isDisabled ? 'disable' : 'enable';
    this.ngControl.control ? this.ngControl.control[action]() : null;
  }

  constructor(private ngControl: NgControl) {}
}
