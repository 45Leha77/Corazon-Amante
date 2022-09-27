import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  getDownloadURL,
  list,
  ListResult,
  StorageReference,
  uploadBytes,
  UploadResult,
  deleteObject,
} from 'firebase/storage';
import { map, Observable } from 'rxjs';
import { from } from 'rxjs/internal/observable/from';
import { environment } from 'src/environments/environment';
import { FirebaseImage } from '../../../model/firebase-image.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {
  private app = initializeApp(environment.firebase);
  private storage = getStorage();
  private dogsRef = ref(this.storage, 'dogs');

  public getImageURLByPath(title: string): Observable<string> {
    return from(getDownloadURL(ref(this.storage, title)));
  }

  public getAllImagesURLs(): Observable<FirebaseImage[]> {
    return this.getAllImagesRef().pipe(
      map((items: StorageReference[]) => {
        return items.map((item: StorageReference) => {
          const firebaseImage: FirebaseImage = {
            ...item,
            fullPath: item.fullPath,
            url: this.getImageURLByPath(item.fullPath),
          };
          return firebaseImage;
        });
      })
    );
  }

  public uploadImage(file: File): Observable<UploadResult> {
    const uploadPath = ref(this.storage, `dogs/${this.setRandomString()}`);
    return from(uploadBytes(uploadPath, file));
  }

  public deleteImage(path: string): Observable<void> {
    const deleteRef = ref(this.storage, path);
    return from(deleteObject(deleteRef));
  }

  private getAllImagesRef(): Observable<StorageReference[]> {
    return from(list(this.dogsRef, { maxResults: 100 })).pipe(
      map((list: ListResult) => {
        return list.items;
      })
    );
  }

  private setRandomString(): string {
    return (Math.random() * Math.random() * 10000).toString(36);
  }
}
