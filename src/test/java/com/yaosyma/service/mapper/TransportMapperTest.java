package com.yaosyma.service.mapper;

import static com.yaosyma.domain.TransportAsserts.*;
import static com.yaosyma.domain.TransportTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TransportMapperTest {

    private TransportMapper transportMapper;

    @BeforeEach
    void setUp() {
        transportMapper = new TransportMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getTransportSample1();
        var actual = transportMapper.toEntity(transportMapper.toDto(expected));
        assertTransportAllPropertiesEquals(expected, actual);
    }
}
