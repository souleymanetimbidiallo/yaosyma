package com.yaosyma.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class DriverTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Driver getDriverSample1() {
        return new Driver()
            .id(1L)
            .firstName("firstName1")
            .lastName("lastName1")
            .address("address1")
            .phone("phone1")
            .email("email1")
            .password("password1");
    }

    public static Driver getDriverSample2() {
        return new Driver()
            .id(2L)
            .firstName("firstName2")
            .lastName("lastName2")
            .address("address2")
            .phone("phone2")
            .email("email2")
            .password("password2");
    }

    public static Driver getDriverRandomSampleGenerator() {
        return new Driver()
            .id(longCount.incrementAndGet())
            .firstName(UUID.randomUUID().toString())
            .lastName(UUID.randomUUID().toString())
            .address(UUID.randomUUID().toString())
            .phone(UUID.randomUUID().toString())
            .email(UUID.randomUUID().toString())
            .password(UUID.randomUUID().toString());
    }
}
