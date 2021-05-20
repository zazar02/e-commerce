package fr.insy2s.repository;

import fr.insy2s.domain.ProdCommande;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ProdCommande entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProdCommandeRepository extends JpaRepository<ProdCommande, Long> {

    List<ProdCommande> findByCommandeId(Long id);
}
