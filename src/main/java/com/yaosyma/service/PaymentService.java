package com.yaosyma.service;

import com.yaosyma.domain.Payment;
import com.yaosyma.repository.PaymentRepository;
import com.yaosyma.service.dto.PaymentDTO;
import com.yaosyma.service.mapper.PaymentMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.yaosyma.domain.Payment}.
 */
@Service
@Transactional
public class PaymentService {

    private static final Logger log = LoggerFactory.getLogger(PaymentService.class);

    private final PaymentRepository paymentRepository;

    private final PaymentMapper paymentMapper;

    public PaymentService(PaymentRepository paymentRepository, PaymentMapper paymentMapper) {
        this.paymentRepository = paymentRepository;
        this.paymentMapper = paymentMapper;
    }

    /**
     * Save a payment.
     *
     * @param paymentDTO the entity to save.
     * @return the persisted entity.
     */
    public PaymentDTO save(PaymentDTO paymentDTO) {
        log.debug("Request to save Payment : {}", paymentDTO);
        Payment payment = paymentMapper.toEntity(paymentDTO);
        payment = paymentRepository.save(payment);
        return paymentMapper.toDto(payment);
    }

    /**
     * Update a payment.
     *
     * @param paymentDTO the entity to save.
     * @return the persisted entity.
     */
    public PaymentDTO update(PaymentDTO paymentDTO) {
        log.debug("Request to update Payment : {}", paymentDTO);
        Payment payment = paymentMapper.toEntity(paymentDTO);
        payment = paymentRepository.save(payment);
        return paymentMapper.toDto(payment);
    }

    /**
     * Partially update a payment.
     *
     * @param paymentDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<PaymentDTO> partialUpdate(PaymentDTO paymentDTO) {
        log.debug("Request to partially update Payment : {}", paymentDTO);

        return paymentRepository
            .findById(paymentDTO.getId())
            .map(existingPayment -> {
                paymentMapper.partialUpdate(existingPayment, paymentDTO);

                return existingPayment;
            })
            .map(paymentRepository::save)
            .map(paymentMapper::toDto);
    }

    /**
     * Get all the payments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<PaymentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Payments");
        return paymentRepository.findAll(pageable).map(paymentMapper::toDto);
    }

    /**
     * Get all the payments with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<PaymentDTO> findAllWithEagerRelationships(Pageable pageable) {
        return paymentRepository.findAllWithEagerRelationships(pageable).map(paymentMapper::toDto);
    }

    /**
     * Get one payment by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PaymentDTO> findOne(Long id) {
        log.debug("Request to get Payment : {}", id);
        return paymentRepository.findOneWithEagerRelationships(id).map(paymentMapper::toDto);
    }

    /**
     * Delete the payment by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Payment : {}", id);
        paymentRepository.deleteById(id);
    }
}
