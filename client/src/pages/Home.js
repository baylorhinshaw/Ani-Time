import React from 'react'
import Anitime from '../../src/images/anitime.jpg'
import './Home.css'

function Home() {
return (

<div className='home'>
    <div className="anitimeIMG">
        <img className='anitime' src={Anitime} />
    </div>
    <br></br>
    <div className="welcome">
        <h1>Welcome to Ani-Time</h1>
    </div>
</div>

)
}

export default Home;