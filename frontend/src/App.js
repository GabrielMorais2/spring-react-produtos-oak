import React, {useEffect, useState} from 'react';
import './App.css';
import Formulario from './components/Formulario';
import Tabela from './components/Tabela';
import Paginacao from "./components/Paginacao";
import ProductListService from "./service/ProductListService";

function App() {

    const produto = {
        id: 0,
        nameProduct: '',
        description: '',
        value: 0,
        availableSale: 'SIM'
    };

    const [objProduto, setObjProduto] = useState(produto);
    const [mostrarFormulario, setMostrarFormulario] = useState(true);
    const [mostrarBotoes, setMostrarBotoes] = useState(true);
    const [produtos, setProdutos] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const produtosPerPage = 10;

    useEffect(() => {
        fetchProducts(); // eslint-disable-next-line
    }, [pageNumber]);

    const fetchProducts = () => {
        ProductListService.fetchProducts(pageNumber, produtosPerPage)
            .then(data => {
                setProdutos(data.content);
                setTotalPages(data.totalPages);
            });
    };

    const aoDigitar = (e) => {
        let valor = e.target.value;
        if (e.target.name === "value") {
            valor = valor.replace(/[^\d.]/g, '');
        }
        setObjProduto({ ...objProduto, [e.target.name]: e.target.name === "value" ? valor : e.target.value });
    }
    const cadastrarProduto = () => {
        ProductListService.addProduct(objProduto)
            .then(response => {
                if (response.message !== undefined) {
                    if (response.errors !== undefined && response.errors.length > 0) {
                        console.log(response.errors[0].message);
                    } else {
                        console.log(response.message);
                    }
                } else {
                    alert('Produto cadastrado com sucesso!');
                    fetchProducts();
                    setMostrarFormulario(false);
                }
            });
    };

    const removerProduto = () => {
        ProductListService.deleteProduct(objProduto.id)
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
        ProductListService.updateProduct(objProduto)
            .then(response => {
                if (response.message !== undefined) {
                    if (response.errors !== undefined && response.errors.length > 0) {
                        console.log(response.errors[0].message);
                    } else {
                        console.log(response.message);
                    }
                } else {
                    alert('Produto alterado com sucesso');

                    setProdutos(produtos.map(produto => {
                        if (produto.id === objProduto.id) {
                            return objProduto;
                        }
                        return produto;
                    }));

                    mostrarListagemDeProdutos();

                }
            })
            .catch(error => {
                console.error('Erro ao alterar produto:', error);
            });
    };


    const limparFormulario = () => {
        setObjProduto(produto);
        setMostrarBotoes(true);
        setMostrarFormulario(true);
    };



    const mostrarListagemDeProdutos = () => {
        setMostrarFormulario(false);
        fetchProducts();
    };

    const selecionarProduto = (indice) => {
        setMostrarFormulario(true);
        setMostrarBotoes(false);
        setObjProduto(produtos[indice]);
    };

    const pageCount = totalPages;

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className="div-body">
            {mostrarFormulario ? (
                <Formulario
                    botao={mostrarBotoes}
                    eventoTeclado={aoDigitar}
                    cadastrarProduto={cadastrarProduto}
                    obj={objProduto}
                    remover={removerProduto}
                    alterar={alterarProduto}
                    cancelar={limparFormulario}
                    listarProdutos={mostrarListagemDeProdutos}
                />
            ) : (
                <>
                    <Tabela vetor={produtos} selecionar={selecionarProduto} cancelar={limparFormulario}/>
                    <Paginacao pageCount={pageCount} changePage={changePage} />
                </>
            )}
        </div>
    );
}

export default App;
