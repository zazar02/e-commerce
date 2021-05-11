package fr.insy2s.web.rest;

import fr.insy2s.ECommerceAppApp;
import fr.insy2s.domain.ProdCommande;
import fr.insy2s.domain.Produit;
import fr.insy2s.domain.Commande;
import fr.insy2s.repository.ProdCommandeRepository;
import fr.insy2s.service.ProdCommandeService;
import fr.insy2s.service.dto.ProdCommandeDTO;
import fr.insy2s.service.mapper.ProdCommandeMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProdCommandeResource} REST controller.
 */
@SpringBootTest(classes = ECommerceAppApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProdCommandeResourceIT {

    private static final Integer DEFAULT_QUANTITE = 1;
    private static final Integer UPDATED_QUANTITE = 2;

    @Autowired
    private ProdCommandeRepository prodCommandeRepository;

    @Autowired
    private ProdCommandeMapper prodCommandeMapper;

    @Autowired
    private ProdCommandeService prodCommandeService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProdCommandeMockMvc;

    private ProdCommande prodCommande;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProdCommande createEntity(EntityManager em) {
        ProdCommande prodCommande = new ProdCommande()
            .quantite(DEFAULT_QUANTITE);
        // Add required entity
        Produit produit;
        if (TestUtil.findAll(em, Produit.class).isEmpty()) {
            produit = ProduitResourceIT.createEntity(em);
            em.persist(produit);
            em.flush();
        } else {
            produit = TestUtil.findAll(em, Produit.class).get(0);
        }
        prodCommande.setProduit(produit);
        // Add required entity
        Commande commande;
        if (TestUtil.findAll(em, Commande.class).isEmpty()) {
            commande = CommandeResourceIT.createEntity(em);
            em.persist(commande);
            em.flush();
        } else {
            commande = TestUtil.findAll(em, Commande.class).get(0);
        }
        prodCommande.setCommande(commande);
        return prodCommande;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProdCommande createUpdatedEntity(EntityManager em) {
        ProdCommande prodCommande = new ProdCommande()
            .quantite(UPDATED_QUANTITE);
        // Add required entity
        Produit produit;
        if (TestUtil.findAll(em, Produit.class).isEmpty()) {
            produit = ProduitResourceIT.createUpdatedEntity(em);
            em.persist(produit);
            em.flush();
        } else {
            produit = TestUtil.findAll(em, Produit.class).get(0);
        }
        prodCommande.setProduit(produit);
        // Add required entity
        Commande commande;
        if (TestUtil.findAll(em, Commande.class).isEmpty()) {
            commande = CommandeResourceIT.createUpdatedEntity(em);
            em.persist(commande);
            em.flush();
        } else {
            commande = TestUtil.findAll(em, Commande.class).get(0);
        }
        prodCommande.setCommande(commande);
        return prodCommande;
    }

    @BeforeEach
    public void initTest() {
        prodCommande = createEntity(em);
    }

    @Test
    @Transactional
    public void createProdCommande() throws Exception {
        int databaseSizeBeforeCreate = prodCommandeRepository.findAll().size();
        // Create the ProdCommande
        ProdCommandeDTO prodCommandeDTO = prodCommandeMapper.toDto(prodCommande);
        restProdCommandeMockMvc.perform(post("/api/prod-commandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prodCommandeDTO)))
            .andExpect(status().isCreated());

        // Validate the ProdCommande in the database
        List<ProdCommande> prodCommandeList = prodCommandeRepository.findAll();
        assertThat(prodCommandeList).hasSize(databaseSizeBeforeCreate + 1);
        ProdCommande testProdCommande = prodCommandeList.get(prodCommandeList.size() - 1);
        assertThat(testProdCommande.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
    }

    @Test
    @Transactional
    public void createProdCommandeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prodCommandeRepository.findAll().size();

        // Create the ProdCommande with an existing ID
        prodCommande.setId(1L);
        ProdCommandeDTO prodCommandeDTO = prodCommandeMapper.toDto(prodCommande);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProdCommandeMockMvc.perform(post("/api/prod-commandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prodCommandeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProdCommande in the database
        List<ProdCommande> prodCommandeList = prodCommandeRepository.findAll();
        assertThat(prodCommandeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkQuantiteIsRequired() throws Exception {
        int databaseSizeBeforeTest = prodCommandeRepository.findAll().size();
        // set the field null
        prodCommande.setQuantite(null);

        // Create the ProdCommande, which fails.
        ProdCommandeDTO prodCommandeDTO = prodCommandeMapper.toDto(prodCommande);


        restProdCommandeMockMvc.perform(post("/api/prod-commandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prodCommandeDTO)))
            .andExpect(status().isBadRequest());

        List<ProdCommande> prodCommandeList = prodCommandeRepository.findAll();
        assertThat(prodCommandeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProdCommandes() throws Exception {
        // Initialize the database
        prodCommandeRepository.saveAndFlush(prodCommande);

        // Get all the prodCommandeList
        restProdCommandeMockMvc.perform(get("/api/prod-commandes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prodCommande.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE)));
    }
    
    @Test
    @Transactional
    public void getProdCommande() throws Exception {
        // Initialize the database
        prodCommandeRepository.saveAndFlush(prodCommande);

        // Get the prodCommande
        restProdCommandeMockMvc.perform(get("/api/prod-commandes/{id}", prodCommande.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(prodCommande.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE));
    }
    @Test
    @Transactional
    public void getNonExistingProdCommande() throws Exception {
        // Get the prodCommande
        restProdCommandeMockMvc.perform(get("/api/prod-commandes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProdCommande() throws Exception {
        // Initialize the database
        prodCommandeRepository.saveAndFlush(prodCommande);

        int databaseSizeBeforeUpdate = prodCommandeRepository.findAll().size();

        // Update the prodCommande
        ProdCommande updatedProdCommande = prodCommandeRepository.findById(prodCommande.getId()).get();
        // Disconnect from session so that the updates on updatedProdCommande are not directly saved in db
        em.detach(updatedProdCommande);
        updatedProdCommande
            .quantite(UPDATED_QUANTITE);
        ProdCommandeDTO prodCommandeDTO = prodCommandeMapper.toDto(updatedProdCommande);

        restProdCommandeMockMvc.perform(put("/api/prod-commandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prodCommandeDTO)))
            .andExpect(status().isOk());

        // Validate the ProdCommande in the database
        List<ProdCommande> prodCommandeList = prodCommandeRepository.findAll();
        assertThat(prodCommandeList).hasSize(databaseSizeBeforeUpdate);
        ProdCommande testProdCommande = prodCommandeList.get(prodCommandeList.size() - 1);
        assertThat(testProdCommande.getQuantite()).isEqualTo(UPDATED_QUANTITE);
    }

    @Test
    @Transactional
    public void updateNonExistingProdCommande() throws Exception {
        int databaseSizeBeforeUpdate = prodCommandeRepository.findAll().size();

        // Create the ProdCommande
        ProdCommandeDTO prodCommandeDTO = prodCommandeMapper.toDto(prodCommande);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProdCommandeMockMvc.perform(put("/api/prod-commandes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prodCommandeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProdCommande in the database
        List<ProdCommande> prodCommandeList = prodCommandeRepository.findAll();
        assertThat(prodCommandeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProdCommande() throws Exception {
        // Initialize the database
        prodCommandeRepository.saveAndFlush(prodCommande);

        int databaseSizeBeforeDelete = prodCommandeRepository.findAll().size();

        // Delete the prodCommande
        restProdCommandeMockMvc.perform(delete("/api/prod-commandes/{id}", prodCommande.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProdCommande> prodCommandeList = prodCommandeRepository.findAll();
        assertThat(prodCommandeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
