import { IDog, IPuppyForSale } from "./dogs.interface";

export interface DogsDB {
  [id: string]: IDog | IPuppyForSale;
}