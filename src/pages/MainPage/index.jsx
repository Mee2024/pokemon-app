import axios from "axios";
import { useEffect, useState } from "react";
import PokeCard from '../../components/PokeCard';
import Autocomplete from '../../components/Autocomplete';


function MainPage() {

    //모든 포켓몬 데이터늘 가지고 있는 State 
   const [allpokemons, setallpokemons] = useState([])
  
   //실제로 리스트로 보여주는 포켓몬 데이터를 가지고 있는 State 
   const [displayedPokemons, setdisplayedPokemons] = useState([])
  
   //한번에 보여주는 포켓몬 수 
   const limitNum = 20;
   const url = `https:pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`;
  
     useEffect(() =>{
     fetchPokeData();
    },[])
  
    const filterDisplayedPokemonsData = (allpokemons,displayedPokemons = []) => {
      const limit = displayedPokemons.length + limitNum;
      //모든 포켓몬 데이터에서 limitNum 만큼 더 가져오기 
      const array = allpokemonsData.filter((pokemon,index) => index + 1 <= limit);
      return array;
    }
  
      const fetchPokeData = async () => {
      try {
        //1008 포켓몬 데이터 받아오기
         const response = await axios.get(url);
        //console.log(response.data.results);
        //모든 포켓몬 데이터 기억하기
        setallpokemons(response.data.results);
        // 실제로 화면에 보여줄 포켓몬 리스트 기억하는 state
        setdisplayedPokemons(filterDisplayedPokemonsData(response.data.results));
  
         } catch (error) {
        console.error(error);
      } 
    }
  
       return (
        <article className='pt-6'>
          <header className='flex flex-col gap-2 w-full px-4 z-50 underline'>
         <Autocomplete
         allpokemons={allpokemons}
         setdisplayedPokemons={setdisplayedPokemons}
         />
        </header>
        <section className='pt-6 flex flex-co justify-content items-center overflow-auto z-0'>
          <div className='flex flex-ro flex-wrap gap-[16px] items-center justify-center px-2 max-4xl'>
              {displayedPokemons.length > 0 ? 
              (
               displayedPokemons.map(({url, name}, index) => (
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
        <div className='text-center'>
           {/* 더보기 버튼을 보여주려면 */}
           {/* 모든 포켓몬 수가 보여주고 있는 포켓몬 수보다 많고, 보여주는 게 하나일 때가 아니여야 함.(검색 결과를볼 때) */}
           {(allpokemons.length > displayedPokemons.length) && (displayedPokemons.length !==1) && (
            <button
            onClick={() => setdisplayedPokemons(filterDisplayedPokemonsData(allpokemons,displayedPokemons))} 
            className='bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white'>
               더 보기
            </button>
           )}
         </div>
        </article>
      )
    }

export default MainPage