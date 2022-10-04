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
import { NgImageSliderModule } from 'ng-image-slider';
import { EffectsModule } from '@ngrx/effects';
import { ChildrenSyncEffects } from '../../store/dogs-state/dogs.effects/children-sync.effects';
import { DogsEffects } from '../../store/dogs-state/dogs.effects/CRUD.effects';
import { ImagesEffects } from '../../store/dogs-state/dogs.effects/images.effects';

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
    EffectsModule.forFeature([DogsEffects, ChildrenSyncEffects, ImagesEffects]),
  ],
})
export class AdminModule {}
