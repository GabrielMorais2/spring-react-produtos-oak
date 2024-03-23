package com.gabriel.moraes.oak.produtos.exception.validationError;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class ValidationErrorResponse {

    private int statusCode;
    private LocalDateTime timestamp;
    private String message;
    private List<ValidationError> errors;

}