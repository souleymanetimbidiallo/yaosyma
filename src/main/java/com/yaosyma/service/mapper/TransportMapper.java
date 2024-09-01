package com.yaosyma.service.mapper;

import com.yaosyma.domain.Order;
import com.yaosyma.domain.Transport;
import com.yaosyma.service.dto.OrderDTO;
import com.yaosyma.service.dto.TransportDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Transport} and its DTO {@link TransportDTO}.
 */
@Mapper(componentModel = "spring")
public interface TransportMapper extends EntityMapper<TransportDTO, Transport> {
    @Mapping(target = "order", source = "order", qualifiedByName = "orderId")
    TransportDTO toDto(Transport s);

    @Named("orderId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    OrderDTO toDtoOrderId(Order order);
}
