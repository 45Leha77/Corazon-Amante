import { StorageReference } from 'firebase/storage';
import { Observable } from 'rxjs';

export interface FirebaseImage extends StorageReference {
  url: Observable<string>;
}
