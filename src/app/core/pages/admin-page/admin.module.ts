import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { AdminPageComponent } from './admin-page.component';
import { DogsFormComponent } from '../../components/dogs-form/dogs-form.component';
import { CreateDogPageComponent } from './create-dog-page/create-dog-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ImagesHandlerComponent } from '../../components/images-handler/images-handler.component';

@NgModule({
  declarations: [AdminPageComponent, CreateDogPageComponent, EditPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    MatCardModule,
    LetModule,
    MatButtonModule,
    DogsFormComponent,
    ImagesHandlerComponent,
  ],
})
export class AdminModule {}
