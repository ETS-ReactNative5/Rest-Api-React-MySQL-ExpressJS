import './layout/Layout.css'
import { Carousel } from "react-bootstrap"
import stadium from './img/stadium.png'
import logo from './img/logo.png'
import champs from './img/champs.png'
import img3 from './img/img3.png'
import img4 from './img/img4.png'
import img5 from './img/img5.png'


const HomePage = () => {
    return (
        <div style={{ height: "100%" }}>
            <Carousel style={{ "margin-top": "8px" }} >
                <Carousel.Item interval={5000}>
                    <img
                        className="d-block w-100"
                        src={logo}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={5000} >
                    <img
                        className="d-block w-100"
                        src={img3}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={5000} >
                    <img
                        className="d-block w-100"
                        src={img4}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={5000} >
                    <img
                        className="d-block w-100"
                        src={img5}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={5000} >
                    <img
                        className="d-block w-100"
                        src={stadium}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={champs}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            <div className="text">
                <h3 style={{ textAlign: "center" }}> Welcome to the Premier League RestApi server !</h3>
                <div style={{ padding: '3px', fontSize: '120%', fontFamily: 'verdana' }}>
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