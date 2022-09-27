import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IDog } from '../../../model/dogs.interface';
import { select, Store } from '@ngrx/store';
import { createDog } from '../../../store/dogs-state/dogs.actions';
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

  protected onDogsFormSubmit(selectedDog: IDog) {
    this.store.dispatch(createDog({ dog: selectedDog }));
  }

  public onAddImage(file: FileList): void {
    Array.from(file).forEach((el: File) => {
      this.storage.uploadImage(el);
    });
  }

  public onDeleteImage(path: string): void {
    this.storage.deleteImage(path);
  }
}
