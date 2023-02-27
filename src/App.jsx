import styled from '@emotion/styled'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Cotizacion } from './components/Cotizacion'
import { Formulario } from './components/Formulario'
import { Spinner } from './components/Spinner'
import imagen from './logo.png'


const Contenedor = styled.div`
max-width: 900px;
margin: 0 auto;
@media (min-width: 992px){
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
}
`

const Imagen = styled.img`
max-width: 100%;
margin-top: 5rem;
`
const Heading = styled.h1`
font-family: 'Bebas neue', cursive;
color: #fff;
text-align: left;
font-weight: 700;
font-size: 40px;
margin-bottom: 50px;
margin-top: 80px;

&:after{
  content: '';
  width: 100px;
  height: 6px;
  background-color: #66A2FE;
  display: block;
}
`
function App() {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('')
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);
  
  useEffect(() => {

    const cotizarCriptomoneda = async () =>{
    if(moneda === '') return;
     //Consultando la API para ontener la cotizacion
     const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
     const resultado = await axios.get(url);

     //Mostrando el spinner
     setCargando(true);

     setTimeout(() => {
      setCargando(false);
       setResultado(resultado.data.DISPLAY[criptomoneda] [moneda])
     }, 2000);
   }

   cotizarCriptomoneda()
  }, [moneda, criptomoneda])
  
  return (
   <Contenedor>
    <div>
      <Imagen 
        src={imagen}
          alt="imagen cripto"
        />
    </div>
    <div>
      <Heading>Cotizador de criptomonedas al instante</Heading>
      <Formulario 
        setMoneda={setMoneda}
        setCriptomoneda={setCriptomoneda}
      />
      {cargando ? <Spinner /> : null}
      <Cotizacion
        resultado={resultado}
      />
    </div>
   </Contenedor>
  )
}

export default App
