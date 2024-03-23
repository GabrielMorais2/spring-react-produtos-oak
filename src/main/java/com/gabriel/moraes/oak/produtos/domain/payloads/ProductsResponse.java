package com.gabriel.moraes.oak.produtos.domain.payloads;

import com.gabriel.moraes.oak.produtos.domain.AvailableSale;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductsResponse {

    private Long id;
    private String nameProduct;
    private String description;
    private BigDecimal value;
    private AvailableSale availableSale;
}
