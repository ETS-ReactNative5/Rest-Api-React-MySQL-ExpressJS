import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css'
import {Badge, Navbar, Nav,Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function MainNavigation() {
    return  (
        <div className={classes.header}>
    <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand className={classes.logo}>
        Premier League
        </Navbar.Brand>
        <Nav.Link href='/'>Home</Nav.Link>
        <Nav.Link href='/Teams'>Teams</Nav.Link>
        <Nav.Link href='/Players'>Players</Nav.Link>
        <Nav.Link href='/Results'>Results</Nav.Link>
        <Nav.Link href='/Team-Players'>Team Players</Nav.Link>
        </Container>
    </Navbar>
        </div>
    )
}

export default MainNavigation;