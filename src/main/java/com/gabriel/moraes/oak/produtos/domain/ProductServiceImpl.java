package com.gabriel.moraes.oak.produtos.domain;

import com.gabriel.moraes.oak.produtos.domain.payloads.ProductsRequest;
import com.gabriel.moraes.oak.produtos.domain.payloads.ProductsResponse;
import com.gabriel.moraes.oak.produtos.exception.ProductNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@AllArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ModelMapper mapper;

    @Override
    public ProductsResponse createProduct(ProductsRequest productsRequest) {
        validate(productsRequest);

        Product product = mapper.map(productsRequest, Product.class);
        return  mapper.map(productRepository.save(product), ProductsResponse.class);
    }

    @Override
    public ProductsResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + id));

        return mapper.map(product, ProductsResponse.class);
    }

    @Override
    public Page<ProductsResponse> getAllProducts(Pageable pageable) {
        Page<Product> productPage = productRepository.findAll(pageable);

        return productPage.map(product -> mapper.map(product, ProductsResponse.class));
    }

    @Override
    public ProductsResponse updateProduct(Long id, ProductsRequest productsRequest) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + id));

        validate(productsRequest);

        Product updatedProduct = mapper.map(productsRequest, Product.class);
        updatedProduct.setId(existingProduct.getId());

        return mapper.map(productRepository.save(updatedProduct), ProductsResponse.class);
    }

    @Override
    public void deleteProductById(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    public void validate(ProductsRequest request) {
        BigDecimal value = request.getValue();
        AvailableSale availableSale = request.getAvailableSale();

        if (value.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Value must be greater than 0");
        }

        if (!(availableSale.equals(AvailableSale.SIM) || availableSale.equals(AvailableSale.NAO))) {
            throw new IllegalArgumentException("Available sale must be 'SIM' or 'NAO'");
        }
    }
}
