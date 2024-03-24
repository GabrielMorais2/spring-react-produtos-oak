import React, {useEffect, useState} from 'react';
import './App.css';
import Formulario from './components/cadastro de produtos/Formulario';
import Tabela from './components/listagem de produtos/Tabela';
import ReactPaginate from 'react-paginate';

function App() {
    const produto = {
        id: 0,
        nameProduct: '',
        description: '',
        value: 0,
        availableSale: 'SIM'
    }

    // UseState
    const [mostrarFormulario, setMostrarFormulario] = useState(true);
    const [mostrarBotoes, setMostrarBotoes] = useState(true);
    const [produtos, setProdutos] = useState([]);
    const [objProduto, setObjProduto] = useState((produto));
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const produtosPerPage = 10;

    useEffect(() => {
        fetchProducts();
    }, [pageNumber]);

    const fetchProducts = () => {
        fetch(`http://localhost:8080/v1/products?page=${pageNumber}&size=${produtosPerPage}&sort=value,desc`) // Adiciona o parâmetro sort para ordenar por valor em ordem decrescente
            .then(response => response.json())
            .then(data => {
                setProdutos(data.content);
                setTotalPages(data.totalPages);
            })
            .catch(error => console.error('Erro ao buscar produtos:', error));
    };

    const aoDigitar = (e) => {
        setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
    }

    const cadastrarProduto = () => {
        fetch('http://localhost:8080/v1/products', {
            method:'post',
            body:JSON.stringify(objProduto),
            headers:{
                'Content-type':'application/json',
                'Accept':'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.message !== undefined) {
                    if(response.errors !== undefined && response.errors.length > 0){
                        alert(response.errors[0].message);
                    } else {
                        alert(response.message);
                    }
                } else {
                    alert('Produto cadastrado com sucesso!');
                    limparFormulario();
                    fetchProducts(); // Atualiza a lista de produtos
                    setMostrarFormulario(false); // Oculta o formulário após cadastrar um produto
                }
            })
    }

    const removerProduto = () => {
        fetch(`http://localhost:8080/v1/products/${objProduto.id}`, {
            method: 'delete',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(() => {
                alert('Produto deletado com sucesso');
                setProdutos(produtos.filter(produto => produto.id !== objProduto.id));
                limparFormulario();
            })
            .catch(error => {
                console.error('Erro ao deletar produto:', error);
            });
    };

    const alterarProduto = () => {
        fetch(`http://localhost:8080/v1/products/${objProduto.id}`, {
            method:'put',
            body:JSON.stringify(objProduto),
            headers:{
                'Content-type':'application/json',
                'Accept':'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.message !== undefined) {
                    if (response.errors !== undefined && response.errors.length > 0) {
                        alert(response.errors[0].message);
                    } else {
                        alert(response.message);
                    }
                } else {
                    alert('Produto alterado com sucesso');

                    setProdutos(produtos.map(produto => {
                        if (produto.id === objProduto.id) {
                            return objProduto;
                        }
                        return produto;
                    }));

                    setMostrarFormulario(false);
                }
            })
            .catch(error => {
                console.error('Erro ao alterar produto:', error);
            });
    }
    const limparFormulario = () => {
        setMostrarBotoes(true);
        setMostrarFormulario(true);
        setObjProduto(produto);
    }

    const mostrarCadastroDeProdutos = () => {
        setMostrarBotoes(true);
        setMostrarFormulario(true);
    }

    const mostrarlListagemDeProdutos = () => {
        setMostrarBotoes(false);
        setMostrarFormulario(false);
        fetchProducts();
    }
    const selecionarProduto = (indice) => {
        setMostrarFormulario(true);
        setMostrarBotoes(false);
        setObjProduto(produtos[indice]);
    }

    const pageCount = totalPages;

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };


    return (
        <div>
            {mostrarFormulario ? (
                <Formulario  botao={mostrarBotoes} eventoTeclado={aoDigitar} cadastrarProduto={cadastrarProduto} obj={objProduto} remover={removerProduto} alterar={alterarProduto} cancelar={limparFormulario} listarProdutos={mostrarlListagemDeProdutos} />
            ) : (
                <>
                    <Tabela vetor={produtos} selecionar={selecionarProduto} cancelar={mostrarCadastroDeProdutos}/>
                    <ReactPaginate
                        previousLabel={"Anterior"}
                        nextLabel={"Próximo"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__item"}
                        nextLinkClassName={"pagination__item"}
                        disabledClassName={"pagination__item--disabled"}
                        activeClassName={"pagination__item--active"}
                    />
                </>
            )}
        </div>
    );
}

export default App;
