import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class UnsubscribeService implements OnDestroy {
  private readonly destroySubject: Subject<void> = new Subject<void>();
  public readonly destroy$: Observable<void> =
    this.destroySubject.asObservable();
  public ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
