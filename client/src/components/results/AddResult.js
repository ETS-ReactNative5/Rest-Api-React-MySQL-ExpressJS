import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom';
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import './Results.css';

const AddResult = () => {
    const BASE_URL = process.env.REACT_APP_URL

    const [teamHost, setTeamHost] = useState([]);
    const [teamGuest, setTeamGuest] = useState([]);
    const [teams, setTeams] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        try {
            const response = await fetch(`${BASE_URL}/teams`)
            return response.json()
                .then(data => {
                    setTeams(data)
                    const teams = data.map(team => team.team_name).flat();
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
        data.host_id = teams.find(team => team.team_name === data.host_name).id
        data.guest_id = teams.find(team => team.team_name === data.guest_name).id
        fetch(`${BASE_URL}/results`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            navigate('/results')
        })
    };

    return (
        <div className="createResultPage">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
                    <Form className="formContainer" onSubmit={handleSubmit}>
                        <Form.Group>
                            <div><Form.Label>Host Name:</Form.Label></div>
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
                                {teamHost.map((id) => <option key={id} value={id}>{id}</option>)}
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
                                {teamGuest.map((id) => <option key={id} value={id}>{id}</option>)}
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
                            <div><Form.Label>Away Goals:</Form.Label></div>
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
                            <div><Form.Label>Venue:</Form.Label></div>
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
                        <button type="submit"> Create Result</button>
                        <Link to={'/results'} className='edit'>Cancel</Link>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddResult