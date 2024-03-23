package com.gabriel.moraes.oak.produtos.domain;

import lombok.Getter;

@Getter
public enum AvailableSale {
    SIM(1), NAO(0);

    private final int value;

    AvailableSale(int value){
        this.value = value;
    }

}
