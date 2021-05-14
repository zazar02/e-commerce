package fr.insy2s.repository;

import fr.insy2s.domain.Produit;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

/**
 * Spring Data  repository for the Produit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {

    @Query("select p from Produit p,Categorie c where p.categorie=c.id and c.nom = ?1")
    List<Produit> FindProduitByCategorie(String nom);
}
