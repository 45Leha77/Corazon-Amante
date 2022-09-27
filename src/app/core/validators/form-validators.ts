import { AbstractControl, ValidationErrors } from '@angular/forms';

export const CustomValidators = {
  isNumber: (control: AbstractControl): ValidationErrors | null => {
    if (isNaN(control.value)) {
      return { isNotNumber: true };
    }
    return null;
  },

  isDate: (control: AbstractControl): ValidationErrors | null => {
    if (control.value instanceof Date) {
      return null;
    }
    return { isNotDate: true };
  },
};
