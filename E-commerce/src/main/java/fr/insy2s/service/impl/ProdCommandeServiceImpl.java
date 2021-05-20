package fr.insy2s.service.impl;

import fr.insy2s.service.ProdCommandeService;
import fr.insy2s.domain.ProdCommande;
import fr.insy2s.repository.ProdCommandeRepository;
import fr.insy2s.service.dto.ProdCommandeDTO;
import fr.insy2s.service.mapper.ProdCommandeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link ProdCommande}.
 */
@Service
@Transactional
public class ProdCommandeServiceImpl implements ProdCommandeService {

    private final Logger log = LoggerFactory.getLogger(ProdCommandeServiceImpl.class);

    private final ProdCommandeRepository prodCommandeRepository;

    private final ProdCommandeMapper prodCommandeMapper;

    public ProdCommandeServiceImpl(ProdCommandeRepository prodCommandeRepository, ProdCommandeMapper prodCommandeMapper) {
        this.prodCommandeRepository = prodCommandeRepository;
        this.prodCommandeMapper = prodCommandeMapper;
    }

    @Override
    public ProdCommandeDTO save(ProdCommandeDTO prodCommandeDTO) {
        log.debug("Request to save ProdCommande : {}", prodCommandeDTO);
        ProdCommande prodCommande = prodCommandeMapper.toEntity(prodCommandeDTO);
        prodCommande = prodCommandeRepository.save(prodCommande);
        return prodCommandeMapper.toDto(prodCommande);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProdCommandeDTO> findAll() {
        log.debug("Request to get all ProdCommandes");
        return prodCommandeRepository.findAll().stream()
            .map(prodCommandeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<ProdCommandeDTO> findOne(Long id) {
        log.debug("Request to get ProdCommande : {}", id);
        return prodCommandeRepository.findById(id)
            .map(prodCommandeMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProdCommande : {}", id);
        prodCommandeRepository.deleteById(id);
    }

    @Override
    public List<ProdCommande> findByCommandeId(Long id) {
        log.debug("Request to get ProdCommande : {}", id);
        return prodCommandeRepository.findByCommandeId(id);
    }
}
