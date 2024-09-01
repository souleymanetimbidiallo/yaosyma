package com.yaosyma.domain;

import static com.yaosyma.domain.OrderTestSamples.*;
import static com.yaosyma.domain.TransportTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.yaosyma.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TransportTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Transport.class);
        Transport transport1 = getTransportSample1();
        Transport transport2 = new Transport();
        assertThat(transport1).isNotEqualTo(transport2);

        transport2.setId(transport1.getId());
        assertThat(transport1).isEqualTo(transport2);

        transport2 = getTransportSample2();
        assertThat(transport1).isNotEqualTo(transport2);
    }

    @Test
    void orderTest() {
        Transport transport = getTransportRandomSampleGenerator();
        Order orderBack = getOrderRandomSampleGenerator();

        transport.setOrder(orderBack);
        assertThat(transport.getOrder()).isEqualTo(orderBack);

        transport.order(null);
        assertThat(transport.getOrder()).isNull();
    }
}
