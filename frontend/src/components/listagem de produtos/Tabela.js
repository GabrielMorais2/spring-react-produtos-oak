import './Tabela.css';

function Tabela({ vetor, selecionar, cancelar }) {
    return (
        <div>
            <table className='table table-bordered'>
                <thead className='thead-dark'>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Acões</th>
                </tr>
                </thead>

                <tbody>
                {vetor.map((obj, indice) => (
                    <tr key={indice}>
                        <td><div className="td-table">{obj.nameProduct}</div></td>
                        <td><div className="td-table">R$ {obj.value}</div></td>
                        <td><div className="btn-table"><button onClick={() => { selecionar(indice) }} className="btn btn-success">Selecionar</button></div></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="btn-cadastrar-produto"><button onClick={cancelar} className='btn btn-primary'>Cadastrar novo produto</button></div>
        </div>
    )
}

export default Tabela;