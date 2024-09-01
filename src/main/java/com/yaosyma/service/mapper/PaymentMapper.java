package com.yaosyma.service.mapper;

import com.yaosyma.domain.Order;
import com.yaosyma.domain.Payment;
import com.yaosyma.domain.User;
import com.yaosyma.service.dto.OrderDTO;
import com.yaosyma.service.dto.PaymentDTO;
import com.yaosyma.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Payment} and its DTO {@link PaymentDTO}.
 */
@Mapper(componentModel = "spring")
public interface PaymentMapper extends EntityMapper<PaymentDTO, Payment> {
    @Mapping(target = "order", source = "order", qualifiedByName = "orderId")
    @Mapping(target = "user", source = "user", qualifiedByName = "userLogin")
    PaymentDTO toDto(Payment s);

    @Named("orderId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    OrderDTO toDtoOrderId(Order order);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);
}
