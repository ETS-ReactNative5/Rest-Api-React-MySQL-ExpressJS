import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom';
import './Results.css'


const AddResult = () => {
    const [hostId, setHostId] = useState([]);
    const [guestId, setGuestId] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getTeamId();
    }, []);

    const getTeamId = async () => {
        const response = await axios.get('http://localhost:5000/teams')
        const teams = response.data.map(team => team.id).flat();
        setHostId(teams)
        setGuestId(teams)
    }

    const initialValues = {
        host_id: "",
        guest_id: "",
        home_goals: "",
        away_goals: "",
        date: "",
        venue: "",
    };

    const validationSchema = Yup.object().shape({
        host_id: Yup.number().required("Host Id field is required!").oneOf(hostId, 'No such host with this Id!'),
        guest_id: Yup.number().required("Guest Id field is required!").oneOf(guestId, 'No such guest with this Id!')
            .when('host_id', (host_id, schema) => {
                return schema.test({
                    test: guest_id => guest_id !== host_id,
                    message: 'One team cannot play against each other!'
                })
            }),
        home_goals: Yup.number("Goals is a number value!").required("Home Goals are required!").min(0,"Result cannot be negative!"),
        away_goals: Yup.number("Goals is a number value!").required("Away Goals are required!").min(0, "Result cannot be negative!"),
        date: Yup.date().required("Date is required!"),
        venue: Yup.string().required("Venue is required!"),
    });

    const onSubmit = (data) => {
        axios.post('http://localhost:5000/results', data)
        navigate('/')
    };

    return (
        <div className="createResultPage">
            <Formik
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
                        placeholder="(Ex. 2022-01-11)"
                    />
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

export default AddResult