import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  deleteDog,
  deleteImage,
  deleteImageFromStorage,
  loadDogs,
} from '../../store/dogs-state/dogs.actions';
import { getDogs } from '../../store/dogs-state/dogs.selector';
import { Observable } from 'rxjs';
import { IDog, Image } from '../../model/dogs.interface';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageComponent implements OnInit {
  protected dogs$: Observable<IDog[]> = this.store.pipe(select(getDogs));
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadDogs());
  }

  protected onDogDelete(dog: IDog): void {
    //maybe add popup with approval
    dog.images ? this.deleteDogsImagesFromStorage(dog) : null;
    this.store.dispatch(deleteDog({ dog }));
  }

  protected onImageDelete(image: Image) {
    this.store.dispatch(deleteImage({ image }));
  }

  private deleteDogsImagesFromStorage(dog: IDog): void {
    dog.images.forEach((image: Image) => {
      this.store.dispatch(deleteImageFromStorage({ image }));
    });
  }
}
