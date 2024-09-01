package com.yaosyma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.yaosyma.domain.enumeration.TransportStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;

/**
 * A Transport.
 */
@Entity
@Table(name = "transport")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Transport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "vehicle_type")
    private String vehicleType;

    @Column(name = "driver_name")
    private String driverName;

    @Column(name = "driver_phone")
    private String driverPhone;

    @Column(name = "tracking_number", unique = true)
    private String trackingNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private TransportStatus status;

    @Column(name = "estimated_delivery_time")
    private Instant estimatedDeliveryTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "store", "user" }, allowSetters = true)
    private Order order;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Transport id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVehicleType() {
        return this.vehicleType;
    }

    public Transport vehicleType(String vehicleType) {
        this.setVehicleType(vehicleType);
        return this;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getDriverName() {
        return this.driverName;
    }

    public Transport driverName(String driverName) {
        this.setDriverName(driverName);
        return this;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public String getDriverPhone() {
        return this.driverPhone;
    }

    public Transport driverPhone(String driverPhone) {
        this.setDriverPhone(driverPhone);
        return this;
    }

    public void setDriverPhone(String driverPhone) {
        this.driverPhone = driverPhone;
    }

    public String getTrackingNumber() {
        return this.trackingNumber;
    }

    public Transport trackingNumber(String trackingNumber) {
        this.setTrackingNumber(trackingNumber);
        return this;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public TransportStatus getStatus() {
        return this.status;
    }

    public Transport status(TransportStatus status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(TransportStatus status) {
        this.status = status;
    }

    public Instant getEstimatedDeliveryTime() {
        return this.estimatedDeliveryTime;
    }

    public Transport estimatedDeliveryTime(Instant estimatedDeliveryTime) {
        this.setEstimatedDeliveryTime(estimatedDeliveryTime);
        return this;
    }

    public void setEstimatedDeliveryTime(Instant estimatedDeliveryTime) {
        this.estimatedDeliveryTime = estimatedDeliveryTime;
    }

    public Order getOrder() {
        return this.order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Transport order(Order order) {
        this.setOrder(order);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Transport)) {
            return false;
        }
        return getId() != null && getId().equals(((Transport) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Transport{" +
            "id=" + getId() +
            ", vehicleType='" + getVehicleType() + "'" +
            ", driverName='" + getDriverName() + "'" +
            ", driverPhone='" + getDriverPhone() + "'" +
            ", trackingNumber='" + getTrackingNumber() + "'" +
            ", status='" + getStatus() + "'" +
            ", estimatedDeliveryTime='" + getEstimatedDeliveryTime() + "'" +
            "}";
    }
}
