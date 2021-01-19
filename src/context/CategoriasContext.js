import { createContext } from 'react'

export const CategoriasContext = createContext( null );


// Provider es donde se encuentran las funciones y state
// const categoriasProvider = props => {
//     const [state, setState] = useState('');

//     return (
//         <CategoriasContext.Provider value={{ state }}>
//             { props.children }
//         </CategoriasContext.Provider>
//     );
// }