package com.yaosyma.repository;

import com.yaosyma.domain.Payment;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Payment entity.
 */
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    default Optional<Payment> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Payment> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Payment> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select payment from Payment payment left join fetch payment.order left join fetch payment.client",
        countQuery = "select count(payment) from Payment payment"
    )
    Page<Payment> findAllWithToOneRelationships(Pageable pageable);

    @Query("select payment from Payment payment left join fetch payment.order left join fetch payment.client")
    List<Payment> findAllWithToOneRelationships();

    @Query("select payment from Payment payment left join fetch payment.order left join fetch payment.client where payment.id =:id")
    Optional<Payment> findOneWithToOneRelationships(@Param("id") Long id);
}
