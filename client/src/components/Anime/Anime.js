import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Auth from '../../utils/auth'
import { Pagination } from 'antd';
import { SAVE_ANIME } from '../../utils/mutations'
import { useMutation } from '@apollo/client'
import { saveAnimeIds, getSavedAnimeIds } from '../../utils/localStorage'
import Layout, { Content } from 'antd/lib/layout/layout';
import './Anime.css';
import '../AnimeCard/AnimeCard.css';

function Anime() {

  const [anime, setAnime] = useState([]);
  const [year, setYear] = useState(2022);
  const [season, setSeason] = useState("winter");
  const [page, setPage ] = useState(1);
  const [lastPage, setLastPage ] = useState(1);
  const [savedAnimeIds, setSavedAnimeIds] = useState(getSavedAnimeIds());
  const [saveAnime, { error }] = useMutation(SAVE_ANIME)

  useEffect(() =>{
    getAnime();
  }, [page, lastPage])

  useEffect(() => {
    return () => saveAnimeIds(savedAnimeIds);
  });

  function onChange(page, pageSize) {
    setPage(page);
  }

  const getAnime = async () => {
    let res = await axios.get(`https://api.jikan.moe/v4/seasons/${year}/${season}?page=${page}`);
    const { data } = res.data;
    const animeData = data.map((anime) => ({
      titleEnglish: anime.title_japanese,
      titleJapanese: anime.title_english,
      // genres: [anime.genres],
      image: anime.images.jpg.image_url,
      mal_id: anime.mal_id,
      score: anime.score
      })
    )

    setAnime(animeData);
    setLastPage(res.data.pagination.last_visible_page);
  }


  const handleSaveAnime = async (animeId) => {
  // find the book in `anime` state by the matching id
    const animeToSave = anime.find((anime) => anime.mal_id === animeId)
    console.log(animeToSave)

  // get token
   const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
    return false;
    }


  try {
    const { data } = await saveAnime({
      variables: {...animeToSave} 
    })


  // if anime successfully saves to user's account, save anime id to state
    setSavedAnimeIds([...savedAnimeIds, animeToSave.mal_id]);

  } catch (err) {
      console.error(err);
    }
  };

return (
<Layout>
  <Content>
  <div className='mainContent'>
      <div className= 'searchContainer'>
        <div className= "searchBar">
        <input placeholder='Year' onChange={e=> setYear(e.target.value)}/>
        <input placeholder='Season' onChange={e=> setSeason(e.target.value)}/>
        <button className='btn-block btn-info' onClick={getAnime}>Submit</button>
        </div>
      </div>
        <div className= "animePage">
      
      {anime.map((ani) => {
      return (
   
        <div className="anime-card">   
          
          <img className="image" src={ani.image} />
          <div>{ani.titleJapanese}</div>
          <div>{ani.titleEnglish}</div>
          <div>Rating: {ani.score}</div>
          {Auth.loggedIn() && (
            <button
              disabled={savedAnimeIds?.some((savedAnimeId) => savedAnimeId === ani.mal_id)}
              className='btn-block btn-info'
              onClick={() => handleSaveAnime(ani.mal_id)}>
              {savedAnimeIds?.some((savedAnimeId) => savedAnimeId === ani.mal_id)
                ? 'This anime has already been saved!'
                : 'Save this Anime!'}
            </button>
          )}


        </div>
        
        )      
      })
      }
      </div>
      <div className= 'pages'>
      <Pagination onChange={onChange} defaultCurrent={1} total={lastPage * 25} pageSize={25} />
      </div>
    </div>
  </Content>
</Layout>
);


}


export default Anime;