import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, } from "react-router-dom";
import * as Yup from 'yup';
import './Results.css';

const EditResult = () => {
    const [hostName, setHostName] = useState([]);
    const [guestName, setGuestName] = useState([]);
    const [teams, setTeams] = useState([]);

    const [host_id, setHost_id] = useState([]);
    const [guest_id, setGuest_id] = useState([]);
    const [home_goals, setHomeGoals] = useState([]);
    const [away_goals, setAwayGoals] = useState([]);
    const [date, setDate] = useState([]);
    const [venue, setVenue] = useState([])
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getTeams();
        getResultValues();
    }, []);

    const getTeams = async () => {
        try {
            await fetch('http://localhost:5000/teams/',)
                .then((response) => {
                    return response.json();
                }).then(data => {
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
            await fetch(`http://localhost:5000/results/${id}`,)
                .then((response) => {
                    return response.json();
                }).then(data => {
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
        date: Yup.date(),
        venue: Yup.string()
    });

    const onSubmit = (data) => {
        data.host_id = teams.find(team => team.team_name === data.host_name).id
        data.guest_id = teams.find(team => team.team_name === data.guest_name).id

        fetch(`http://localhost:5000/results/${id}`, {
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
                        {hostName.map((id) => <option key={id} value={id}>{id}</option>)}
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
                        {guestName.map((id) => <option key={id} value={id}>{id}</option>)}
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
                    <ErrorMessage name="date" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreateResult"
                        name="date"
                    />
                    <label>Venue: </label>
                    <ErrorMessage name="venue" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreateResult"
                        name="venue"
                    />
                    <button type="submit"> Edit Result</button>
                    <Link to={'/results'} className='edit'>Cancel</Link>
                </Form>
            </Formik>
        </div>
    );
}

export default EditResult