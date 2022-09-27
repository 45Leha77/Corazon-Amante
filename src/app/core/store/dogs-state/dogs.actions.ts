import { createAction, props } from '@ngrx/store';
import { IDog } from '../../model/dogs.interface';

const stateTitle = '[Dogs]';

export const LOAD_DOGS = `${stateTitle} load dogs`;
export const LOAD_DOGS_SUCCESS = `${stateTitle} load dogs success`;

export const CREATE_DOG = `${stateTitle} create dog`;
export const CREATE_DOG_SUCCESS = `${stateTitle} create dog success`;

export const EDIT_DOG = `${stateTitle} edit dog`;
export const EDIT_DOG_SUCCESS = `${stateTitle} edit dog success`;

export const DELETE_DOG = `${stateTitle} delete dog`;
export const DELETE_DOG_SUCCESS = `${stateTitle} delete dog success`;

export const UPDATE_DOGS_CHILDREN = `${stateTitle} update dog's children`;
export const UPDATE_DOGS_CHILDREN_SUCCESS = `${stateTitle} update dog's children success`;

export const loadDogs = createAction(LOAD_DOGS);
export const loadDogsSuccess = createAction(
  LOAD_DOGS_SUCCESS,
  props<{ dogs: IDog[] }>()
);

export const createDog = createAction(CREATE_DOG, props<{ dog: IDog }>());
export const createDogSuccess = createAction(
  CREATE_DOG_SUCCESS,
  props<{ dog: IDog }>()
);

export const editDog = createAction(EDIT_DOG, props<{ dog: IDog }>());
export const editDogSuccess = createAction(
  EDIT_DOG_SUCCESS,
  props<{ dog: IDog }>()
);

export const deleteDog = createAction(DELETE_DOG, props<{ id: string }>());
export const deleteDogSuccess = createAction(
  DELETE_DOG_SUCCESS,
  props<{ id: string }>()
);

export const updateDogsChildren = createAction(
  UPDATE_DOGS_CHILDREN,
  props<{ dog: IDog }>()
);
export const updateDogsChildrenSuccess = createAction(
  UPDATE_DOGS_CHILDREN_SUCCESS,
  props<{ dog: IDog }>()
);

export const dummyAction = createAction('[dummy action]');

export const noParentsToUpdate = createAction(
  `${stateTitle} no parents to update`
);
