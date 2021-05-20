package fr.insy2s.service;

import fr.insy2s.domain.ProdCommande;
import fr.insy2s.service.dto.ProdCommandeDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link fr.insy2s.domain.ProdCommande}.
 */
public interface ProdCommandeService {

    /**
     * Save a prodCommande.
     *
     * @param prodCommandeDTO the entity to save.
     * @return the persisted entity.
     */
    ProdCommandeDTO save(ProdCommandeDTO prodCommandeDTO);

    /**
     * Get all the prodCommandes.
     *
     * @return the list of entities.
     */
    List<ProdCommandeDTO> findAll();


    /**
     * Get the "id" prodCommande.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProdCommandeDTO> findOne(Long id);

    /**
     * Delete the "id" prodCommande.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    List<ProdCommande> findByCommandeId(Long id);
}
