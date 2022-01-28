import { useState, useEffect } from 'react'
import { Link, } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import './Players.css';

const EditPlayer = () => {
    const [teams, setTeams] = useState([]);
    const [teamName, setTeamName] = useState([]);
    const [playersName, setPlayersName] = useState([]);

    const [name, setName] = useState([]);
    const [teamId, setTeamId] = useState([]);
    const [position, setPosition] = useState([]);
    const [age, setAge] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getTeams();
        getPlayer();
        getPlayerValues();
    }, []);

    const getTeams = async () => {
        try {
            await fetch('http://localhost:5000/teams',)
                .then((response) => {
                    return response.json();
                }).then(data => {
                    setTeams(data)
                    const team = data.map(team => team.team_name).flat();
                    setTeamName(team)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getPlayer = async () => {
        try {
            await fetch('http://localhost:5000/players/',)
                .then((response) => {
                    return response.json();
                }).then(data => {
                    const player = data.map(player => player.name).flat();
                    setPlayersName(player)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getPlayerValues = async () => {
        try {
            await fetch(`http://localhost:5000/players/${id}`,)
                .then((response) => {
                    return response.json();
                }).then(data => {
                    setName(data.name)
                    setTeamId(data.teamId)
                    setPosition(data.position)
                    setAge(data.age)
                })
        } catch (error) {
            console.log(error)
        }
    }

    for (var i = 0; i < playersName.length; i++) {
        if (playersName[i] === name) {
            playersName.splice(i, 1)
        }
    }

    const team = teams.filter(team => team.id === teamId)
    const team_name = team.map(team => team.team_name).toString()

    const initialValues = {
        team_name: team_name,
        name: name,
        position: position,
        age: age,
    };

    const validationSchema = Yup.object().shape({
        team_name: Yup.string(),
        name: Yup.string().min(3, "Name should be atleast 3 characters!").max(15, "Name should be maximum 15 characters!")
            .notOneOf(playersName, 'Player with this name already exists!'),
        position: Yup.string().min(2, "Minimum position value is 2 characters!").max(10, "Maxmimum position value is 10 characters!"),
        age: Yup.number("Age is a number value!").min(15, "Player should atleast 15 years of age!").max(45, "Player is too old, maximum age is 45!")
    });

    const onSubmit = async (data) => {
        data.teamId = await teams.find(team => team.team_name === data.team_name).id
        fetch(`http://localhost:5000/players/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            navigate('/players')
        })
    }

    return (
        <div className="createPlayerPage">
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="formContainer">
                    <label>Team Name: </label>
                    <ErrorMessage name="team_name" component="span" />
                    <Field
                        component="select"
                        autocomplete="off"
                        id="inputCreatePlayer"
                        name="team_name"
                    >
                        <option label='Select Team'></option>
                        {teamName.map((id) => <option key={id} value={id}>{id}</option>)}
                    </Field>
                    <label>Name: </label>
                    <ErrorMessage name="name" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePlayer"
                        name="name"
                    />
                    <label>Position: </label>
                    <ErrorMessage name="position" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePlayer"
                        name="position"
                    />
                    <label>Age: </label>
                    <ErrorMessage name="age" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePlayer"
                        name="age"
                    />
                    <button type="submit"> Edit Player</button>
                    <Link to={'/players'} className='edit'> Cancel </Link>
                </Form>
            </Formik>
        </div>
    );
}

export default EditPlayer