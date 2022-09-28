import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { deleteDog, loadDogs } from '../../store/dogs-state/dogs.actions';
import { getDogs } from '../../store/dogs-state/dogs.selector';
import { map, Observable } from 'rxjs';
import { IDog } from '../../model/dogs.interface';
import { FirebaseStorageService } from '../../services/firebase/storage/storage.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageComponent implements OnInit {
  protected dogs$: Observable<IDog[]> = this.store.pipe(select(getDogs)).pipe(
    map((dogs: IDog[]) => {
      return dogs.map((dog: IDog) => {
        const updatedDog: IDog = {
          ...dog,
          imagesRef: dog.imagesPaths?.map((path: string) =>
            this.imageStorage.getImageURLByPath(path)
          ),
        };
        return updatedDog;
      });
    })
  );
  constructor(
    private store: Store,
    public imageStorage: FirebaseStorageService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadDogs());
  }

  protected onDelete(id: string): void {
    //maybe add popup with approval
    this.store.dispatch(deleteDog({ id }));
  }
}
