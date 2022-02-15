import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import './Teams.css';
import { Form } from 'react-bootstrap'

const AddTeam = () => {
    const { REACT_APP_URL_TEAMS } = process.env
    const URL = REACT_APP_URL_TEAMS

    const navigate = useNavigate();
    const [teams, setTeam] = useState([]);
    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        const response = await fetch(URL)
        return response.json()
            .then(data => {
                const team = data.map(team => team.team_name).flat();
                setTeam(team)
            })
    }

    const initialValues = {
        team_name: "",
    };

    const validationSchema = Yup.object().shape({
        team_name: Yup.string().required("Team Name field is required!").min(3, "Team name should be atleast 3 characters!").max(20, "Name is too long, maximum is 20 characters!")
            .notOneOf(teams, 'Team with this name exists!')
    });

    const onSubmit = (data) => {
        fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            navigate('/teams')
        })
    }

    return (
        <div className="createTeamPage">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="formContainer" md="4">
                            <Form.Label>Team Name:</Form.Label>
                            <ErrorMessage name="team_name" component="span" />
                            <Form.Control
                                type="text"
                                autocomplete="off"
                                id="inputCreateTeam"
                                name="team_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.team_name}
                                isInvalid={!!errors.team_name}
                            />
                            <button type="submit">Create Team</button>
                            <Link to={'/teams'} className='edit'>Cancel</Link>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddTeam