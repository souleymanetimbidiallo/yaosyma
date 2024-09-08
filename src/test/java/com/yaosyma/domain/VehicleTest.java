package com.yaosyma.domain;

import static com.yaosyma.domain.DriverTestSamples.*;
import static com.yaosyma.domain.VehicleTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.yaosyma.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VehicleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vehicle.class);
        Vehicle vehicle1 = getVehicleSample1();
        Vehicle vehicle2 = new Vehicle();
        assertThat(vehicle1).isNotEqualTo(vehicle2);

        vehicle2.setId(vehicle1.getId());
        assertThat(vehicle1).isEqualTo(vehicle2);

        vehicle2 = getVehicleSample2();
        assertThat(vehicle1).isNotEqualTo(vehicle2);
    }

    @Test
    void driverTest() {
        Vehicle vehicle = getVehicleRandomSampleGenerator();
        Driver driverBack = getDriverRandomSampleGenerator();

        vehicle.setDriver(driverBack);
        assertThat(vehicle.getDriver()).isEqualTo(driverBack);

        vehicle.driver(null);
        assertThat(vehicle.getDriver()).isNull();
    }
}
