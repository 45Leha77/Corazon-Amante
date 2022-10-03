import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDog, Image } from 'src/app/core/model/dogs.interface';
import { getDogs } from 'src/app/core/store/dogs-state/dogs.selector';
import {
  Observable,
  map,
  withLatestFrom,
  concatMap,
  of,
  tap,
  OperatorFunction,
} from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  editDog,
  loadDogs,
  uploadImage,
} from 'src/app/core/store/dogs-state/dogs.actions';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent implements OnInit {
  protected dogs$: Observable<IDog[]> = this.store.pipe(select(getDogs));
  protected selectedDog$: Observable<IDog> = this.dogs$.pipe(
    this.getIdFromRouter(),
    concatMap(([dogs, id]) => {
      const dog: IDog | undefined = dogs.find((dog: IDog) => dog.id === id);
      this.selectedDog = dog || null;
      return of(dog as IDog);
    })
  );
  private selectedDog: IDog | null = null;
  constructor(private store: Store, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.store.dispatch(loadDogs());
  }

  protected onDogsFormSubmit(dog: IDog): void {
    const dogWithId: IDog = {
      ...dog,
      id: this.selectedDog?.id as string,
      children: this.selectedDog?.children as string[],
    };
    this.store.dispatch(editDog({ dog: dogWithId }));
    this.uploadDogImages(dogWithId);
  }

  private uploadDogImages(dog: IDog): void {
    if (!dog.images || dog.images.length < 1) {
      return;
    }
    dog.images.forEach((image: Image) => {
      this.store.dispatch(uploadImage({ image: image, dog }));
    });
  }

  private getIdFromRouter(): OperatorFunction<IDog[], [IDog[], string]> {
    return withLatestFrom(
      this.route.queryParamMap.pipe(
        map((params: ParamMap): string => {
          return params.get('id')!;
        })
      )
    );
  }
}
