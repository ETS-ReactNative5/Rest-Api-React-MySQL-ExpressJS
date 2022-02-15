import { useState, useEffect } from 'react';
import { Link, } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Form } from 'react-bootstrap'
import './Teams.css';

const EditTeam = () => {
    const { REACT_APP_URL_TEAMS } = process.env
    const URL = REACT_APP_URL_TEAMS

    const [team, setTeam] = useState([]);
    const [team_name, setTeamName] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getTeams();
        getTeamValues();
    }, []);

    const getTeams = async () => {
        try {
            const response = await fetch(URL)
            return response.json()
                .then(data => {
                    const team = data.map(team => team.team_name).flat();
                    setTeam(team)
                })
        } catch (error) {
            console.log(error)
        }
    }
    const getTeamValues = async () => {
        try {
            const response = await fetch(`${URL}/${id}`,)
            return response.json()
                .then(data => {
                    const teamName = data.teamPlayers.map(team => team.team_name).flat();
                    setTeamName(teamName[0])
                })
        } catch (error) {
            console.log(error)
        }
    }

    for (var i = 0; i < team.length; i++) {
        if (team[i] === team_name) {
            team.splice(i, 1)
        }
    }

    const initialValues = {
        team_name: team_name,
    };

    const validationSchema = Yup.object().shape({
        team_name: Yup.string().required("Team Name field is required!").min(3, "Team name is too short, minimum is 3 characters!").max(20, "Team name is too long, maximum is 20 characters!")
            .notOneOf(team, 'Team with this name exists!')
    });

    const onSubmit = (data) => {
        fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            navigate('/teams')
        })
    }

    return (
        <div className="createTeamPage">
            <Formik
                enableReinitialize
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
                                autocomplete="off"
                                id="inputCreateTeam"
                                name="team_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.team_name}
                                isInvalid={!!errors.team_name}
                            />
                            <button type="submit">Edit</button>
                            <Link to={'/teams'} className='edit'>Cancel</Link>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default EditTeam