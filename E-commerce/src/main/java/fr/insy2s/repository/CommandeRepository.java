package fr.insy2s.repository;

import fr.insy2s.domain.Commande;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Commande entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {

    @Query("select commande from Commande commande where commande.user.login = ?#{principal.username}")
    List<Commande> findByUserIsCurrentUser();
}
