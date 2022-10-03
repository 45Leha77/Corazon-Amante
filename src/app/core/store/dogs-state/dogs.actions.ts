import { createAction, props } from '@ngrx/store';
import { IDog, Image } from '../../model/dogs.interface';

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

export const UPLOAD_IMAGE = `${stateTitle} upload image`;
export const UPLOAD_IMAGE_SUCCESS = `${stateTitle} upload image success`;

export const DELETE_IMAGE = `${stateTitle} delete image`;
export const DELETE_IMAGE_SUCCESS = `${stateTitle} delete image success`;

export const DELETE_IMAGE_FROM_STORAGE = `${stateTitle} delete image from storage`;
export const DELETE_IMAGE_FROM_STORAGE_SUCCESS = `${stateTitle} delete image from storage success`;

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

export const deleteDog = createAction(DELETE_DOG, props<{ dog: IDog }>());
export const deleteDogSuccess = createAction(
  DELETE_DOG_SUCCESS,
  props<{ dog: IDog }>()
);

export const updateDogsChildren = createAction(
  UPDATE_DOGS_CHILDREN,
  props<{ dog: IDog }>()
);
export const updateDogsChildrenSuccess = createAction(
  UPDATE_DOGS_CHILDREN_SUCCESS,
  props<{ dog: IDog }>()
);

export const uploadImage = createAction(
  UPLOAD_IMAGE,
  props<{ image: Image; dog: IDog }>()
);
export const uploadImageSuccess = createAction(
  UPLOAD_IMAGE_SUCCESS,
  props<{ dog: IDog; image: Image }>()
);

export const deleteImage = createAction(
  DELETE_IMAGE,
  props<{ image: Image }>()
);
export const deleteImageSuccess = createAction(
  DELETE_IMAGE_SUCCESS,
  props<{ image: Image }>()
);

export const deleteImageFromStorage = createAction(
  DELETE_IMAGE_FROM_STORAGE,
  props<{ image: Image }>()
);
export const deleteImageFromStorageSuccess = createAction(
  DELETE_IMAGE_FROM_STORAGE_SUCCESS
);

export const dummyAction = createAction('[dummy action]');

export const noParentsToUpdate = createAction(
  `${stateTitle} no parents to update`
);
