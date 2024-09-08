package com.yaosyma.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ClientTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Client getClientSample1() {
        return new Client()
            .id(1L)
            .firstName("firstName1")
            .lastName("lastName1")
            .companyName("companyName1")
            .email("email1")
            .phone("phone1")
            .password("password1")
            .address("address1");
    }

    public static Client getClientSample2() {
        return new Client()
            .id(2L)
            .firstName("firstName2")
            .lastName("lastName2")
            .companyName("companyName2")
            .email("email2")
            .phone("phone2")
            .password("password2")
            .address("address2");
    }

    public static Client getClientRandomSampleGenerator() {
        return new Client()
            .id(longCount.incrementAndGet())
            .firstName(UUID.randomUUID().toString())
            .lastName(UUID.randomUUID().toString())
            .companyName(UUID.randomUUID().toString())
            .email(UUID.randomUUID().toString())
            .phone(UUID.randomUUID().toString())
            .password(UUID.randomUUID().toString())
            .address(UUID.randomUUID().toString());
    }
}
