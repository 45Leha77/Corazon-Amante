import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, withLatestFrom } from 'rxjs';
import {
  createDogSuccess,
  deleteDogSuccess,
  editDogSuccess,
  noFatherToUpdate,
  noMotherToUpdate,
  updateDogsChildren,
  updateDogsChildrenSuccess,
} from '../dogs.actions';
import { FirebaseDogsService } from '../../../services/firebase/realtime-db/http.service';
import { IDog } from '../../../model/dogs.interface';
import { Store } from '@ngrx/store';
import { getDogs } from '../dogs.selector';
import { DogModificationService } from './modification.service';

@Injectable({ providedIn: 'root' })
export class ChildrenSyncEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly httpService: FirebaseDogsService,
    private readonly store: Store,
    private readonly dogModification: DogModificationService
  ) {}

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
      map(([action, dogs]) => {
        if (action.dog.parents.father === 'other') {
          return noFatherToUpdate();
        }
        const parent = this.dogModification.findFather(dogs, action.dog);
        return updateDogsChildren({
          dog: this.dogModification.addChildrenToDog(action.dog, parent),
        });
      })
    );
  });

  public addDogToMother$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...[createDogSuccess, editDogSuccess]),
      withLatestFrom(this.store.select(getDogs)),
      map(([action, dogs]) => {
        if (action.dog.parents.mother === 'other') {
          return noMotherToUpdate();
        }
        const parent = this.dogModification.findMother(dogs, action.dog);
        return updateDogsChildren({
          dog: this.dogModification.addChildrenToDog(action.dog, parent),
        });
      })
    );
  });

  public deleteDogFromFather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteDogSuccess),
      withLatestFrom(this.store.select(getDogs)),
      map(([action, dogs]) => {
        if (action.dog.parents.father === 'other') {
          return noFatherToUpdate();
        }
        const father: IDog = this.dogModification.findFather(dogs, action.dog);
        return updateDogsChildren({
          dog: this.dogModification.deleteChildrenFromParent(
            action.dog,
            father
          ),
        });
      })
    );
  });

  public deleteDogFromMother$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteDogSuccess),
      withLatestFrom(this.store.select(getDogs)),
      map(([action, dogs]) => {
        if (action.dog.parents.mother === 'other') {
          return noMotherToUpdate();
        }
        const mother: IDog = this.dogModification.findMother(dogs, action.dog);
        return updateDogsChildren({
          dog: this.dogModification.deleteChildrenFromParent(
            action.dog,
            mother
          ),
        });
      })
    );
  });
}
