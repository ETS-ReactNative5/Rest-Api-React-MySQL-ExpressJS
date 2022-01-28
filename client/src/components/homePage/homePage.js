import image from './img/images.png'
import './img/img.css'
import './layout/Layout.css'

const HomePage = () => {
    return (
        <div >
            <img src={image} className="img" />
            <div className="text">
                
                    <h2>&ensp;Welcome to the Premier League RestApi server !</h2>
                    <div style={{padding:'3px', fontSize:'120%',fontFamily:'verdana'}}>
                    &ensp; Here you can create your own teams, players and matches.
                    <h2 />&ensp; If you don't like the name of your teams, your players or you've created an incorrect result you can edit it.
                    <h2 />&ensp; You can also remove listed if you mistakenly added a data.
                    <h2 />&ensp; If you delete a team with players, the players will be moved into the Free Transfers table which you can edit them or delete them if you desire.
                    </div>
            </div>
        </div>
    )
}

export default HomePage