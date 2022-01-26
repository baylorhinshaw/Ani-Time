import axios from 'axios';
import { useEffect, useState } from 'react';
import AnimeCard from '../AnimeCard/AnimeCard';
import './Anime.css';
import PageChange from '../Pagination/Pagination';

function Anime() {

    const [anime, setAnime] = useState([]);
    const [year, setYear] = useState(2022);
    const [season, setSeason] = useState("winter");
  
    useEffect(() =>{
        getAnime(year, season);
    }, [])
    
    async function getAnime(){
      let res = await axios.get(`https://api.jikan.moe/v4/seasons/${year}/${season}`);
      setAnime(res.data.data);
    }
  
    function renderAnime(){
      let componentArray = [];
      
      for (let i= 0; i < anime.length; i++) {
        let curAnime = anime[i]
        componentArray.push(
          <AnimeCard 
            titleJapanese={curAnime.title_japanese} 
            titleEnglish={curAnime.title_english}
            score={curAnime.score}
            image={curAnime.images.jpg.image_url} />
        )
      }
      // Logic
  
      return componentArray;
    }
  
    return (
      <div className="Anime">
        <header className="Anime-header" >
          <input placeholder='Year' onChange={e => setYear(e.target.value)}/>
          <input placeholder='Season' onChange={e => setSeason(e.target.value)}/>
          <button onClick={getAnime}>Submit</button>
          {renderAnime()}
          <PageChange></PageChange>
        </header>
      </div>
    );
  }
  
  export default Anime;
  