import './layout/Layout.css'
import { Carousel } from "react-bootstrap"
import IMAGES from './images/images'

const HomePage = () => {
    return (
        <div>
            <Carousel style={{ "margin-top": "8px" }} >
                <Carousel.Item interval={5000}>
                    <img
                        className="d-block w-100"
                        src={IMAGES.logo}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={5000} >
                    <img
                        className="d-block w-100"
                        src={IMAGES.img3}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={5000} >
                    <img
                        className="d-block w-100"
                        src={IMAGES.img4}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={5000} >
                    <img
                        className="d-block w-100"
                        src={IMAGES.img5}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={5000} >
                    <img
                        className="d-block w-100"
                        src={IMAGES.stadium}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={IMAGES.champs}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            <div className="text">
                <h3 className='center'> Welcome to the Premier League RestApi server !</h3>
                <div className='paragraph'>
                    &ensp; Here you can create your own teams, players and matches.
                    <h2 />&ensp; If you don't like the name of your teams, your players or you've created an incorrect result you can edit &ensp; them.
                    <h2 />&ensp; You can also remove listed if you mistakenly added a data.
                    <h2 />&ensp; If you delete a team with players, the players will be moved into the Free Transfers table which you can &ensp; edit them or delete them if you desire.
                </div>
            </div>
        </div>
    )
}

export default HomePage