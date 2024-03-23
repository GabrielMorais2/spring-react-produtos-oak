package com.gabriel.moraes.oak.produtos.domain;

import com.gabriel.moraes.oak.produtos.domain.payloads.ProductsRequest;
import com.gabriel.moraes.oak.produtos.domain.payloads.ProductsResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    ProductsResponse createProduct(ProductsRequest productsRequest);

    ProductsResponse getProductById(Long id);

    Page<ProductsResponse> getAllProducts(Pageable pageable);

    ProductsResponse updateProduct(Long id, ProductsRequest productsRequest);

    void deleteProductById(Long id);

}
