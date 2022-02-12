import React from 'react'
import Anitime from '../../src/images/anitime.jpg'
import Haikyuu from '../../src/images/haikyuu.png'
import './Home.css'

function Home() {
return (

<div style={{ backgroundImage: `url(${Haikyuu})` }} className="home">
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