import React, { useEffect, useState } from 'react'
import { Formulario } from './Components/Formulario'
import { Header } from './Components/Header'
import { ListaRecetas } from './Components/ListaRecetas'
import { CategoriasContext } from './context/CategoriasContext'
import { ModalContext } from './context/ModalContext'
import { RecetasContext } from './context/RecetasContext'




export const App = () => {

    const [categorias, setcategorias] = useState([]);
    const [recetas, setRecetas] = useState([]);
    const [infoReceta, setReceta] = useState({});
    const [busqueda, setBusqueda] = useState({});
    const [consultar, setConsultar] = useState( false );
    const [idReceta, setIdReceta] = useState( null );

    useEffect(() => {
        if ( consultar ) {
            const obtenerReceta = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${busqueda.nombre}&c=${busqueda.categoria}`;
                const resp = await fetch( url );
                const dataRecetas = await resp.json();
                setRecetas( dataRecetas.drinks );
                // console.log( dataRecetas.drinks);
            }
            obtenerReceta();
        }
    }, [ busqueda, consultar ])

    useEffect(() => {
        const obtenerCategorias = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const resp = await fetch( url );
            const dataCategorias = await resp.json();
            setcategorias( dataCategorias.drinks );
        }
        obtenerCategorias();
    }, [])

    useEffect(() => {
        const obtenerReceta = async () => {
            if ( !idReceta ) return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ idReceta }`;
            const resp = await fetch( url );
            const dataCategorias = await resp.json();
            setReceta( dataCategorias.drinks[0] );
        }
        obtenerReceta();
    }, [ idReceta ])



    return (
        <CategoriasContext.Provider value={ { categorias }}>
            <RecetasContext.Provider value={{ recetas, setBusqueda, setConsultar }}>
                <ModalContext.Provider value={{ setIdReceta, infoReceta, setReceta }}>
                    <Header />

                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <Formulario />
                            <ListaRecetas />
                        </div>
                    </div>
                </ModalContext.Provider>
            </RecetasContext.Provider>
        </CategoriasContext.Provider>
    )
}
