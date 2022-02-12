import React from 'react'
import Anitime from '../../src/images/anitime.jpg'
import './Home.css'

function Home() {
    return (
        <div className='home'>
            <img className='anitime' src={Anitime} />
            <br></br>
            <h1>Welcome to Ani-Time</h1>
        </div>
    )
}

export default Home;