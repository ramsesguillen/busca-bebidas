import React, { useContext, useState } from 'react'
import { CategoriasContext } from '../context/CategoriasContext'
import { RecetasContext } from '../context/RecetasContext';

export const Formulario = () => {
    const [values, setValues] = useState({
        nombre: '',
        categoria: ''
    });
    const [error, setError] = useState( false );


    const {categorias} = useContext( CategoriasContext );
    const {setBusqueda, setConsultar} = useContext( RecetasContext );


    const { nombre, categoria } = values;

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if ( nombre.trim() === '' || categoria.trim() === '' ) {
            setError( true );
            return;
        }
        setError(false);
        setConsultar( true );
        setBusqueda(values);
    }


    return (
        <form
            onSubmit={ handleSubmit }
        >
            <fieldset className="text-center">
                <legend>Busca bebidas po Categoría o Ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Busca por Ingrediente"
                        onChange={ handleInputChange }
                        value={ nombre }
                    />
                </div>
                <div className="col-md-4">
                    <select
                        name="categoria"
                        className="form-control"
                        onChange={ handleInputChange }
                        value={ categoria }
                    >
                        <option>-- Selecciona Categora </option>
                        {
                            categorias.map( ({strCategory}) => (
                                <option key={strCategory} value={ strCategory }>{ strCategory }</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-md-4">
                    <button
                        className="btn btn-primary btn-block"
                    >
                        Buscar Bebida
                    </button>
                </div>
            </div>
            {
                ( error ) && <p>BEBIDA NO ENCONTRADA</p>
            }
        </form>
    )
}
