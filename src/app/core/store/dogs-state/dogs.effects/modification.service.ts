import { Injectable } from '@angular/core';
import { OperatorFunction, map } from 'rxjs';
import { IDog, Image } from '../../../model/dogs.interface';
import { FirebaseStorageService } from '../../../services/firebase/storage/storage.service';

@Injectable({ providedIn: 'root' })
export class DogModificationService {
  constructor(private readonly imageStorage: FirebaseStorageService) {}
  public getDataAsArray<T>(): OperatorFunction<T[], T[]> {
    return map((data: T[]) => {
      const array: T[] = [];
      for (let key in data) {
        array.push({ ...data[key], id: key });
      }
      return array;
    });
  }

  public updateDogWithImgRef(): OperatorFunction<IDog[], IDog[]> {
    return map((dogs: IDog[]) => {
      return dogs.map((dog: IDog) => {
        const updatedDog: IDog = {
          ...dog,
          images: dog.images?.map((image: Image) => {
            const updatedImage: Image = {
              ...image,
              ref: this.imageStorage.getImageURLByPath(image.path),
            };
            return updatedImage;
          }),
        };
        return updatedDog;
      });
    });
  }

  public addChildrenToDog(selectedDog: IDog, parent: IDog): IDog {
    if (parent.children) {
      return {
        ...parent,
        children: [...parent.children, selectedDog.id as string],
      };
    } else {
      return {
        ...parent,
        children: [selectedDog.id!],
      };
    }
  }

  public deleteChildrenFromParent(children: IDog, parent: IDog): IDog {
    return {
      ...parent,
      children: parent.children.filter((id: string) => children.id !== id),
    };
  }

  public findFather(allDogs: IDog[], selectedDog: IDog): IDog {
    return allDogs.find((dog) => dog.id === selectedDog.parents.father) as IDog;
  }

  public findMother(allDogs: IDog[], selectedDog: IDog): IDog {
    return allDogs.find((dog) => dog.id === selectedDog.parents.mother) as IDog;
  }
}
