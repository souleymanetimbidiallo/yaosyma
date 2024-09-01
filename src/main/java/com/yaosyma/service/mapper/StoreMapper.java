package com.yaosyma.service.mapper;

import com.yaosyma.domain.Store;
import com.yaosyma.domain.User;
import com.yaosyma.service.dto.StoreDTO;
import com.yaosyma.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Store} and its DTO {@link StoreDTO}.
 */
@Mapper(componentModel = "spring")
public interface StoreMapper extends EntityMapper<StoreDTO, Store> {
    @Mapping(target = "owner", source = "owner", qualifiedByName = "userLogin")
    StoreDTO toDto(Store s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);
}
