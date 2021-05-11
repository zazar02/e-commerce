package fr.insy2s.service.mapper;


import fr.insy2s.domain.*;
import fr.insy2s.service.dto.ProdCommandeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ProdCommande} and its DTO {@link ProdCommandeDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProduitMapper.class, CommandeMapper.class})
public interface ProdCommandeMapper extends EntityMapper<ProdCommandeDTO, ProdCommande> {

    @Mapping(source = "produit.id", target = "produitId")
    @Mapping(source = "commande.id", target = "commandeId")
    ProdCommandeDTO toDto(ProdCommande prodCommande);

    @Mapping(source = "produitId", target = "produit")
    @Mapping(source = "commandeId", target = "commande")
    ProdCommande toEntity(ProdCommandeDTO prodCommandeDTO);

    default ProdCommande fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProdCommande prodCommande = new ProdCommande();
        prodCommande.setId(id);
        return prodCommande;
    }
}
