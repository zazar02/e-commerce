package fr.insy2s.service.impl;

import fr.insy2s.domain.ProdCommande;
import fr.insy2s.service.CommandeService;
import fr.insy2s.domain.Commande;
import fr.insy2s.repository.CommandeRepository;
import fr.insy2s.service.ProdCommandeService;
import fr.insy2s.service.dto.CommandeDTO;
import fr.insy2s.service.mapper.CommandeMapper;
import fr.insy2s.wrapper.Panier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Commande}.
 */
@Service
@Transactional
public class CommandeServiceImpl implements CommandeService {

    private final Logger log = LoggerFactory.getLogger(CommandeServiceImpl.class);

    private final CommandeRepository commandeRepository;

    private final ProdCommandeService prodCommandeService;

    private final CommandeMapper commandeMapper;

    public CommandeServiceImpl(CommandeRepository commandeRepository, ProdCommandeService prodCommandeService, CommandeMapper commandeMapper) {
        this.commandeRepository = commandeRepository;
        this.prodCommandeService = prodCommandeService;
        this.commandeMapper = commandeMapper;
    }

    @Override
    public CommandeDTO save(CommandeDTO commandeDTO) {
        log.debug("Request to save Commande : {}", commandeDTO);
        Commande commande = commandeMapper.toEntity(commandeDTO);
        commande = commandeRepository.save(commande);
        return commandeMapper.toDto(commande);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommandeDTO> findAll() {
        log.debug("Request to get all Commandes");
        return commandeRepository.findAll().stream()
            .map(commandeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<CommandeDTO> findOne(Long id) {
        log.debug("Request to get Commande : {}", id);
        return commandeRepository.findById(id)
            .map(commandeMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Commande : {}", id);
        commandeRepository.deleteById(id);
    }

    @Override
    public Panier findByUserLogin(String login) {
        Commande com=commandeRepository.findByUserLogin(login);
        if(com==null){
            return new Panier();
        }
        List<ProdCommande> prodCommandes=prodCommandeService.findByCommandeId(com.getId());
        Panier panier = new Panier();
        panier.setProdCommandes(prodCommandes);
        return panier;
    }
}
