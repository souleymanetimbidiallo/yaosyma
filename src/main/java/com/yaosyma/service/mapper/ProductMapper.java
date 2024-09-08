package com.yaosyma.service.mapper;

import com.yaosyma.domain.Category;
import com.yaosyma.domain.Product;
import com.yaosyma.domain.Supplier;
import com.yaosyma.service.dto.CategoryDTO;
import com.yaosyma.service.dto.ProductDTO;
import com.yaosyma.service.dto.SupplierDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Product} and its DTO {@link ProductDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {
    @Mapping(target = "category", source = "category", qualifiedByName = "categoryName")
    @Mapping(target = "supplier", source = "supplier", qualifiedByName = "supplierName")
    ProductDTO toDto(Product s);

    @Named("categoryName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    CategoryDTO toDtoCategoryName(Category category);

    @Named("supplierName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    SupplierDTO toDtoSupplierName(Supplier supplier);
}
