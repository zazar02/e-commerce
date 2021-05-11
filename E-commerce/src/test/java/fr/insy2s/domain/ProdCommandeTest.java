package fr.insy2s.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.insy2s.web.rest.TestUtil;

public class ProdCommandeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProdCommande.class);
        ProdCommande prodCommande1 = new ProdCommande();
        prodCommande1.setId(1L);
        ProdCommande prodCommande2 = new ProdCommande();
        prodCommande2.setId(prodCommande1.getId());
        assertThat(prodCommande1).isEqualTo(prodCommande2);
        prodCommande2.setId(2L);
        assertThat(prodCommande1).isNotEqualTo(prodCommande2);
        prodCommande1.setId(null);
        assertThat(prodCommande1).isNotEqualTo(prodCommande2);
    }
}
