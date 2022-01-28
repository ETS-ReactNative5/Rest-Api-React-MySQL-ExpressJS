import image from './img/images.png'
import './img/img.css'
import './layout/Layout.css'

const HomePage = () => {
    return (
        <div >
            <img src={image} className="img" />
            <div className="text">
                <h3 >
                   <h2>&emsp;&emsp;Welcome to the Premier League Rest Api server !</h2>
                    &ensp; Here you can create your own teams, players and matches.
                    <br />&ensp; If you don't like the name of your teams, your players or you've created an incorrect result you can edit it.
                    <br />&ensp; You can also remove listed if you mistakenly added a data.
                    <br />&ensp; If you delete a team with players, the players will be moved into the Free Transfers table which you can edit them or delete them if you desire.
                </h3>
            </div>
        </div>
    )
}

export default HomePage