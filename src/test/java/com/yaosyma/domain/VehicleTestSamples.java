package com.yaosyma.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class VehicleTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Vehicle getVehicleSample1() {
        return new Vehicle()
            .id(1L)
            .vehicleName("vehicleName1")
            .licensePlate("licensePlate1")
            .serialNumber("serialNumber1")
            .insurance("insurance1")
            .vehicleType("vehicleType1")
            .gpsTracker("gpsTracker1");
    }

    public static Vehicle getVehicleSample2() {
        return new Vehicle()
            .id(2L)
            .vehicleName("vehicleName2")
            .licensePlate("licensePlate2")
            .serialNumber("serialNumber2")
            .insurance("insurance2")
            .vehicleType("vehicleType2")
            .gpsTracker("gpsTracker2");
    }

    public static Vehicle getVehicleRandomSampleGenerator() {
        return new Vehicle()
            .id(longCount.incrementAndGet())
            .vehicleName(UUID.randomUUID().toString())
            .licensePlate(UUID.randomUUID().toString())
            .serialNumber(UUID.randomUUID().toString())
            .insurance(UUID.randomUUID().toString())
            .vehicleType(UUID.randomUUID().toString())
            .gpsTracker(UUID.randomUUID().toString());
    }
}
