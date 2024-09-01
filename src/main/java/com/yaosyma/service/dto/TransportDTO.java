package com.yaosyma.service.dto;

import com.yaosyma.domain.enumeration.TransportStatus;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.yaosyma.domain.Transport} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TransportDTO implements Serializable {

    private Long id;

    private String vehicleType;

    private String driverName;

    private String driverPhone;

    private String trackingNumber;

    private TransportStatus status;

    private Instant estimatedDeliveryTime;

    private OrderDTO order;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public String getDriverPhone() {
        return driverPhone;
    }

    public void setDriverPhone(String driverPhone) {
        this.driverPhone = driverPhone;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public TransportStatus getStatus() {
        return status;
    }

    public void setStatus(TransportStatus status) {
        this.status = status;
    }

    public Instant getEstimatedDeliveryTime() {
        return estimatedDeliveryTime;
    }

    public void setEstimatedDeliveryTime(Instant estimatedDeliveryTime) {
        this.estimatedDeliveryTime = estimatedDeliveryTime;
    }

    public OrderDTO getOrder() {
        return order;
    }

    public void setOrder(OrderDTO order) {
        this.order = order;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TransportDTO)) {
            return false;
        }

        TransportDTO transportDTO = (TransportDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, transportDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TransportDTO{" +
            "id=" + getId() +
            ", vehicleType='" + getVehicleType() + "'" +
            ", driverName='" + getDriverName() + "'" +
            ", driverPhone='" + getDriverPhone() + "'" +
            ", trackingNumber='" + getTrackingNumber() + "'" +
            ", status='" + getStatus() + "'" +
            ", estimatedDeliveryTime='" + getEstimatedDeliveryTime() + "'" +
            ", order=" + getOrder() +
            "}";
    }
}
