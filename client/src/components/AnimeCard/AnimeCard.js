import React from 'react'
import './AnimeCard.css'

function AnimeCard(props) {
    return (
        <div className="anime-card">
            <img className="image" src={props.image}/>
            <div>{props.titleJapanese}</div>
            <div>{props.titleEnglish}</div>
            <div>{props.score}</div>
            {props.watchLater == true && <div className='btn'>
                <button onClick={alert}> ⬇ Watch Later</button>
            </div>}
            {props.removeWatchLater == true && <div className='btn'>
                <button onClick={alert}> Remove </button>
            </div>}
        </div>

    )

}

export default AnimeCard;