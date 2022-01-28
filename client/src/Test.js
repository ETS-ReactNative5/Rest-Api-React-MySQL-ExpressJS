import { Spinner, Dropdown, Button, ButtonGroup, Nav, NavDropdown,Navbar, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';



const Test = () => {
return (
    <div style={{ display: 'block', width: 700, padding: 30 }}>
    <h4>React-Bootstrap Spinner Component</h4>
    With Border Animation: 
    <Spinner animation="border" variant="primary" /> <br/>
    With Grow Animation:
    <Spinner animation="grow" variant="warning" />
  <Dropdown as={ButtonGroup}>
  <Button variant="success">Split Button</Button>

  <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
  </div>
)
}

/* import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import './Results.css';
import 'react-datepicker/dist/react-datepicker.css';
import DateView from 'react-datepicker';

const AddResult = (props) => {
    const [teamHost, setTeamHost] = useState([]);
    const [teamGuest, setTeamGuest] = useState([]);
    const [teams, setTeams] = useState([]);
    const {label, name, ...rest} = props
    
    const navigate = useNavigate();
    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        try {
            await fetch('http://localhost:5000/teams/',)
                .then((data) => {
                    return data.json();
                }).then(response => {
                    setTeams(response)
                    const teams = response.map(team => team.team_name).flat();
                    setTeamHost(teams)
                    setTeamGuest(teams)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const initialValues = {
        host_name: "",
        guest_name: "",
        home_goals: "",
        away_goals: "",
        date: "",
        venue: "",
    };

    const validationSchema = Yup.object().shape({
        host_name: Yup.string().required("Host field is required!").oneOf(teamHost, 'No such host!'),
        guest_name: Yup.string().required("Guest field is required!").oneOf(teamGuest, 'No such guest!')
            .when('host_name', (host_name, schema) => {
                return schema.test({
                    test: guest_name => guest_name !== host_name,
                    message: 'One team cannot play against each other!'
                })
            }),
        home_goals: Yup.number("Goals is a number value!").required("Home Goals are required!").min(0, "Result cannot be negative!"),
        away_goals: Yup.number("Goals is a number value!").required("Away Goals are required!").min(0, "Result cannot be negative!"),
        date: Yup.date().required("Date is required!"),
        venue: Yup.string().required("Venue is required!"),
    });

    const onSubmit = (data) => {
        console.log(data)
        data.host_id = teams.find(team => team.team_name === data.host_name).id
        data.guest_id = teams.find(team => team.team_name === data.guest_name).id
        fetch('http://localhost:5000/results/', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            //navigate('/results')
        })
    };

    return (
        <div className="createResultPage">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="formContainer">
                    <label>Host Name: </label>
                    <ErrorMessage name="host_name" component="span" />
                    <Field
                        component='select'
                        autocomplete="off"
                        id="inputCreateResult"
                        name="host_name"

                    >
                        <option label='Select a Host'></option>
                        {teamHost.map((id) => <option key={id} value={id}>{id}</option>)}
                    </Field>
                    <label>Guest Name: </label>
                    <ErrorMessage name="guest_name" component="span" />
                    <Field
                        component='select'
                        autocomplete="off"
                        id="inputCreateResult"
                        name="guest_name"
                    >
                        <option label='Select a Guest'></option>
                        {teamGuest.map((id) => <option key={id} value={id}>{id}</option>)}
                    </Field>
                    <label>Home Goals: </label>
                    <ErrorMessage name="home_goals" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreateResult"
                        name="home_goals"
                    />
                    <label>Away Goals: </label>
                    <ErrorMessage name="away_goals" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreateResult"
                        name="away_goals"
                    />
                    <label>Date: </label>
                    <ErrorMessage name={name} component="span" />

                    <Field name={name}>
                        {
                            ({form,field}) => {
                                const {setFieldValue} = form
                                const {value} =field
                                return <DateView id={name} 
                                {...field} 
                                {...rest} 
                                selected={value} 
                                onChange={val => setFieldValue(name, val)} />
                            }
                        }

                    </Field>
                    <label>Venue: </label>
                    <ErrorMessage name="venue" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreateResult"
                        name="venue"
                    />
                    <button type="submit"> Create Result</button>
                    <Link to={'/results'} className='edit'>Cancel</Link>
                </Form>
            </Formik>
        </div>
    );
}

export default AddResult */

export default Test