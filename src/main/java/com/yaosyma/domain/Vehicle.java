package com.yaosyma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;

/**
 * A Vehicle.
 */
@Entity
@Table(name = "vehicle")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Vehicle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "vehicle_name", nullable = false)
    private String vehicleName;

    @NotNull
    @Column(name = "license_plate", nullable = false)
    private String licensePlate;

    @NotNull
    @Column(name = "serial_number", nullable = false)
    private String serialNumber;

    @NotNull
    @Column(name = "insurance", nullable = false)
    private String insurance;

    @NotNull
    @Column(name = "vehicle_type", nullable = false)
    private String vehicleType;

    @Column(name = "gps_tracker")
    private String gpsTracker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private Driver driver;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Vehicle id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVehicleName() {
        return this.vehicleName;
    }

    public Vehicle vehicleName(String vehicleName) {
        this.setVehicleName(vehicleName);
        return this;
    }

    public void setVehicleName(String vehicleName) {
        this.vehicleName = vehicleName;
    }

    public String getLicensePlate() {
        return this.licensePlate;
    }

    public Vehicle licensePlate(String licensePlate) {
        this.setLicensePlate(licensePlate);
        return this;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getSerialNumber() {
        return this.serialNumber;
    }

    public Vehicle serialNumber(String serialNumber) {
        this.setSerialNumber(serialNumber);
        return this;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getInsurance() {
        return this.insurance;
    }

    public Vehicle insurance(String insurance) {
        this.setInsurance(insurance);
        return this;
    }

    public void setInsurance(String insurance) {
        this.insurance = insurance;
    }

    public String getVehicleType() {
        return this.vehicleType;
    }

    public Vehicle vehicleType(String vehicleType) {
        this.setVehicleType(vehicleType);
        return this;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getGpsTracker() {
        return this.gpsTracker;
    }

    public Vehicle gpsTracker(String gpsTracker) {
        this.setGpsTracker(gpsTracker);
        return this;
    }

    public void setGpsTracker(String gpsTracker) {
        this.gpsTracker = gpsTracker;
    }

    public Driver getDriver() {
        return this.driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public Vehicle driver(Driver driver) {
        this.setDriver(driver);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Vehicle)) {
            return false;
        }
        return getId() != null && getId().equals(((Vehicle) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Vehicle{" +
            "id=" + getId() +
            ", vehicleName='" + getVehicleName() + "'" +
            ", licensePlate='" + getLicensePlate() + "'" +
            ", serialNumber='" + getSerialNumber() + "'" +
            ", insurance='" + getInsurance() + "'" +
            ", vehicleType='" + getVehicleType() + "'" +
            ", gpsTracker='" + getGpsTracker() + "'" +
            "}";
    }
}
