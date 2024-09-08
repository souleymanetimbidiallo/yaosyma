package com.yaosyma.service.mapper;

import com.yaosyma.domain.Driver;
import com.yaosyma.domain.Vehicle;
import com.yaosyma.service.dto.DriverDTO;
import com.yaosyma.service.dto.VehicleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Vehicle} and its DTO {@link VehicleDTO}.
 */
@Mapper(componentModel = "spring")
public interface VehicleMapper extends EntityMapper<VehicleDTO, Vehicle> {
    @Mapping(target = "driver", source = "driver", qualifiedByName = "driverFirstName")
    VehicleDTO toDto(Vehicle s);

    @Named("driverFirstName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "firstName", source = "firstName")
    DriverDTO toDtoDriverFirstName(Driver driver);
}
