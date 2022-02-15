import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import './Results.css';

const EditResult = () => {
    const { REACT_APP_URL_RESULTS, REACT_APP_URL_TEAMS } = process.env
    const URL = REACT_APP_URL_RESULTS
    const URL_TEAMS = REACT_APP_URL_TEAMS

    const [hostName, setHostName] = useState([]);
    const [guestName, setGuestName] = useState([]);
    const [teams, setTeams] = useState([]);

    const [host_id, setHost_id] = useState([]);
    const [guest_id, setGuest_id] = useState([]);
    const [home_goals, setHomeGoals] = useState([]);
    const [away_goals, setAwayGoals] = useState([]);
    const [date, setDate] = useState([]);

    const [venue, setVenue] = useState([])
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getTeams();
        getResultValues();
    }, []);

    const getTeams = async () => {
        try {
            const response = await fetch(URL_TEAMS)
            return response.json()
                .then(data => {
                    setTeams(data)
                    const teamName = data.map(team => team.team_name).flat();
                    setHostName(teamName)
                    setGuestName(teamName)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getResultValues = async () => {
        try {
            const response = await fetch(`${URL}/${id}`,)
            return response.json()
                .then(data => {
                    setHost_id(data.host_id)
                    setGuest_id(data.guest_id)
                    setHomeGoals(data.home_goals)
                    setAwayGoals(data.away_goals)
                    setDate(data.date)
                    setVenue(data.venue)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const host = teams.filter(team => team.id === host_id)
    const nameHost = host.map(team => team.team_name).toString()
    const guest = teams.filter(team => team.id === guest_id)
    const nameGuest = guest.map(team => team.team_name).toString()

    const initialValues = {
        host_name: nameHost,
        guest_name: nameGuest,
        home_goals: home_goals,
        away_goals: away_goals,
        date: date,
        venue: venue,
    };

    const validationSchema = Yup.object().shape({
        host_name: Yup.string().oneOf(hostName, 'No such host with this Id!'),
        guest_name: Yup.string().oneOf(guestName, 'No such guest with this Id!').notOneOf(["Select a Guest"])
            .when('host_name', (host_name, schema) => {
                return schema.test({
                    test: guest_name => guest_name !== '' || guest_name !== host_name,
                    message: 'One team cannot play against each other!'
                })
            }),
        home_goals: Yup.number("Goals is a number value!").min(0, "Result cannot be negative!"),
        away_goals: Yup.number("Goals is a number value!").min(0, "Result cannot be negative!"),
        date: Yup.date().required("Date is required!"),
        venue: Yup.string()
    });

    const onSubmit = (data) => {
        data.host_id = teams.find(team => team.team_name === data.host_name).id
        data.guest_id = teams.find(team => team.team_name === data.guest_name).id

        fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            navigate('/results')
        })
    }

    return (
        <div className="createResultPage">
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
                    <Form className="formContainer" onSubmit={handleSubmit}>
                        <Form.Group>
                            <div><Form.Label>Host Name: </Form.Label></div>
                            <ErrorMessage name="host_name" component="span" />
                            <Form.Select
                                id="inputCreateResult"
                                name="host_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.host_name}
                                isInvalid={!!errors.host_name}
                            >
                                <option label='Select a Host'></option>
                                {hostName.map((id) => <option key={id} value={id}>{id}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <div><Form.Label>Guest Name:</Form.Label></div>
                            <ErrorMessage name="guest_name" component="span" />
                            <Form.Select
                                id="inputCreateResult"
                                name="guest_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.guest_name}
                                isInvalid={!!errors.guest_name}
                            >
                                <option label='Select a Guest'></option>
                                {guestName.map((id) => <option key={id} value={id}>{id}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <div><Form.Label>Home Goals:</Form.Label></div>
                            <ErrorMessage name="home_goals" component="span" />
                            <Form.Control
                                autocomplete="off"
                                id="inputCreateResult"
                                name="home_goals"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.home_goals}
                                isInvalid={!!errors.home_goals}
                            />
                        </Form.Group>
                        <Form.Group>
                            <div><Form.Label>Away Goals: </Form.Label></div>
                            <ErrorMessage name="away_goals" component="span" />
                            <Form.Control
                                autocomplete="off"
                                id="inputCreateResult"
                                name="away_goals"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.away_goals}
                                isInvalid={!!errors.away_goals}
                            />
                        </Form.Group>
                        <Form.Group >
                            <div><Form.Label>Date:</Form.Label></div>
                            <Form.Control
                                type="date"
                                autocomplete="off"
                                id="inputCreatePlayer"
                                name="date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.date}
                                isInvalid={!!errors.date}
                            />
                        </Form.Group>
                        <Form.Group>
                            <div><Form.Label>Venue: </Form.Label></div>
                            <ErrorMessage name="venue" component="span" />
                            <Form.Control
                                autocomplete="off"
                                id="inputCreateResult"
                                name="venue"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.venue}
                                isInvalid={!!errors.venue}
                            />
                        </Form.Group>
                        <button type="submit"> Edit Result</button>
                        <Link to={'/results'} className='edit'>Cancel</Link>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default EditResult