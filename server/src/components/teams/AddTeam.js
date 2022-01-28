import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import './Teams.css';
import { Link } from 'react-router-dom';

const AddTeam = () => {
    const navigate = useNavigate();
    const [teams, setTeam] = useState([]);
    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        await fetch('http://localhost:5000/teams/',)
            .then((response) => {
                return response.json();
            }).then(data => {
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

    const onSumbit = (data) => {
        fetch('http://localhost:5000/teams', {
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
                onSubmit={onSumbit}
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
                    <button type="submit">Create Team</button>
                    <Link to={'/teams'} className='edit'>Cancel</Link>

                </Form>
            </Formik>
        </div>
    );
}

export default AddTeam