import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IDog } from '../../model/dogs.interface';
import { DogsState } from './dogs.state';

export const DOGS_STATE_NAME = 'dogs';

const getDogsState = createFeatureSelector<DogsState>(DOGS_STATE_NAME);

export const getDogs = createSelector(getDogsState, (state): IDog[] => {
  return state.dogs;
});
