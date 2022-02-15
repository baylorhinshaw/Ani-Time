import React from 'react'
import { QUERY_USER } from '../utils/queries'
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_ANIME } from '../utils/mutations'
import Auth from '../utils/auth'
import { removeAnimeId } from '../utils/localStorage'
import { Pagination } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import './Profile.css'
import { CHANGE_PASSWORD } from '../utils/mutations';

function Profile() {
    const { loading, data } = useQuery(QUERY_USER);
    const [removeAnime, {error}] = useMutation(REMOVE_ANIME)
    const [changePassword] = useMutation(CHANGE_PASSWORD)

    let user = data?.user;

    if (loading) {
      return <h2>LOADING...</h2>;
  } 



    const handleDeleteAnime = async (animeId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token) {
          return false;
        }

        try {
          const { data } = await removeAnime({
            variables: { mal_id: animeId }
          })
    
          const updatedUser = data?.removeAnime;
          user = updatedUser;
    
          // upon success, remove book's id from localStorage
          removeAnimeId(animeId);
        } catch (err) {
          console.error(err);
        }
      };

      

      const handlePassword = async (password) => {
        console.log(password)
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token) {
          return false;
        }

        try {
          const { data } = await changePassword({
            variables: { password: password }
          })
    
          Auth.logout()
          alert('Password changed! Login Again!')
        } catch (err) {
          console.error(err);
        }
          
      };

    // //see console.log and use userData as my profile data
    const { savedAnimes } = user;

    return (
      <Layout>
        <Content>
        <div className='mainContent'>
          <h2>Welcome, {user.firstname}</h2>
          <ul>
            <li>Email: {user.email}</li>
            <li>
              <div className="flex-row space-between my-2">
              <label htmlFor="pwd">Password:</label>
              <input
                  placeholder="******"
                  name="password"
                  type="password"
                  id="pwd"
              />
              </div>
              <button
              onClick={() => handlePassword(document.getElementById('pwd').value)}>Change the password</button>
            </li>
          </ul>
          <p className='savedTxt'>Saved Anime List:</p>
        </div>
        <div className= "animePage">
            {savedAnimes.map((anime) => {
            return (
              <div className="anime-card">
                <img className="image" src={anime.image} />
                <div>{anime.titleJapanese}</div>
                <div>{anime.titleEnglish}</div>
                <div>Rating: {anime.score}</div>
                <button
                  className='btn-block btn-info animeBtn'
                  onClick={() => handleDeleteAnime(anime.mal_id)}>
                  Delete this Anime!
                </button>
              </div>
              )      
            })
            }
        </div>
        </Content>
      </Layout>
      );
      
}

export default Profile;