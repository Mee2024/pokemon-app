import axios from "axios"
import { useEffect, useState } from "react"


export const PokeCard = ({url, name}) => {
    const [pokemon, setPokemon] = useState();

    useEffect(() => {
    fetchPokeDetailData();
    },[url,name])

    async function fetchPokeDetailData(){
        try {
            const response = await axios.get(url);
            console.log(response.data);
            formatPokemonData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    function formatPokemonData(params){

    }

  return (
    <div>PokeCard</div>
  )
}

export default PokeCard
