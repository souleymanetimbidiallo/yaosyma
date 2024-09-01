package com.yaosyma.service.mapper;

import com.yaosyma.domain.Order;
import com.yaosyma.domain.Store;
import com.yaosyma.domain.User;
import com.yaosyma.service.dto.OrderDTO;
import com.yaosyma.service.dto.StoreDTO;
import com.yaosyma.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Order} and its DTO {@link OrderDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrderMapper extends EntityMapper<OrderDTO, Order> {
    @Mapping(target = "store", source = "store", qualifiedByName = "storeName")
    @Mapping(target = "user", source = "user", qualifiedByName = "userLogin")
    OrderDTO toDto(Order s);

    @Named("storeName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    StoreDTO toDtoStoreName(Store store);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);
}
