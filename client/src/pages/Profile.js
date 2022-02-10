import React from 'react'
import { QUERY_USER } from '../utils/queries'
import AnimeCard from '../components/AnimeCard/AnimeCard';

function Profile() {
    return (
        <div>
            <h1>Welcome {QUERY_USER.firstName}</h1>
            <div className='watch-later-list'>
                <h2></h2>
                <AnimeCard 
                    // titleJapanese={curAnime.titleJapanese} 
                    // titleEnglish={curAnime.titleEnglish}
                    // score={curAnime.score}
                    // image={curAnime.image}
                    watchLater = {false} 
                    removeWatchLater = {true}
                    />
            </div>
        </div>
    )
}

export default Profile;