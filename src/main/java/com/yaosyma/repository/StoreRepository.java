package com.yaosyma.repository;

import com.yaosyma.domain.Store;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Store entity.
 */
@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    @Query("select store from Store store where store.owner.login = ?#{authentication.name}")
    List<Store> findByOwnerIsCurrentUser();

    default Optional<Store> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Store> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Store> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(value = "select store from Store store left join fetch store.owner", countQuery = "select count(store) from Store store")
    Page<Store> findAllWithToOneRelationships(Pageable pageable);

    @Query("select store from Store store left join fetch store.owner")
    List<Store> findAllWithToOneRelationships();

    @Query("select store from Store store left join fetch store.owner where store.id =:id")
    Optional<Store> findOneWithToOneRelationships(@Param("id") Long id);
}
