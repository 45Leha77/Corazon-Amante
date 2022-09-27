import { IDog } from '../../model/dogs.interface';

export interface DogsState {
  dogs: IDog[];
}

export const initialState: DogsState = {
  dogs: [],
};
