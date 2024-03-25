class ProductListService {
    static fetchProducts(pageNumber, produtosPerPage) {
        return fetch(`http://localhost:8080/v1/products?page=${pageNumber}&size=${produtosPerPage}&sort=value,desc`)
            .then(response => response.json())
            .catch(error => console.error('Erro ao buscar produtos:', error));
    }

    static addProduct(objProduto) {
        return fetch('http://localhost:8080/v1/products', {
            method: 'post',
            body: JSON.stringify(objProduto),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => response.json());
    }

    static deleteProduct(productId) {
        return fetch(`http://localhost:8080/v1/products/${productId}`, {
            method: 'delete',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    static updateProduct(objProduto) {
        return fetch(`http://localhost:8080/v1/products/${objProduto.id}`, {
            method: 'put',
            body: JSON.stringify(objProduto),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => response.json());
    }
}

export default ProductListService;