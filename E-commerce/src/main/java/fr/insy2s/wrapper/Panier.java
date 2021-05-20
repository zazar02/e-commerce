package fr.insy2s.wrapper;

import fr.insy2s.domain.Commande;
import fr.insy2s.domain.ProdCommande;
import fr.insy2s.domain.User;

import java.util.List;

public class Panier {

    private List<ProdCommande> prodCommandes;

    public List<ProdCommande> getProdCommandes() {
        return prodCommandes;
    }

    public void setProdCommandes(List<ProdCommande> prodCommandes) {
        this.prodCommandes = prodCommandes;
    }
}
