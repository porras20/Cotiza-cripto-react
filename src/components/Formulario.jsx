import styled from "@emotion/styled"
import axios from "axios"
import { useEffect, useState } from "react"
import { useCriptomoneda } from "../hooks/useCriptoMoneda"
import { useMoneda } from "../hooks/useMoneda"
import { Error } from "./Error"


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
export const Formulario = ({setCriptomoneda, setMoneda}) =>{

    //State del listado de criptomonedas
    const [listaCripto, setListaCripto] = useState([])
    const [error, setError]  = useState(false)

    const MONEDAS = [
        {codigo:'USD', nombre: 'Dolar de estados unidos'},
        {codigo:'MXN', nombre: 'Peso mexicano'},
        {codigo:'EUR', nombre: 'Euro'},
        {codigo:'GBP', nombre: 'Libra esterlina'},
        {codigo:'COP', nombre: 'Peso colombiano'}
    ]
    //Utilizar useMoneda
    const [moneda, SelectMonedas, actualizarState ] = useMoneda('Elige tu moneda','', MONEDAS)
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '', listaCripto);
    //Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await axios.get(url);

            setListaCripto(resultado.data.Data);
        }
        consultarAPI();
    }, [])
    

    //Cuando el usuario hace submit

    const cotizarMoneda = (e) =>{
        e.preventDefault();

        //Validar si ambos campos estan llenos
        if (moneda === '' || criptomoneda === '') {
            setError(true);
            return
        }

        //Pasar los datos al componente principal
        setError(false)
        setCriptomoneda(criptomoneda)
        setMoneda(moneda);
    }


    return (
        <form 
            action=""
            onSubmit={cotizarMoneda}
            >
            {error ? <Error mensaje="Todos los campos son obligatorios"></Error> : null}
        <SelectCripto />
        <SelectMonedas />
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    )
}