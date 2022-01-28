import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import './Results.css';


const AddResult = () => {
    const [teamHost, setTeamHost] = useState([]);
    const [teamGuest, setTeamGuest] = useState([]);
    const [teams, setTeams] = useState([]);

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
        data.host_id = teams.find(team => team.team_name === data.host_name).id
        data.guest_id = teams.find(team => team.team_name === data.guest_name).id

        fetch('http://localhost:5000/results/', {
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