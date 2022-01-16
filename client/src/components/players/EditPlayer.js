import { useState, useEffect } from 'react'
import axios from "axios";
import { Link, } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import './Players.css'

const EditPlayer = () => {
    const [team, setTeam] = useState([]);
    const [players, setPlayers] = useState([]);

    const [name, setName] = useState([]);
    const [teamId, setTeamId] = useState([]);
    const [position, setPosition] = useState([]);
    const [age, setAge] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getTeamId();
        getPlayers();
        getPlayerValues();
    }, []);

    const getTeamId = async () => {
        const response = await axios.get('http://localhost:5000/teams')
        const team = response.data.map(team => team.id).flat();
        setTeam(team)
    }

    const getPlayers = async () => {
        const response = await axios.get('http://localhost:5000/players')
        const player = response.data.map(player => player.name).flat();
        setPlayers(player)
    }

    const getPlayerValues = async () => {
        const response = await axios.get(`http://localhost:5000/players/${id}`)
        setName(response.data.name)
        setTeamId(response.data.teamId)
        setPosition(response.data.position)
        setAge(response.data.age)
    }

    for (var i = 0; i < players.length; i++) {
        if (players[i] === name) {
            players.splice(i, 1)
        }
    }

    const initialValues = {
        name: name,
        teamId: teamId,
        position: position,
        age: age,
    };

    const validationSchema = Yup.object().shape({
        teamId: Yup.number("Id is a number value!").oneOf(team, 'No such team with this id'),
        name: Yup.string().min(3, "Name should be atleast 3 characters!").max(15, "Name should be maximum 15 characters!")
            .notOneOf(players, 'Player with this name already exists!'),
        position: Yup.string().min(2, "Minimum position value is 2 characters!").max(10, "Maxmimum position value is 10 characters!"),
        age: Yup.number("Age is a number value!").min(15,"Player should atleast 15 years of age!").max(45,"Player is too old, maximum age is 45!")
    });

    const onSubmit = (data) => {
        axios.patch(`http://localhost:5000/players/${id}`, data)
        navigate("/");
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
                    <label>Team Id: </label>
                    <ErrorMessage name="teamId" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePlayer"
                        name="teamId"
                    />
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