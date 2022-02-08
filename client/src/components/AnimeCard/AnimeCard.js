import React from 'react'
import './AnimeCard.css'

function AnimeCard(props) {
    return (
        <div className="anime-card">
            <img className="image" src={props.image}/>
            <div>{props.titleJapanese}</div>
            <div>{props.titleEnglish}</div>
            <div>{props.score}</div>
            <div className='btn'>
                <button onClick={alert}> ⬇ Watch Later</button>
            </div>
        </div>

    )


}

export default AnimeCard;