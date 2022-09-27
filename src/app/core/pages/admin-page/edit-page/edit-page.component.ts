import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDog } from 'src/app/core/model/dogs.interface';
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
import { editDog, loadDogs } from 'src/app/core/store/dogs-state/dogs.actions';

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
      return of(dog as IDog);
    })
  );
  private selectedDogId: string | null = null;
  constructor(private store: Store, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.store.dispatch(loadDogs());
  }

  protected onDogsFormSubmit(dog: IDog): void {
    const dogWithId: IDog = {
      ...dog,
      id: this.selectedDogId as string,
    };
    this.store.dispatch(editDog({ dog: dogWithId }));
  }

  private getIdFromRouter(): OperatorFunction<IDog[], [IDog[], string]> {
    return withLatestFrom(
      this.route.queryParamMap.pipe(
        map((params: ParamMap): string => {
          return params.get('id')!;
        }),
        tap((id: string) => {
          this.selectedDogId = id;
        })
      )
    );
  }
}
