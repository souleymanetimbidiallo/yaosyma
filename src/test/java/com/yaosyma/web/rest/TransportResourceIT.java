package com.yaosyma.web.rest;

import static com.yaosyma.domain.TransportAsserts.*;
import static com.yaosyma.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yaosyma.IntegrationTest;
import com.yaosyma.domain.Transport;
import com.yaosyma.domain.enumeration.TransportStatus;
import com.yaosyma.repository.TransportRepository;
import com.yaosyma.service.dto.TransportDTO;
import com.yaosyma.service.mapper.TransportMapper;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link TransportResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TransportResourceIT {

    private static final String DEFAULT_VEHICLE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_VEHICLE_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_DRIVER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DRIVER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DRIVER_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_DRIVER_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_TRACKING_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_TRACKING_NUMBER = "BBBBBBBBBB";

    private static final TransportStatus DEFAULT_STATUS = TransportStatus.SCHEDULED;
    private static final TransportStatus UPDATED_STATUS = TransportStatus.IN_TRANSIT;

    private static final Instant DEFAULT_ESTIMATED_DELIVERY_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ESTIMATED_DELIVERY_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/transports";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private TransportRepository transportRepository;

    @Autowired
    private TransportMapper transportMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTransportMockMvc;

    private Transport transport;

    private Transport insertedTransport;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Transport createEntity(EntityManager em) {
        Transport transport = new Transport()
            .vehicleType(DEFAULT_VEHICLE_TYPE)
            .driverName(DEFAULT_DRIVER_NAME)
            .driverPhone(DEFAULT_DRIVER_PHONE)
            .trackingNumber(DEFAULT_TRACKING_NUMBER)
            .status(DEFAULT_STATUS)
            .estimatedDeliveryTime(DEFAULT_ESTIMATED_DELIVERY_TIME);
        return transport;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Transport createUpdatedEntity(EntityManager em) {
        Transport transport = new Transport()
            .vehicleType(UPDATED_VEHICLE_TYPE)
            .driverName(UPDATED_DRIVER_NAME)
            .driverPhone(UPDATED_DRIVER_PHONE)
            .trackingNumber(UPDATED_TRACKING_NUMBER)
            .status(UPDATED_STATUS)
            .estimatedDeliveryTime(UPDATED_ESTIMATED_DELIVERY_TIME);
        return transport;
    }

    @BeforeEach
    public void initTest() {
        transport = createEntity(em);
    }

    @AfterEach
    public void cleanup() {
        if (insertedTransport != null) {
            transportRepository.delete(insertedTransport);
            insertedTransport = null;
        }
    }

    @Test
    @Transactional
    void createTransport() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Transport
        TransportDTO transportDTO = transportMapper.toDto(transport);
        var returnedTransportDTO = om.readValue(
            restTransportMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(transportDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            TransportDTO.class
        );

        // Validate the Transport in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedTransport = transportMapper.toEntity(returnedTransportDTO);
        assertTransportUpdatableFieldsEquals(returnedTransport, getPersistedTransport(returnedTransport));

        insertedTransport = returnedTransport;
    }

    @Test
    @Transactional
    void createTransportWithExistingId() throws Exception {
        // Create the Transport with an existing ID
        transport.setId(1L);
        TransportDTO transportDTO = transportMapper.toDto(transport);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransportMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(transportDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Transport in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllTransports() throws Exception {
        // Initialize the database
        insertedTransport = transportRepository.saveAndFlush(transport);

        // Get all the transportList
        restTransportMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transport.getId().intValue())))
            .andExpect(jsonPath("$.[*].vehicleType").value(hasItem(DEFAULT_VEHICLE_TYPE)))
            .andExpect(jsonPath("$.[*].driverName").value(hasItem(DEFAULT_DRIVER_NAME)))
            .andExpect(jsonPath("$.[*].driverPhone").value(hasItem(DEFAULT_DRIVER_PHONE)))
            .andExpect(jsonPath("$.[*].trackingNumber").value(hasItem(DEFAULT_TRACKING_NUMBER)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].estimatedDeliveryTime").value(hasItem(DEFAULT_ESTIMATED_DELIVERY_TIME.toString())));
    }

    @Test
    @Transactional
    void getTransport() throws Exception {
        // Initialize the database
        insertedTransport = transportRepository.saveAndFlush(transport);

        // Get the transport
        restTransportMockMvc
            .perform(get(ENTITY_API_URL_ID, transport.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(transport.getId().intValue()))
            .andExpect(jsonPath("$.vehicleType").value(DEFAULT_VEHICLE_TYPE))
            .andExpect(jsonPath("$.driverName").value(DEFAULT_DRIVER_NAME))
            .andExpect(jsonPath("$.driverPhone").value(DEFAULT_DRIVER_PHONE))
            .andExpect(jsonPath("$.trackingNumber").value(DEFAULT_TRACKING_NUMBER))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.estimatedDeliveryTime").value(DEFAULT_ESTIMATED_DELIVERY_TIME.toString()));
    }

    @Test
    @Transactional
    void getNonExistingTransport() throws Exception {
        // Get the transport
        restTransportMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingTransport() throws Exception {
        // Initialize the database
        insertedTransport = transportRepository.saveAndFlush(transport);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the transport
        Transport updatedTransport = transportRepository.findById(transport.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedTransport are not directly saved in db
        em.detach(updatedTransport);
        updatedTransport
            .vehicleType(UPDATED_VEHICLE_TYPE)
            .driverName(UPDATED_DRIVER_NAME)
            .driverPhone(UPDATED_DRIVER_PHONE)
            .trackingNumber(UPDATED_TRACKING_NUMBER)
            .status(UPDATED_STATUS)
            .estimatedDeliveryTime(UPDATED_ESTIMATED_DELIVERY_TIME);
        TransportDTO transportDTO = transportMapper.toDto(updatedTransport);

        restTransportMockMvc
            .perform(
                put(ENTITY_API_URL_ID, transportDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(transportDTO))
            )
            .andExpect(status().isOk());

        // Validate the Transport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedTransportToMatchAllProperties(updatedTransport);
    }

    @Test
    @Transactional
    void putNonExistingTransport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        transport.setId(longCount.incrementAndGet());

        // Create the Transport
        TransportDTO transportDTO = transportMapper.toDto(transport);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransportMockMvc
            .perform(
                put(ENTITY_API_URL_ID, transportDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(transportDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Transport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTransport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        transport.setId(longCount.incrementAndGet());

        // Create the Transport
        TransportDTO transportDTO = transportMapper.toDto(transport);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTransportMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(transportDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Transport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTransport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        transport.setId(longCount.incrementAndGet());

        // Create the Transport
        TransportDTO transportDTO = transportMapper.toDto(transport);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTransportMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(transportDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Transport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTransportWithPatch() throws Exception {
        // Initialize the database
        insertedTransport = transportRepository.saveAndFlush(transport);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the transport using partial update
        Transport partialUpdatedTransport = new Transport();
        partialUpdatedTransport.setId(transport.getId());

        partialUpdatedTransport.driverName(UPDATED_DRIVER_NAME).status(UPDATED_STATUS);

        restTransportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTransport.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTransport))
            )
            .andExpect(status().isOk());

        // Validate the Transport in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTransportUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedTransport, transport),
            getPersistedTransport(transport)
        );
    }

    @Test
    @Transactional
    void fullUpdateTransportWithPatch() throws Exception {
        // Initialize the database
        insertedTransport = transportRepository.saveAndFlush(transport);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the transport using partial update
        Transport partialUpdatedTransport = new Transport();
        partialUpdatedTransport.setId(transport.getId());

        partialUpdatedTransport
            .vehicleType(UPDATED_VEHICLE_TYPE)
            .driverName(UPDATED_DRIVER_NAME)
            .driverPhone(UPDATED_DRIVER_PHONE)
            .trackingNumber(UPDATED_TRACKING_NUMBER)
            .status(UPDATED_STATUS)
            .estimatedDeliveryTime(UPDATED_ESTIMATED_DELIVERY_TIME);

        restTransportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTransport.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedTransport))
            )
            .andExpect(status().isOk());

        // Validate the Transport in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertTransportUpdatableFieldsEquals(partialUpdatedTransport, getPersistedTransport(partialUpdatedTransport));
    }

    @Test
    @Transactional
    void patchNonExistingTransport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        transport.setId(longCount.incrementAndGet());

        // Create the Transport
        TransportDTO transportDTO = transportMapper.toDto(transport);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTransportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, transportDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(transportDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Transport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTransport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        transport.setId(longCount.incrementAndGet());

        // Create the Transport
        TransportDTO transportDTO = transportMapper.toDto(transport);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTransportMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(transportDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Transport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTransport() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        transport.setId(longCount.incrementAndGet());

        // Create the Transport
        TransportDTO transportDTO = transportMapper.toDto(transport);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTransportMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(transportDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Transport in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTransport() throws Exception {
        // Initialize the database
        insertedTransport = transportRepository.saveAndFlush(transport);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the transport
        restTransportMockMvc
            .perform(delete(ENTITY_API_URL_ID, transport.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return transportRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Transport getPersistedTransport(Transport transport) {
        return transportRepository.findById(transport.getId()).orElseThrow();
    }

    protected void assertPersistedTransportToMatchAllProperties(Transport expectedTransport) {
        assertTransportAllPropertiesEquals(expectedTransport, getPersistedTransport(expectedTransport));
    }

    protected void assertPersistedTransportToMatchUpdatableProperties(Transport expectedTransport) {
        assertTransportAllUpdatablePropertiesEquals(expectedTransport, getPersistedTransport(expectedTransport));
    }
}
