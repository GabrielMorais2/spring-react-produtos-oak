package com.gabriel.moraes.oak.produtos.domain.payloads;

import com.gabriel.moraes.oak.produtos.domain.AvailableSale;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductsRequest {

    @NotBlank
    private String nameProduct;
    @NotBlank
    private String description;
    @NotNull
    @Positive
    private BigDecimal value;
    @NotNull
    private AvailableSale availableSale;

}
