package com.yaosyma.service.mapper;

import static com.yaosyma.domain.DriverAsserts.*;
import static com.yaosyma.domain.DriverTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DriverMapperTest {

    private DriverMapper driverMapper;

    @BeforeEach
    void setUp() {
        driverMapper = new DriverMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getDriverSample1();
        var actual = driverMapper.toEntity(driverMapper.toDto(expected));
        assertDriverAllPropertiesEquals(expected, actual);
    }
}
