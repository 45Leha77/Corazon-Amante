import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { loadDogs } from '../../store/dogs-state/dogs.actions';
import { getDogs } from '../../store/dogs-state/dogs.selector';
import { Observable } from 'rxjs/internal/Observable';
import { IDog } from '../../model/dogs.interface';

import { LetModule } from '@ngrx/component';

@Component({
  selector: 'app-dogs-display-page',
  standalone: true,
  imports: [CommonModule, LetModule],
  templateUrl: './dogs-display-page.component.html',
  styleUrls: ['./dogs-display-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogsDisplayPageComponent implements OnInit {
  protected dogs$: Observable<IDog[]> = this.store.pipe(select(getDogs));
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadDogs());
  }
}
