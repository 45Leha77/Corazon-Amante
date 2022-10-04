import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import {
  createDog,
  createDogSuccess,
  deleteDog,
  deleteDogSuccess,
  noContentReload,
  editDog,
  editDogSuccess,
  loadDogs,
  loadDogsSuccess,
} from '../dogs.actions';
import { FirebaseDogsService } from '../../../services/firebase/realtime-db/http.service';
import { IDog } from '../../../model/dogs.interface';
import { select, Store } from '@ngrx/store';
import { getDogs } from '../dogs.selector';
import { DogModificationService } from './modification.service';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class DogsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly httpService: FirebaseDogsService,
    private readonly store: Store,
    private readonly dogModification: DogModificationService,
    private readonly router: Router,
    private readonly notification: NotificationService
  ) {}

  public loadDogs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadDogs),
      withLatestFrom(this.store.pipe(select(getDogs))),
      mergeMap(([action, dogs]) => {
        if (dogs.length > 1) {
          return of(noContentReload());
        }
        return this.httpService.getDogs().pipe(
          this.dogModification.getDataAsArray(),
          this.dogModification.updateDogWithImgRef(),
          map((dogs: IDog[]) => {
            return loadDogsSuccess({ dogs });
          })
        );
      })
    );
  });

  public createDog$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createDog),
      withLatestFrom(this.store.pipe(select(getDogs))),
      mergeMap(([action, dogs]) => {
        return this.httpService.createDog(action.dog).pipe(
          this.notification.notifyCreation(action.dog),
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
          this.notification.notifyEditing(action.dog),
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
          this.notification.notifyDeleting(action.dog),
          map(() => {
            return deleteDogSuccess({ dog: action.dog });
          })
        );
      })
    );
  });

  public dogEditCreateRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[createDogSuccess, editDogSuccess]),
        tap((action) => {
          this.router.navigate(['../admin']);
        })
      );
    },
    { dispatch: false }
  );
}
