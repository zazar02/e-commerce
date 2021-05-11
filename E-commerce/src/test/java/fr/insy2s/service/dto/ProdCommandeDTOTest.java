package fr.insy2s.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.insy2s.web.rest.TestUtil;

public class ProdCommandeDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProdCommandeDTO.class);
        ProdCommandeDTO prodCommandeDTO1 = new ProdCommandeDTO();
        prodCommandeDTO1.setId(1L);
        ProdCommandeDTO prodCommandeDTO2 = new ProdCommandeDTO();
        assertThat(prodCommandeDTO1).isNotEqualTo(prodCommandeDTO2);
        prodCommandeDTO2.setId(prodCommandeDTO1.getId());
        assertThat(prodCommandeDTO1).isEqualTo(prodCommandeDTO2);
        prodCommandeDTO2.setId(2L);
        assertThat(prodCommandeDTO1).isNotEqualTo(prodCommandeDTO2);
        prodCommandeDTO1.setId(null);
        assertThat(prodCommandeDTO1).isNotEqualTo(prodCommandeDTO2);
    }
}
