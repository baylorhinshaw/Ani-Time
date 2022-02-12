import React from 'react'
import { QUERY_USER } from '../utils/queries'
import { useMutation, useQuery } from '@apollo/client';
import AnimeCard from '../components/AnimeCard/AnimeCard';
import { REMOVE_ANIME } from '../utils/mutations'
import Auth from '../utils/auth'

function Profile() {

    const { loading, data } = useQuery(QUERY_USER);
    const [removeAnime] = useMutation(REMOVE_ANIME)

    
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
        return false;
    }

    let userData = data?.user
    
    // if data isn't here yet, say so
    if (loading) {
        return <h2>LOADING...</h2>;
    }

    console.log(userData);


    return (
        <div>
            <h1>Welcome {userData.firstName}</h1>
            <div className='watch-later-list'>
                <h2></h2>

            </div>
        </div>
    )
}

export default Profile;