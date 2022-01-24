import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AnimeCard from '../AnimeCard/AnimeCard';

/**
 * Requirements:
 * 1. Create an Anime card component
 *   - Should show title in english and in japanese
 *   - Should show Score
 *   - TitleEnglish, TitleJapanese, and Score should be new rows each
 *   - Should have 12 margin between each card
 *   - Have border around each card
 *   - Have Image as background of each card
 * 2. Render Anime card components for each anime
 *   - Use a for loop to render the created Anime card component
 */

function App() {

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
    <div className="App">
      <header className="App-header" >
        <input placeholder='Year' onChange={e => setYear(e.target.value)}/>
        <input placeholder='Season' onChange={e => setSeason(e.target.value)}/>
        <button onClick={getAnime}>Submit</button>
        {renderAnime()}

      </header>
    </div>
  );
}

export default App;
