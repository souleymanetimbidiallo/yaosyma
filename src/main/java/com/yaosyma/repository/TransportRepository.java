package com.yaosyma.repository;

import com.yaosyma.domain.Transport;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Transport entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransportRepository extends JpaRepository<Transport, Long> {}
