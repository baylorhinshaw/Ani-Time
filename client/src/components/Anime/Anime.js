import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AnimeCard from '../AnimeCard/AnimeCard';
import './Anime.css';
import { Pagination } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';

function Anime() {

    const [anime, setAnime] = useState([]);
    const [year, setYear] = useState(2022);
    const [season, setSeason] = useState("winter");
    const [page, setPage ] = useState(1);
    const [lastPage, setLastPage ] = useState(1);
  
    useEffect(() =>{
        getAnime();
    }, [page, lastPage])

    function onChange(page, pageSize) {
      setPage(page);
    }
    
    async function getAnime(){
      let res = await axios.get(`https://api.jikan.moe/v4/seasons/${year}/${season}?page=${page}`);
      const { data } = res.data;
      const animeData = data.map((anime) => ({
        titleEnglish: anime.title_japanese,
        titleJapanese: anime.title_english,
        genres: [anime.genres],
        image: anime.images.jpg.image_url,
        mal_id: anime.mal_id,
        score: anime.score
      })
      )
      console.log(animeData)
      setAnime(animeData);
      setLastPage(res.data.pagination.last_visible_page);
    }

    function renderAnime(){
      let componentArray = [];

      for (let i= 0; i < anime.length; i++) {
        let curAnime = anime[i]
        componentArray.push(
          <AnimeCard 
            titleJapanese={curAnime.titleJapanese} 
            titleEnglish={curAnime.titleEnglish}
            score={curAnime.score}
            image={curAnime.image} 
            watchLater = {true} 
            />
        )
      }
      // Logic

      return componentArray;
    }
  
    return (
    <Layout>
      <Content>
      <div className='mainContent'>
        <input placeholder='Year' onChange={e=> setYear(e.target.value)}/>
        <input placeholder='Season' onChange={e=> setSeason(e.target.value)}/>
        <button onClick={getAnime}>Submit</button>
          <div className="Anime">
          </div>
        <header className="Anime-header">
          {renderAnime()}          
        </header>
        <Pagination onChange={onChange} defaultCurrent={1} total={lastPage * 25} pageSize={25} />
    </div>
      </Content>
    </Layout>
    );
  }
  
  export default Anime;