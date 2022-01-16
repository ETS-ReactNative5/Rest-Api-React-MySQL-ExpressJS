import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, } from "react-router-dom";
import * as Yup from 'yup'
import './Results.css'

const EditResult = () => {
    const [hostId, setHostId] = useState([]);
    const [guestId, setGuestId] = useState([]);

    const [host_id, setHost_id] = useState([]);
    const [guest_id, setGuest_id] = useState([]);
    const [home_goals, setHomeGoals] = useState([]);
    const [away_goals, setAwayGoals] = useState([]);
    const [date, setDate] = useState([]);
    const [venue, setVenue] = useState([])
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getTeamsId();
        getResultValues();
    }, []);

    const getTeamsId = async () => {
        const response = await axios.get('http://localhost:5000/teams')
        const teams = response.data.map(team => team.id).flat();
        setHostId(teams)
        setGuestId(teams)
    }

    const getResultValues = async () => {
        const response = await axios.get(`http://localhost:5000/results/${id}`)
        console.log(response.data)
        setHost_id(response.data.host_id)
        setGuest_id(response.data.guest_id)
        setHomeGoals(response.data.home_goals)
        setAwayGoals(response.data.away_goals)
        setDate(response.data.date)
        setVenue(response.data.venue)
    }

    const initialValues = {
        host_id: host_id,
        guest_id: guest_id,
        home_goals: home_goals,
        away_goals: away_goals,
        date: date,
        venue: venue,
    };

    const validationSchema = Yup.object().shape({
        host_id: Yup.number("Id is a number value!").oneOf(hostId, 'No such host with this Id!'),
        guest_id: Yup.number("Id is a number value!").oneOf(guestId, 'No such guest with this Id!')
            .when('host_id', (host_id, schema) => {
                return schema.test({
                    test: guest_id => guest_id !== '' || guest_id !== host_id,
                    message: 'One team cannot play against each other!'
                })
            }),
        home_goals: Yup.number("Goals is a number value!").min(0, "Result cannot be negative!"),
        away_goals: Yup.number("Goals is a number value!").min(0, "Result cannot be negative!"),
        date: Yup.date(),
        venue: Yup.string()
    });

    const onSubmit = (data) => {
        axios.patch(`http://localhost:5000/results/${id}`, data)
        navigate("/");
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
                    <label>Host Id: </label>
                    <ErrorMessage name="host_id" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreateResult"
                        name="host_id"
                    />
                    <label>Guest Id: </label>
                    <ErrorMessage name="guest_id" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreateResult"
                        name="guest_id"
                    />  <label>Home Goals: </label>
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