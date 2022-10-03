import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, of, withLatestFrom } from 'rxjs';
import {
  createDog,
  createDogSuccess,
  deleteDog,
  deleteDogSuccess,
  deleteImage,
  deleteImageFromStorage,
  deleteImageFromStorageSuccess,
  deleteImageSuccess,
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
import { IDog, Image } from '../../model/dogs.interface';
import { select, Store } from '@ngrx/store';
import { getDogs } from './dogs.selector';
import { DogModificationService } from './dog-modification.service';

@Injectable({ providedIn: 'root' })
export class DogsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly httpService: FirebaseDogsService,
    private readonly imageStorage: FirebaseStorageService,
    private readonly store: Store,
    private readonly dogModification: DogModificationService
  ) {}

  public loadDogs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadDogs),
      withLatestFrom(this.store.pipe(select(getDogs))),
      mergeMap(([action, dogs]) => {
        if (dogs.length < 2) {
          return this.httpService.getDogs().pipe(
            this.dogModification.getDataAsArray(),
            this.dogModification.updateDogWithImgRef(),
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
        return this.httpService.deleteDog(action.dog.id).pipe(
          map(() => {
            return deleteDogSuccess({ dog: action.dog });
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
            const parent = this.dogModification.findFather(dogs, action.dog);
            return updateDogsChildren({
              dog: this.dogModification.updateChildrenInDog(action.dog, parent),
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
            const parent = this.dogModification.findMother(dogs, action.dog);
            return updateDogsChildren({
              dog: this.dogModification.updateChildrenInDog(action.dog, parent),
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
          .uploadImage(action.image.imageFile, action.dog.name)
          .pipe(
            map(() => {
              return uploadImageSuccess({
                dog: action.dog,
                image: action.image,
              });
            })
          );
      })
    );
  });

  public deleteImage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteImage),
      mergeMap((action) => {
        return this.imageStorage.deleteImage(action.image.path).pipe(
          map(() => {
            return deleteImageSuccess({ image: action.image });
          })
        );
      })
    );
  });

  public deleteImageRefFromDog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteImageSuccess),
      withLatestFrom(this.store.select(getDogs)),
      map(([action, dogs]) => {
        let updatedDog: IDog = dogs.find((dog: IDog) =>
          dog.images?.some((image) => image.path === action.image.path)
        ) as IDog;
        updatedDog = {
          ...updatedDog,
          images: updatedDog.images?.filter(
            (image: Image) => image.path !== action.image.path
          ),
        };
        return editDog({ dog: updatedDog });
      })
    );
  });

  public deleteImageFromStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteImageFromStorage),
      mergeMap((action) => {
        return this.imageStorage.deleteImage(action.image.path).pipe(
          map(() => {
            return deleteImageFromStorageSuccess();
          })
        );
      })
    );
  });
}
