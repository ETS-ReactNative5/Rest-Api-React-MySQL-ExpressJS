import classes from './MainNavigation.module.css'
import { Navbar, Nav, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function MainNavigation() {
    return (
        <div className={classes.header}>
            <Navbar expand='sm' bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls='responsie-navbar-nav' />
                    <Navbar.Brand className={classes.logo}>
                        Premier League
                    </Navbar.Brand>
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav>
                            <Nav.Link href='/'>&emsp; Home &emsp;</Nav.Link>
                            <Nav.Link href='/Teams'>Teams &emsp;</Nav.Link>
                            <Nav.Link href='/Players'>Players &emsp;</Nav.Link>
                            <Nav.Link href='/Results'>Results &emsp;</Nav.Link>
                            <Nav.Link href='/Team-Players'>Team Players</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default MainNavigation;