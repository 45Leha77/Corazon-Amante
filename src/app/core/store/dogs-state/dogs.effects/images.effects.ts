import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, withLatestFrom } from 'rxjs';
import {
  deleteImage,
  deleteImageFromStorage,
  deleteImageFromStorageSuccess,
  deleteImageSuccess,
  editDog,
  uploadImage,
  uploadImageSuccess,
} from '../dogs.actions';
import { FirebaseStorageService } from 'src/app/core/services/firebase/storage/storage.service';
import { IDog, Image } from '../../../model/dogs.interface';
import { Store } from '@ngrx/store';
import { getDogs } from '../dogs.selector';

@Injectable({ providedIn: 'root' })
export class DogsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly imageStorage: FirebaseStorageService,
    private readonly store: Store
  ) {}

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
