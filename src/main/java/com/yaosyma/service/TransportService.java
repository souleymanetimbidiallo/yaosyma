package com.yaosyma.service;

import com.yaosyma.domain.Transport;
import com.yaosyma.repository.TransportRepository;
import com.yaosyma.service.dto.TransportDTO;
import com.yaosyma.service.mapper.TransportMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.yaosyma.domain.Transport}.
 */
@Service
@Transactional
public class TransportService {

    private static final Logger log = LoggerFactory.getLogger(TransportService.class);

    private final TransportRepository transportRepository;

    private final TransportMapper transportMapper;

    public TransportService(TransportRepository transportRepository, TransportMapper transportMapper) {
        this.transportRepository = transportRepository;
        this.transportMapper = transportMapper;
    }

    /**
     * Save a transport.
     *
     * @param transportDTO the entity to save.
     * @return the persisted entity.
     */
    public TransportDTO save(TransportDTO transportDTO) {
        log.debug("Request to save Transport : {}", transportDTO);
        Transport transport = transportMapper.toEntity(transportDTO);
        transport = transportRepository.save(transport);
        return transportMapper.toDto(transport);
    }

    /**
     * Update a transport.
     *
     * @param transportDTO the entity to save.
     * @return the persisted entity.
     */
    public TransportDTO update(TransportDTO transportDTO) {
        log.debug("Request to update Transport : {}", transportDTO);
        Transport transport = transportMapper.toEntity(transportDTO);
        transport = transportRepository.save(transport);
        return transportMapper.toDto(transport);
    }

    /**
     * Partially update a transport.
     *
     * @param transportDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<TransportDTO> partialUpdate(TransportDTO transportDTO) {
        log.debug("Request to partially update Transport : {}", transportDTO);

        return transportRepository
            .findById(transportDTO.getId())
            .map(existingTransport -> {
                transportMapper.partialUpdate(existingTransport, transportDTO);

                return existingTransport;
            })
            .map(transportRepository::save)
            .map(transportMapper::toDto);
    }

    /**
     * Get all the transports.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<TransportDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Transports");
        return transportRepository.findAll(pageable).map(transportMapper::toDto);
    }

    /**
     * Get one transport by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TransportDTO> findOne(Long id) {
        log.debug("Request to get Transport : {}", id);
        return transportRepository.findById(id).map(transportMapper::toDto);
    }

    /**
     * Delete the transport by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Transport : {}", id);
        transportRepository.deleteById(id);
    }
}
