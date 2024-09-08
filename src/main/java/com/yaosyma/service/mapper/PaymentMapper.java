package com.yaosyma.service.mapper;

import com.yaosyma.domain.Client;
import com.yaosyma.domain.Order;
import com.yaosyma.domain.Payment;
import com.yaosyma.service.dto.ClientDTO;
import com.yaosyma.service.dto.OrderDTO;
import com.yaosyma.service.dto.PaymentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Payment} and its DTO {@link PaymentDTO}.
 */
@Mapper(componentModel = "spring")
public interface PaymentMapper extends EntityMapper<PaymentDTO, Payment> {
    @Mapping(target = "order", source = "order", qualifiedByName = "orderOrderNumber")
    @Mapping(target = "client", source = "client", qualifiedByName = "clientEmail")
    PaymentDTO toDto(Payment s);

    @Named("orderOrderNumber")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "orderNumber", source = "orderNumber")
    OrderDTO toDtoOrderOrderNumber(Order order);

    @Named("clientEmail")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "email", source = "email")
    ClientDTO toDtoClientEmail(Client client);
}
