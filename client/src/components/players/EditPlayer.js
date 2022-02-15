import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import './Players.css';

const EditPlayer = () => {
    const { REACT_APP_URL_PLAYERS, REACT_APP_URL_TEAMS } = process.env
    const URL = REACT_APP_URL_PLAYERS
    const URL_TEAMS = REACT_APP_URL_TEAMS

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
            const response = await fetch(URL_TEAMS)
            return response.json()
                .then(data => {
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
            const response = await fetch(URL)
            return response.json()
                .then(data => {
                    const players = data.players.map(player => player.name).flat();
                    setPlayersName(players)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getPlayerValues = async () => {
        try {
            const response = await fetch(`${URL}/${id}`,)
            return response.json()
                .then(data => {
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
        team_name: Yup.string().required("Team name is required!"),
        name: Yup.string().required("Name is required!").min(3, "Name should be atleast 3 characters!").max(15, "Name should be maximum 15 characters!")
            .notOneOf(playersName, 'Player with this name already exists!'),
        position: Yup.string().required("Position field is required!").min(2, "Minimum position value is 2 characters!").max(10, "Maxmimum position value is 10 characters!"),
        age: Yup.number("Age is a number value!").required("Age is required!").min(15, "Player should atleast 15 years of age!").max(45, "Player is too old, maximum age is 45!")
    });

    const onSubmit = async (data) => {
        data.teamId = await teams.find(team => team.team_name === data.team_name).id
        fetch(`${URL}/${id}`, {
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
                {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
                    <Form className="formContainer" onSubmit={handleSubmit}>
                        <Form.Group>
                            <div><Form.Label>Team Name:</Form.Label></div>
                            <ErrorMessage name="team_name" component="span" />
                            <Form.Select 
                                id="inputCreatePlayer"
                                name="team_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.team_name}
                                isInvalid={!!errors.team_name}
                            >
                                <option label='Select Team'></option>
                                {teamName.map((id) => <option key={id} value={id}>{id}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <div><Form.Label>Name:</Form.Label></div>
                            <ErrorMessage name="name" component="span" />
                            <Form.Control
                                type="text"
                                autocomplete="off"
                                id="inputCreatePlayer"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                isInvalid={!!errors.name}
                            />
                        </Form.Group>
                        <Form.Group>
                            <div><Form.Label>Position:</Form.Label></div>
                            <ErrorMessage name="position" component="span" />
                            <Form.Control
                                autocomplete="off"
                                id="inputCreatePlayer"
                                name="position"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.position}
                                isInvalid={!!errors.position}
                            />
                        </Form.Group>
                        <Form.Group>
                            <div><Form.Label>Age:</Form.Label></div>
                            <ErrorMessage name="age" component="span" />
                            <Form.Control
                                autocomplete="off"
                                id="inputCreatePlayer"
                                name="age"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.age}
                                isInvalid={!!errors.age}
                            />
                        </Form.Group>
                        <button type="submit"> Edit Player</button>
                        <Link to={'/players'} className='edit'> Cancel </Link>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default EditPlayer