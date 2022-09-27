import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs/internal/observable/of';
import { OperatorFunction } from 'rxjs/internal/types';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ObservableMethodsService {
  constructor(private toastr: ToastrService) {}

  public getDataAsArray<T>(): OperatorFunction<T[], T[]> {
    return map((data: T[]) => {
      const array: T[] = [];
      for (let key in data) {
        array.push({ ...data[key], id: key });
      }
      return array;
    });
  }

  public handleError(): OperatorFunction<unknown, any> {
    return catchError((err) => {
      this.toastr.error(
        JSON.stringify(err),
        'Oops. An error with http request occurred'
      );
      return of(err);
    });
  }
}
