import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { CreateDogPageComponent } from './create-dog-page/create-dog-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';

const adminRoutes: Routes = [
  { path: '', component: AdminPageComponent },
  {
    path: 'create',
    component: CreateDogPageComponent,
    title: 'Creating dog',
  },
  {
    path: 'edit',
    component: EditPageComponent,
    title: 'Editing dog',
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
