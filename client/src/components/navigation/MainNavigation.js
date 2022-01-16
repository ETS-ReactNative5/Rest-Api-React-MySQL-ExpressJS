import { Link, Router } from 'react-router-dom';
import classes from './MainNavigation.module.css'


function MainNavigation() {

    return <header className={classes.header}>
        <div className={classes.logo}>Premier League</div>
        <li><Link to='/'>Home</Link></li>
        <li> <Link to='/Teams'>Teams</Link></li>
        <li> <Link to='/Players'>Players</Link></li>
        <li><Link to='/Results'>Results</Link></li>
        <li><Link to='/Team-Players'>Team Players</Link></li>
    </header>
}

export default MainNavigation;