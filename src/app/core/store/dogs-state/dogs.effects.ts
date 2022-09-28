import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, of, withLatestFrom } from 'rxjs';
import {
  createDog,
  createDogSuccess,
  deleteDog,
  deleteDogSuccess,
  dummyAction,
  editDog,
  editDogSuccess,
  loadDogs,
  loadDogsSuccess,
  noParentsToUpdate,
  updateDogsChildren,
  updateDogsChildrenSuccess,
  uploadImage,
  uploadImageSuccess,
} from './dogs.actions';
import { FirebaseDogsService } from '../../services/firebase/realtime-db/http.service';
import { FirebaseStorageService } from 'src/app/core/services/firebase/storage/storage.service';
import { IDog } from '../../model/dogs.interface';
import { select, Store } from '@ngrx/store';
import { getDogs } from './dogs.selector';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({ providedIn: 'root' })
export class DogsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly httpService: FirebaseDogsService,
    private readonly imageStorage: FirebaseStorageService,
    private readonly store: Store
  ) {}

  public loadDogs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadDogs),
      withLatestFrom(this.store.pipe(select(getDogs))),
      mergeMap(([action, dogs]) => {
        if (dogs.length < 2) {
          return this.httpService.getDogs().pipe(
            map((dogs: IDog[]) => {
              return loadDogsSuccess({ dogs });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });

  public createDog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createDog),
      withLatestFrom(this.store.pipe(select(getDogs))),
      mergeMap(([action, dogs]) => {
        return this.httpService.createDog(action.dog).pipe(
          map((response) => {
            const createdDog: IDog = {
              ...action.dog,
              id: response.name,
            };
            return createDogSuccess({ dog: createdDog });
          })
        );
      })
    );
  });

  public editDog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editDog),
      mergeMap((action) => {
        return this.httpService.editDog(action.dog).pipe(
          map(() => {
            return editDogSuccess({ dog: action.dog });
          })
        );
      })
    );
  });

  public deleteDog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteDog),
      mergeMap((action) => {
        return this.httpService.deleteDog(action.id).pipe(
          map(() => {
            return deleteDogSuccess({ id: action.id });
          })
        );
      })
    );
  });

  public updateDogsChildren$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateDogsChildren),
      mergeMap((action) => {
        return this.httpService.editDog(action.dog).pipe(
          map(() => {
            return updateDogsChildrenSuccess({ dog: action.dog });
          })
        );
      })
    );
  });

  public addDogToFather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...[createDogSuccess, editDogSuccess]),
      withLatestFrom(this.store.select(getDogs)),
      mergeMap(([action, dogs]) => {
        if (action.dog.parents.father === 'other') {
          return of(noParentsToUpdate());
        }
        return this.httpService.editDog(action.dog).pipe(
          map(() => {
            const parent = this.findFather(dogs, action.dog);
            return updateDogsChildren({
              dog: this.updateChildrenInDog(action.dog, parent),
            });
          })
        );
      })
    );
  });

  public addDogToMother$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...[createDogSuccess, editDogSuccess]),
      withLatestFrom(this.store.select(getDogs)),
      mergeMap(([action, dogs]) => {
        if (action.dog.parents.mother === 'other') {
          return of(noParentsToUpdate());
        }
        return this.httpService.editDog(action.dog).pipe(
          map(() => {
            const parent = this.findMother(dogs, action.dog);
            return updateDogsChildren({
              dog: this.updateChildrenInDog(action.dog, parent),
            });
          })
        );
      })
    );
  });

  public uploadImages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(uploadImage),
      mergeMap((action) => {
        return this.imageStorage
          .uploadImage(action.image, action.dog.name)
          .pipe(
            map(() => {
              return uploadImageSuccess();
            })
          );
      })
    );
  });

  private updateChildrenInDog(selectedDog: IDog, parent: IDog): IDog {
    if (parent.children) {
      return {
        ...parent,
        children: [...parent.children, selectedDog.id as string],
      };
    } else {
      return {
        ...parent,
        children: [selectedDog.id!],
      };
    }
  }

  private findFather(allDogs: IDog[], selectedDog: IDog): IDog {
    return allDogs.find((dog) => dog.id === selectedDog.parents.father) as IDog;
  }

  private findMother(allDogs: IDog[], selectedDog: IDog): IDog {
    return allDogs.find((dog) => dog.id === selectedDog.parents.mother) as IDog;
  }
}
