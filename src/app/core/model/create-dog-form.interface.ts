import { FormArray, FormControl } from '@angular/forms';
import { Gender, HairType, IDog } from './dogs.interface';

export interface CreateDogForm {
  name: FormControl<string | null>;
  gender: FormControl<Gender | null>;
  dateOfBirth: FormControl<Date | null>;
  hairType: FormControl<HairType | null>;
  description: FormControl<string | null>;
  height: FormControl<string | null>;
  isForSale: FormControl<boolean | null>;
  price: FormControl<string | null>;
  isForShow: FormControl<boolean | null>;
  mother: FormControl<string | IDog | null>;
  father: FormControl<string | IDog | null>;
  images: FormControl<any>;
}
