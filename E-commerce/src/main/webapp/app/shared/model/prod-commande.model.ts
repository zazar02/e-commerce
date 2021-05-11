export interface IProdCommande {
  id?: number;
  quantite?: number;
  produitId?: number;
  commandeId?: number;
}

export const defaultValue: Readonly<IProdCommande> = {};
