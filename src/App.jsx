import { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';
import PokeCard from './components/PokeCard.jsx';

function App() {

  const [pokemons,setPokemons] = useState([]);
  
  const url = 'https:pokeapi.co/api/v2/pokemon/?limit=10&offset=0';
  
  useEffect(() =>{
   fetchPokeData();
  },[])
  
  const fetchPokeData = async () => {
    try {
      const response = await axios.get(url);
      console.log(response.data.results);
      setPokemons(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }
    return (
      <article className='pt-6'>
        <header className='flex flex-col gap-2 w-full px-4 z-50 underline'>
        Input Form 부분 
      </header>
      <section className='pt-6 flex flex-co justify-content items-center overflow-auto z-0'>
        <div className='flex flex-ro flex-wrap gap-[16px] items-center justify-center px-2 max-4xl'>
            {pokemons.length > 0 ? 
            (
            pokemons.map(({url, name}, index) => (
            <PokeCard key={url} name={name}/>
            ))
            ):
            (
              <h2>
                포켓몬이 없습니다.
              </h2>
            )}
        </div>

      </section>
      </article>
    )
  }
  export default App
  
