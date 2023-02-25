import styled from "@emotion/styled";
import { useState } from "react";

const Label = styled.label`
font-family: 'Bebas neue', cursive;
color: #fff;
text-transform: uppercase;
font-weight: bold;
font-size: 2.4rem;
margin-top: 2rem;
display: block;
`;

const Select = styled.select`
width: 100%;
display: block;
padding: 1rem;
-webkit-appearance: none;
border-radius: 10px;
border: none;
font-size: 1.2rem;
`
export const useMoneda = (label, stateInicial, opciones) => {
    //State de nuestro custom hook
    const [state, actualizarState] = useState(stateInicial);
    const Seleccionar = () =>(
        <>
            <Label htmlFor="">{label}</Label>
            <Select
                onChange={e =>{actualizarState(e.target.value)}}
                value={state}
            >
                <option value="">-- Seleccione --</option>
                {opciones.map(opcion => (
                    <option value={opcion.codigo} key={opcion.codigo}>{opcion.nombre}</option>
                ))}
            </Select>
        </>
    )

    //Retornar state, interfaz y fin que modifica el state
    return[ state, Seleccionar, actualizarState ];
}
