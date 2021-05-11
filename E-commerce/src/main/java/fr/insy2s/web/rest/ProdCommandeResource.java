package fr.insy2s.web.rest;

import fr.insy2s.service.ProdCommandeService;
import fr.insy2s.web.rest.errors.BadRequestAlertException;
import fr.insy2s.service.dto.ProdCommandeDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.insy2s.domain.ProdCommande}.
 */
@RestController
@RequestMapping("/api")
public class ProdCommandeResource {

    private final Logger log = LoggerFactory.getLogger(ProdCommandeResource.class);

    private static final String ENTITY_NAME = "prodCommande";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProdCommandeService prodCommandeService;

    public ProdCommandeResource(ProdCommandeService prodCommandeService) {
        this.prodCommandeService = prodCommandeService;
    }

    /**
     * {@code POST  /prod-commandes} : Create a new prodCommande.
     *
     * @param prodCommandeDTO the prodCommandeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new prodCommandeDTO, or with status {@code 400 (Bad Request)} if the prodCommande has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/prod-commandes")
    public ResponseEntity<ProdCommandeDTO> createProdCommande(@Valid @RequestBody ProdCommandeDTO prodCommandeDTO) throws URISyntaxException {
        log.debug("REST request to save ProdCommande : {}", prodCommandeDTO);
        if (prodCommandeDTO.getId() != null) {
            throw new BadRequestAlertException("A new prodCommande cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProdCommandeDTO result = prodCommandeService.save(prodCommandeDTO);
        return ResponseEntity.created(new URI("/api/prod-commandes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /prod-commandes} : Updates an existing prodCommande.
     *
     * @param prodCommandeDTO the prodCommandeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated prodCommandeDTO,
     * or with status {@code 400 (Bad Request)} if the prodCommandeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the prodCommandeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/prod-commandes")
    public ResponseEntity<ProdCommandeDTO> updateProdCommande(@Valid @RequestBody ProdCommandeDTO prodCommandeDTO) throws URISyntaxException {
        log.debug("REST request to update ProdCommande : {}", prodCommandeDTO);
        if (prodCommandeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProdCommandeDTO result = prodCommandeService.save(prodCommandeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, prodCommandeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /prod-commandes} : get all the prodCommandes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of prodCommandes in body.
     */
    @GetMapping("/prod-commandes")
    public List<ProdCommandeDTO> getAllProdCommandes() {
        log.debug("REST request to get all ProdCommandes");
        return prodCommandeService.findAll();
    }

    /**
     * {@code GET  /prod-commandes/:id} : get the "id" prodCommande.
     *
     * @param id the id of the prodCommandeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the prodCommandeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/prod-commandes/{id}")
    public ResponseEntity<ProdCommandeDTO> getProdCommande(@PathVariable Long id) {
        log.debug("REST request to get ProdCommande : {}", id);
        Optional<ProdCommandeDTO> prodCommandeDTO = prodCommandeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(prodCommandeDTO);
    }

    /**
     * {@code DELETE  /prod-commandes/:id} : delete the "id" prodCommande.
     *
     * @param id the id of the prodCommandeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/prod-commandes/{id}")
    public ResponseEntity<Void> deleteProdCommande(@PathVariable Long id) {
        log.debug("REST request to delete ProdCommande : {}", id);
        prodCommandeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
