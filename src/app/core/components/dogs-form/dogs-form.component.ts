import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Gender, HairType, IDog } from '../../model/dogs.interface';
import { DisableFormControlDirective } from 'src/app/shared/directives/disable-form-control.directive';
import { CustomValidators } from '../../validators/form-validators';
import { FilterArrayByObjectPropertyPipe } from 'src/app/shared/pipes/filter-array-by.pipe';
import { CreateDogForm } from '../../model/create-dog-form.interface';
import { DogsFormMaterialsModule } from './dogs-form-materials.module';

@Component({
  selector: 'app-dogs-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DogsFormMaterialsModule,
    DisableFormControlDirective,
    FilterArrayByObjectPropertyPipe,
  ],
  templateUrl: './dogs-form.component.html',
  styleUrls: ['./dogs-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogsFormComponent implements OnChanges {
  ngOnChanges(): void {
    this.selectedDog ? this.updateForm(this.selectedDog) : null;
  }
  @Output() submit: EventEmitter<IDog> = new EventEmitter<IDog>();
  @Input() dogs: IDog[] = [];
  @Input() selectedDog: IDog | null = null;

  protected isForSale: boolean = false;
  private today: Date = new Date();
  protected form: FormGroup<CreateDogForm> = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    gender: new FormControl<Gender>('male', [Validators.required]),
    dateOfBirth: new FormControl<Date>(this.today, [
      Validators.required,
      CustomValidators.isDate,
    ]),
    hairType: new FormControl<HairType>('hairless', [Validators.required]),
    description: new FormControl<string>('', [Validators.minLength(5)]),
    height: new FormControl<string>('', [
      Validators.minLength(3),
      CustomValidators.isNumber,
    ]),
    isForSale: new FormControl<boolean>(false),
    price: new FormControl<string>({ value: '', disabled: false }, [
      Validators.minLength(2),
      CustomValidators.isNumber,
    ]),
    isForShow: new FormControl<boolean>({ value: false, disabled: false }),
    mother: new FormControl<IDog | string>({ value: 'other', disabled: false }),
    father: new FormControl<IDog | string>({ value: 'other', disabled: false }),
  });

  protected onFormSubmit(event: Event): void {
    event.stopPropagation();
    this.submit.emit(this.getDogWithParentsAndChildren(this.form));
  }

  protected toggleIsForSale(): void {
    this.isForSale = !this.isForSale;
  }

  private getDogWithParentsAndChildren(dog: FormGroup<CreateDogForm>): IDog { // change name
    const { mother, father, ...dogForm } = dog.value;
    return {
      ...dogForm,
      parents: {
        mother: this.form.value.mother || null,
        father: this.form.value.father || null,
      },
      children: []
    } as IDog;
  }

  private updateForm(data: IDog): void {
    this.form.patchValue({
      name: data.name,
      dateOfBirth: new Date(data.dateOfBirth),
      description: data.description,
      gender: data.gender,
      hairType: data.hairType,
      height: data.height,
      isForSale: data.isForSale,
      isForShow: data.isForShow,
      price: data.price,
      father: data.parents?.father,
      mother: data.parents?.mother,
    });
  }
}
