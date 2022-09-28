import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IDog } from '../../../model/dogs.interface';
import { select, Store } from '@ngrx/store';
import { createDog, uploadImage } from '../../../store/dogs-state/dogs.actions';
import { getDogs } from '../../../store/dogs-state/dogs.selector';
import { Observable } from 'rxjs/internal/Observable';
import { FirebaseStorageService } from 'src/app/core/services/firebase/storage/storage.service';
import { FirebaseImage } from 'src/app/core/model/firebase-image.interface';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-create-dog-page',
  templateUrl: './create-dog-page.component.html',
  styleUrls: ['./create-dog-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDogPageComponent {
  public dogs$: Observable<IDog[]> = this.store.pipe(select(getDogs));
  public images$: Observable<FirebaseImage[]> =
    this.storage.getAllImagesURLs() || of([]);

  constructor(private store: Store, private storage: FirebaseStorageService) {}

  public onDeleteImage(path: string): void {
    this.storage.deleteImage(path);
  }

  protected onDogsFormSubmit(selectedDog: IDog): void {
    this.store.dispatch(createDog({ dog: selectedDog }));
    this.uploadDogImages(selectedDog);
  }

  private uploadDogImages(dog: IDog): void { // make shared directive 
    if (!dog.images || dog.images.length < 1) {
      return;
    }
    dog.images.forEach((image: File) => {
      this.store.dispatch(uploadImage({ image, dog }));
    });
  }
}
