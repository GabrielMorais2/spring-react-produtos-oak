package com.gabriel.moraes.oak.produtos.domain;

import com.gabriel.moraes.oak.produtos.domain.payloads.ProductsRequest;
import com.gabriel.moraes.oak.produtos.domain.payloads.ProductsResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/products")
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductsResponse> createProduct(@Valid @RequestBody ProductsRequest productsRequest){
        return new ResponseEntity<>(productService.createProduct(productsRequest), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductsResponse> getProductById(@PathVariable Long id) {
        return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<ProductsResponse>> getAllProducts(Pageable pageable) {
        return new ResponseEntity<>(productService.getAllProducts(pageable), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductsResponse> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductsRequest productsRequest) {
        ProductsResponse updateProduct = productService.updateProduct(id, productsRequest);
        return new ResponseEntity<>(updateProduct, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable Long id) {
        productService.deleteProductById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
