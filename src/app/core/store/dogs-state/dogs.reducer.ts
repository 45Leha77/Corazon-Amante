import { Action, createReducer, on } from '@ngrx/store';
import { IDog } from '../../model/dogs.interface';
import {
  createDogSuccess,
  deleteDogSuccess,
  editDogSuccess,
  loadDogsSuccess,
  updateDogsChildrenSuccess,
  uploadImageSuccess,
} from './dogs.actions';
import { DogsState, initialState } from './dogs.state';

const _dogsReducer = createReducer(
  initialState,
  on(loadDogsSuccess, (state, action) => {
    return {
      ...state,
      dogs: action.dogs,
    };
  }),
  on(createDogSuccess, (state, action) => {
    return {
      ...state,
      dogs: [...state.dogs, action.dog],
    };
  }),
  on(...[editDogSuccess, updateDogsChildrenSuccess], (state, action) => {
    const updatedDogs: IDog[] = state.dogs.map((dog: IDog) => {
      return action.dog.id === dog.id ? action.dog : dog;
    });
    return {
      ...state,
      dogs: [...updatedDogs],
    };
  }),
  on(deleteDogSuccess, (state, action) => {
    const updatedDogs: IDog[] = state.dogs.filter(
      (dog: IDog) => dog.id !== action.dog.id
    );
    return {
      ...state,
      dogs: updatedDogs,
    };
  })
);

export function DogsReducer(state: DogsState | undefined, action: Action) {
  return _dogsReducer(state, action);
}
