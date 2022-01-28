import { useState, useEffect } from 'react';
import { Link, } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import './Teams.css';

const EditTeam = () => {
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
            await fetch('http://localhost:5000/teams/',)
                .then((response) => {
                    return response.json();
                }).then(data => {
                    const team = data.map(team => team.team_name).flat();
                    setTeam(team)
                })
        } catch (error) {
            console.log(error)
        }
    }
    const getTeamValues = async () => {
        try {
            await fetch(`http://localhost:5000/teams/${id}`,)
                .then((response) => {
                    return response.json();
                }).then(data => {
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
        team_name: Yup.string().required().min(3, "Team name is too short, minimum is 3 characters!").max(20, "Team name is too long, maximum is 20 characters!")
            .notOneOf(team, 'Team with this name exists!')
    });

    const onSubmit = (data) => {
        fetch(`http://localhost:5000/teams/${id}`, {
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
                <Form className="formContainer">
                    <label>Team Name:</label>
                    <ErrorMessage name="team_name" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreateTeam"
                        name="team_name"
                    />
                    <button type="submit">Edit</button>
                    <Link to={'/teams'} className='edit'>Cancel</Link>
                </Form>
            </Formik>
        </div>
    )
}

export default EditTeam