import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs/internal/observable/of';
import { OperatorFunction } from 'rxjs/internal/types';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpErrorHandler {
  constructor(private toastr: ToastrService) {}

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
