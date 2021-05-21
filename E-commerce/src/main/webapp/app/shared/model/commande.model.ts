import { Moment } from 'moment';

export interface ICommande {
  id?: number;
  date?: string;
  status?: string;
  userId?: number;
}

export const defaultValue: Readonly<ICommande> = {};
