export type Gender = 'male' | 'female';
export type HairType = 'hairless' | 'coated';

export interface IDog {
  id: string;
  name: string;
  gender: Gender;
  dateOfBirth: Date;
  hairType: HairType;
  description?: string;
  height?: string;
  children: Array<string> | [];
  images?: string[];
  isForSale: boolean;
  price?: string;
  isForShow?: boolean;
  parents: {
    mother: IDog | string;
    father: IDog | string;
  };
}
