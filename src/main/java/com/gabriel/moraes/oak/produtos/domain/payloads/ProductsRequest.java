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

    @NotBlank(message = "O nome do produto é obrigatório")
    private String nameProduct;
    @NotBlank(message = "A descrição do produto é obrigatório")
    private String description;
    @NotNull(message = "O valor precisa ser positivo e maior do que zero")
    @Positive(message = "O valor precisa ser positivo e maior do que zero")
    private BigDecimal value;
    @NotNull(message = "A disponibilidade do produto é obrigatória")
    private AvailableSale availableSale;

}
