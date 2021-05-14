import { IProduit } from 'app/shared/model/produit.model';

export interface ICategorie {
  id?: number;
  nom?: string;
  produits?: IProduit[];
}

export const defaultValue: Readonly<ICategorie> = {};
