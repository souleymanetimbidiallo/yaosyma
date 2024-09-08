package com.yaosyma.domain;

import static com.yaosyma.domain.CategoryTestSamples.*;
import static com.yaosyma.domain.ProductTestSamples.*;
import static com.yaosyma.domain.SupplierTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.yaosyma.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProductTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Product.class);
        Product product1 = getProductSample1();
        Product product2 = new Product();
        assertThat(product1).isNotEqualTo(product2);

        product2.setId(product1.getId());
        assertThat(product1).isEqualTo(product2);

        product2 = getProductSample2();
        assertThat(product1).isNotEqualTo(product2);
    }

    @Test
    void categoryTest() {
        Product product = getProductRandomSampleGenerator();
        Category categoryBack = getCategoryRandomSampleGenerator();

        product.setCategory(categoryBack);
        assertThat(product.getCategory()).isEqualTo(categoryBack);

        product.category(null);
        assertThat(product.getCategory()).isNull();
    }

    @Test
    void supplierTest() {
        Product product = getProductRandomSampleGenerator();
        Supplier supplierBack = getSupplierRandomSampleGenerator();

        product.setSupplier(supplierBack);
        assertThat(product.getSupplier()).isEqualTo(supplierBack);

        product.supplier(null);
        assertThat(product.getSupplier()).isNull();
    }
}
