import image from './img/images.png'
import './img/img.css'
import './layout/Layout.css'

const HomePage = () => {
    return (
        <div >
            <img src={image} className="img" />
            <div className="text">
                <p >
                    Welcome to the Premier League Rest Api server !
                    <br />Here you can create your own teams, players and matches.
                    <br />If you don't like the name of your teams, your players or you've created an incorrect result you can edit it.
                    <br /> You can also remove listed if you mistakenly added a data.
                </p>
            </div>
        </div>
    )
}

export default HomePage