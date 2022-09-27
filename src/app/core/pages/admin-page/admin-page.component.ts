import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { deleteDog, loadDogs } from '../../store/dogs-state/dogs.actions';
import { getDogs } from '../../store/dogs-state/dogs.selector';
import { Observable } from 'rxjs';
import { IDog } from '../../model/dogs.interface';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageComponent implements OnInit {
  protected dogs$: Observable<IDog[]> = this.store.pipe(select(getDogs));
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadDogs());
  }

  protected onDelete(id: string): void {
    //maybe add popup with approval
    this.store.dispatch(deleteDog({ id }));
  }
}
