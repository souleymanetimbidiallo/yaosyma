package com.yaosyma.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class SupplierTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Supplier getSupplierSample1() {
        return new Supplier()
            .id(1L)
            .name("name1")
            .description("description1")
            .address("address1")
            .phone("phone1")
            .email("email1")
            .image("image1");
    }

    public static Supplier getSupplierSample2() {
        return new Supplier()
            .id(2L)
            .name("name2")
            .description("description2")
            .address("address2")
            .phone("phone2")
            .email("email2")
            .image("image2");
    }

    public static Supplier getSupplierRandomSampleGenerator() {
        return new Supplier()
            .id(longCount.incrementAndGet())
            .name(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString())
            .address(UUID.randomUUID().toString())
            .phone(UUID.randomUUID().toString())
            .email(UUID.randomUUID().toString())
            .image(UUID.randomUUID().toString());
    }
}
