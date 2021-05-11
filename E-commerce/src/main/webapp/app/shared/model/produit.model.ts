export interface IProduit {
  id?: number;
  nom?: string;
  img?: string;
  prix?: number;
  categorieId?: number;
}

export const defaultValue: Readonly<IProduit> = {};
