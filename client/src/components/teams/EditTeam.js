import { useState, useEffect } from 'react'
import axios from "axios";
import { Link, } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import './Teams.css'

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
        const response = await axios.get('http://localhost:5000/teams')
        const team = response.data.map(team => team.team_name).flat();
        setTeam(team)
    }

    const getTeamValues = async () => {
        const response = await axios.get(`http://localhost:5000/teams/${id}`)
        const teamName = response.data.teamPlayers.map(team => team.team_name).flat();
        setTeamName(teamName[0])
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
        axios.patch(`http://localhost:5000/teams/${id}`, data)
        navigate("/");
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