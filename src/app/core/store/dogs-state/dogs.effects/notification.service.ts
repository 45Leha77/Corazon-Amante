import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/internal/operators/tap';
import { MonoTypeOperatorFunction } from 'rxjs/internal/types';
import { IDog } from 'src/app/core/model/dogs.interface';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private readonly toastr: ToastrService) {}

  public notifyCreation(dog: IDog): MonoTypeOperatorFunction<IDog> {
    return tap(() => {
      this.toastr.success(`${dog.name} was successfully created`, 'Creation');
    });
  }

  public notifyEditing(dog: IDog): MonoTypeOperatorFunction<IDog> {
    return tap(() => {
      this.toastr.success(`${dog.name} was successfully edited`, 'Editing');
    });
  }

  public notifyDeleting(dog: IDog): MonoTypeOperatorFunction<IDog> {
    return tap(() => {
      this.toastr.info(`${dog.name} was deleted`, 'Deleting');
    });
  }
}
