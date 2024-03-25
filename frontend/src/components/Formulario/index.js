import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {NumericFormat} from 'react-number-format';
import './Formulario.css';

function Formulario({botao, eventoTeclado, cadastrarProduto, obj, cancelar, remover, alterar, listarProdutos}){

    const validationSchema = Yup.object().shape({
        nameProduct: Yup.string().required('O nome do produto é obrigatório.'),
        description: Yup.string().required('A descrição do produto é obrigatória.'),
        value: Yup.number()
            .typeError('O valor do produto é obrigatório.')
            .min(0.01, 'O valor deve ser maior que 0.')
            .required('O valor do produto é obrigatório.')
            .test('is-nonzero', 'O valor deve ser maior que 0.', value => value > 0)
    });

    const handleSubmit = (values, { resetForm }) => {
        cadastrarProduto(values);
        resetForm();
    };

    return (
        <Formik
            initialValues={obj}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched , values, setFieldValue}) => (
                <Form>
                    <h1>Cadastro de Produto</h1>
                    <div className="form-group">
                        <label htmlFor="nameProduct">Nome do Produto:</label>
                        <Field
                            type="text"
                            id="nameProduct"
                            name="nameProduct"
                            value={obj.nameProduct}
                            placeholder="Digite o nome do produto"
                            className={`form-control ${errors.nameProduct && touched.nameProduct ? 'is-invalid' : ''}`}
                            onInput={eventoTeclado}
                        />
                        <ErrorMessage name="nameProduct" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descrição do Produto:</label>
                        <Field
                            as="textarea"
                            id="description"
                            name="description"
                            value={obj.description}
                            placeholder="Digite a descrição do produto"
                            className={`form-control ${errors.description && touched.description ? 'is-invalid' : ''}`}
                            onInput={eventoTeclado}
                        />
                        <ErrorMessage name="description" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="value">Valor do Produto:</label>
                        <NumericFormat
                            name="value"
                            placeholder="Digite o valor do produto"
                            className={`form-control ${errors.value && touched.value ? 'is-invalid' : ''}`}
                            decimalScale={2}
                            fixedDecimalScale={true}
                            allowNegative={false}
                            prefix={'R$'}
                            onInput={eventoTeclado}
                            value={obj.value}
                            onValueChange={(values) => {
                                setFieldValue('value', values.floatValue || '');
                            }}
                        />
                        <ErrorMessage name="value" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableSale">Disponível para Venda:</label>
                        <Field as="select" name="availableSale" className="form-control" onInput={eventoTeclado} value={eventoTeclado.value}>
                            <option value="SIM">Sim</option>
                            <option value="NAO">Não</option>
                        </Field>
                    </div>
                    {
                        botao
                            ?
                            <div>
                                <input type='submit' value='Cadastrar Produto' className='btn btn-primary btn-cadastrar'/>
                                <input type='button' onClick={listarProdutos} value='Listar Produtos' className='btn btn-secondary'/>
                            </div>
                            :
                            <div>
                                <input type='button' onClick={alterar} value='Salvar Alterações' className='btn btn-warning'/>
                                <input type='button' onClick={remover} value='Remover Produto' className='btn btn-danger'/>
                                <input type='button' onClick={cancelar} value='Cancelar' className='btn btn-secondary'/>
                            </div>
                    }
                </Form>
            )}
        </Formik>
    );
}

export default Formulario;

