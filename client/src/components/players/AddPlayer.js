import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import './Players.css';

const AddPlayer = () => {
    const { REACT_APP_URL_PLAYERS, REACT_APP_URL_TEAMS } = process.env
    const URL = REACT_APP_URL_PLAYERS
    const URL_TEAMS = REACT_APP_URL_TEAMS

    const [teamName, setTeamName] = useState([]);
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getTeams();
        getPlayers();
    }, []);

    const getTeams = async () => {
        try {
            const response = await fetch(URL_TEAMS)
            return response.json()
                .then(data => {
                    setTeams(data)
                    const team_name = data.map(team => team.team_name).flat();
                    setTeamName(team_name)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getPlayers = async () => {
        try {
            const response = await fetch(URL)
            return response.json()
                .then(data => {
                    const player = data.players.map(player => player.name).flat();
                    setPlayers(player)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const initialValues = {
        team_name: "",
        name: "",
        position: "",
        age: "",
    };

    const validationSchema = Yup.object().shape({
        team_name: Yup.string().required("Team name is required!"),
        name: Yup.string().required("Name is required!").min(3, "Name should be atleast 3 characters!").max(15, "Name should be maximum 15 characters!")
            .notOneOf(players, 'Player with this name already exists!'),
        position: Yup.string().min(2, "Minimum position value is 2 characters!").max(10, "Maxmimum position value is 10 characters!").required("Position field is required!"),
        age: Yup.number("Age is a number value!").min(15, "Player should atleast 15 years of age!").max(45, "Player is too old, maximum age is 45!").required("Age is required!"),
    });

    const onSubmit = async (data) => {
        data.teamId = teams.find(team => team.team_name === data.team_name).id
        fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            navigate('/players')
        })
    }
    return (
        <div className="createPlayerPage">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
                    <Form className="formContainer" onSubmit={handleSubmit}>
                        <Form.Group >
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
                        <Form.Group >
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
                        <Form.Group >
                            <div> <Form.Label>Position:</Form.Label></div>
                            <ErrorMessage name="position" component="span" />
                            <Form.Control
                                type="text"
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
                        <button type="submit"> Create Player </button>
                        <Link to={'/players'} className='edit'>Cancel</Link>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddPlayer