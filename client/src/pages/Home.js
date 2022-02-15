import React from 'react'
import Anitime from '../../src/images/anitime.jpg'
import Haikyuu from '../../src/images/haikyuu.png'
import './Home.css'
import 'animate.css';
import Back from  '../../src/images/combine_images.jpg'

function Home() {
return (
<div>
    <div className="welcome" style={{ background:'black' }}>
        <h1 class='animate__animated animate__bounce animate__infinite	infinite animate__slower 3s' style={{ color: 'white'}} >Welcome to Ani-Time</h1>
    </div>
    <div style={{ backgroundImage: `url(${Back})`, backgroundSize: 'cover' }} className="homeBackground">
        <div className="welcome">
            <div className="anitimeIMG">
                <img className='anitime' src={Anitime} />
            </div>
            <br></br>

        </div>
    </div>
</div>
)
}

export default Home;