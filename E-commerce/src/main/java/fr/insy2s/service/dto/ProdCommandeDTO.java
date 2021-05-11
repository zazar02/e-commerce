package fr.insy2s.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link fr.insy2s.domain.ProdCommande} entity.
 */
public class ProdCommandeDTO implements Serializable {
    
    private Long id;

    @NotNull
    @Min(value = 1)
    private Integer quantite;


    private Long produitId;

    private Long commandeId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public Long getProduitId() {
        return produitId;
    }

    public void setProduitId(Long produitId) {
        this.produitId = produitId;
    }

    public Long getCommandeId() {
        return commandeId;
    }

    public void setCommandeId(Long commandeId) {
        this.commandeId = commandeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProdCommandeDTO)) {
            return false;
        }

        return id != null && id.equals(((ProdCommandeDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProdCommandeDTO{" +
            "id=" + getId() +
            ", quantite=" + getQuantite() +
            ", produitId=" + getProduitId() +
            ", commandeId=" + getCommandeId() +
            "}";
    }
}
