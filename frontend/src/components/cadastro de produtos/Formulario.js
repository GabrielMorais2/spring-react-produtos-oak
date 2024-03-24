import './Formulario.css';

function Formulario({botao, eventoTeclado, cadastrarProduto, obj, cancelar, remover, alterar, listarProdutos}){

    return(
        <form>
            <h1>Cadastro de Produto</h1>
            <div className="form-group">
                <label htmlFor="productName">Nome do Produto:</label>
                <input
                    required
                    type="text"
                    name="nameProduct"
                    placeholder='Nome'
                    value={obj.nameProduct}
                    id="productName"
                    onChange={eventoTeclado}
                    className='form-control'
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Descrição do Produto:</label>
                <textarea
                    name="description"
                    id="description"
                    value={obj.description}
                    placeholder='Descrição'
                    onChange={eventoTeclado}
                    className='form-control'
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="value">Valor do Produto:</label>
                <input
                    type="number"
                    name="value"
                    placeholder='Valor'
                    value={obj.value}
                    id="value"
                    onChange={eventoTeclado}
                    min="0"
                    step="0.01" // Allow decimal values (optional)
                    className='form-control'
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="availableSale">Disponível para Venda:</label>
                <select name="Venda Disponivel" id="availableSale" value={obj.availableSale} onChange={eventoTeclado} className='form-control'>
                    <option value="SIM">Sim</option>
                    <option value="NAO">Não</option>
                </select>
            </div>
            {
                botao
                    ?
                    <div>
                        <input type='button' value='Cadastrar' onClick={cadastrarProduto} className='btn btn-primary'/>
                        <input type='button' onClick={listarProdutos} value='Listar produtos' className='btn btn-secondary'/>
                    </div>
                    :
                    <div>
                        <input type='button' onClick={alterar} value='Alterar' className='btn btn-warning'/>
                        <input type='button' onClick={remover} value='Remover' className='btn btn-danger'/>
                        <input type='button' onClick={cancelar} value='Cancelar' className='btn btn-secondary'/>
                    </div>
            }

        </form>
    )
}

export default Formulario;