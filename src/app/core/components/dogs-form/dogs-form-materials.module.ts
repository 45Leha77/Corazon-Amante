import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { NgxMatFileInputModule } from '@angular-material-components/file-input';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatFileInputModule,
  ],
  exports: [
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatFileInputModule,
  ],
  declarations: [],
  providers: [],
})
export class DogsFormMaterialsModule {}
