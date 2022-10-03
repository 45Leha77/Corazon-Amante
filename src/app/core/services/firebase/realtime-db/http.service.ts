import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IDog } from 'src/app/core/model/dogs.interface';
import { HttpErrorHandler } from './Http-error-handling';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class FirebaseDogsService {
  private dogsURL: string =
    'https://korazon-amante-default-rtdb.firebaseio.com/dogs.json';

  constructor(
    private http: HttpClient,
    private errorHandler: HttpErrorHandler
  ) {}

  public getDogs(): Observable<IDog[]> {
    return this.http
      .get<IDog[]>(this.dogsURL)
      .pipe(this.errorHandler.handleError());
  }

  public createDog(dog: IDog): Observable<IDog> {
    return this.http
      .post<IDog>(this.dogsURL, dog)
      .pipe(this.errorHandler.handleError());
  }

  public getDogById(id: string): Observable<IDog> {
    return this.http
      .get<IDog>(
        `https://korazon-amante-default-rtdb.firebaseio.com/dogs/${id}.json`
      )
      .pipe(this.errorHandler.handleError());
  }

  public editDog(dog: IDog): Observable<IDog> {
    return this.http
      .patch<IDog>(
        `https://korazon-amante-default-rtdb.firebaseio.com/dogs/${dog.id}.json`,
        dog
      )
      .pipe(this.errorHandler.handleError());
  }

  public deleteDog(id: string) {
    return this.http.delete(
      `https://korazon-amante-default-rtdb.firebaseio.com/dogs/${id}.json`
    );
  }
}
