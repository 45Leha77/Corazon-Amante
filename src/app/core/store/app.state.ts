import { DogsReducer } from './dogs-state/dogs.reducer';
import { DogsState } from './dogs-state/dogs.state';

export interface AppState {
  dogs: DogsState;
}

export const AppReducer = {
  dogs: DogsReducer,
};
