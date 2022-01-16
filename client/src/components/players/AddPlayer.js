import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import { Link } from 'react-router-dom';
import './Players.css'

const AddPlayer = () => {
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getTeamId();
        getPlayers();
    }, []);

    const getTeamId = async () => {
        const response = await axios.get('http://localhost:5000/teams')
        const teamId = response.data.map(team => team.id).flat();
        setTeams(teamId)
    }

    const getPlayers = async () => {
        const response = await axios.get('http://localhost:5000/players')
        const player = response.data.map(player => player.name).flat();
        console.log(player)
        setPlayers(player)
    }

    const initialValues = {
        teamId: "",
        name: "",
        position: "",
        age: "",
    };

    const validationSchema = Yup.object().shape({
        teamId: Yup.number("Id is a number value!").required("Team Id is required!").oneOf(teams, 'No such team with this id'),
        name: Yup.string().required("Name is required!").min(3, "Name should be atleast 3 characters!").max(15, "Name should be maximum 15 characters!")
            .notOneOf(players, 'Player with this name already exists!'),
        position: Yup.string().min(2, "Minimum position value is 2 characters!").max(10,"Maxmimum position value is 10 characters!").required("Position field is required!"),
        age: Yup.number("Age is a number value!").min(15, "Player should atleast 15 years of age!").max(45,"Player is too old, maximum age is 45!").required("Age is required!"),
    });

    const onSubmit = (data) => {
        axios.post('http://localhost:5000/players', data)
        navigate('/')
    }

    return (
        <div className="createPlayerPage">
            <Formik
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
                    <button type="submit"> Create Player</button>
                    <Link to={'/players'} className='edit'>Cancel</Link>
                </Form>
            </Formik>
        </div>
    );
}

export default AddPlayer