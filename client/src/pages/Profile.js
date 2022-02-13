import React, { useState, useEffect } from 'react'
import { QUERY_USER } from '../utils/queries'
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_ANIME } from '../utils/mutations'
import Auth from '../utils/auth'
import { removeAnimeId } from '../utils/localStorage'

function Profile() {
    const { loading, data } = useQuery(QUERY_USER);
    const [removeAnime] = useMutation(REMOVE_ANIME)
    const [ userData, setUserData ] = useState({})

    let user = data?.user;
    console.log(user)

    useEffect(() => {
        return setUserData(user)
    })

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return false;
    }
    

    if (loading) {
        return <h2>LOADING...</h2>;
    }


    console.log(userData);

    const handleDeleteAnime = async (animeId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token) {
          return false;
        }
    
        try {
          const { data } = await removeAnime({
            variables: { animeId }
          })
    
          console.log(data)
          const updatedUser = data?.removeBook;
          setUserData(updatedUser);
    
          // upon success, remove book's id from localStorage
          removeAnimeId(animeId);
        } catch (err) {
          console.error(err);
        }
      };

    //see console.log and use userData as my profile data

    return (
        <div>
            <h1>Welcome</h1>
            <div className='watch-later-list'>
                <h2></h2>

            </div>
        </div>
    )
}

export default Profile;