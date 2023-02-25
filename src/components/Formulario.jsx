import styled from "@emotion/styled"
import axios from "axios"
import { useEffect } from "react"
import { useCriptomoneda } from "../hooks/useCriptoMoneda"
import { useMoneda } from "../hooks/useMoneda"

const Boton = styled.input`
margin-top: 20px;
font-weight: bold;
font-size: 20px;
padding: 10px;
background-color: #66a2fe;
border: none;
width: 100%;
border-radius: 10px;
color: #fff;
transition: background-color .3s ease;

&:hover{
    background-color: #326AC0;
    cursor: pointer;
}
`
export const Formulario = () =>{
    const MONEDAS = [
        {codigo:'USD', nombre: 'Dolar de estados unidos'},
        {codigo:'MXN', nombre: 'Peso mexicano'},
        {codigo:'EUR', nombre: 'Euro'},
        {codigo:'GBP', nombre: 'Libra esterlina'},
        {codigo:'COP', nombre: 'Peso colombiano'}
    ]
    //Utilizar useMoneda
    const [moneda, SelectMonedas, actualizarState ] = useMoneda('Elige tu moneda','', MONEDAS)
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '');
    //Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR'
            const resultado = await axios.get()
        }
    }, [])
    
    return (
        <form action="">
        <SelectCripto />
        <SelectMonedas />
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    )
}