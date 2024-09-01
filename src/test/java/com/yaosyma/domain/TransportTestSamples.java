package com.yaosyma.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class TransportTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Transport getTransportSample1() {
        return new Transport()
            .id(1L)
            .vehicleType("vehicleType1")
            .driverName("driverName1")
            .driverPhone("driverPhone1")
            .trackingNumber("trackingNumber1");
    }

    public static Transport getTransportSample2() {
        return new Transport()
            .id(2L)
            .vehicleType("vehicleType2")
            .driverName("driverName2")
            .driverPhone("driverPhone2")
            .trackingNumber("trackingNumber2");
    }

    public static Transport getTransportRandomSampleGenerator() {
        return new Transport()
            .id(longCount.incrementAndGet())
            .vehicleType(UUID.randomUUID().toString())
            .driverName(UUID.randomUUID().toString())
            .driverPhone(UUID.randomUUID().toString())
            .trackingNumber(UUID.randomUUID().toString());
    }
}
