package fr.insy2s.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class ProdCommandeMapperTest {

    private ProdCommandeMapper prodCommandeMapper;

    @BeforeEach
    public void setUp() {
        prodCommandeMapper = new ProdCommandeMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(prodCommandeMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(prodCommandeMapper.fromId(null)).isNull();
    }
}
