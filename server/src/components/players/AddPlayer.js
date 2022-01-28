import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import './Players.css';
import { Dropdown, Dropdwon } from 'react-bootstrap'

const AddPlayer = () => {
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
            await fetch('http://localhost:5000/teams',)
                .then((response) => {
                    return response.json();
                }).then(data => {
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
            await fetch('http://localhost:5000/players/',)
                .then((response) => {
                    return response.json();
                }).then(data => {
                    const player = data.map(player => player.name).flat();
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
        fetch('http://localhost:5000/players', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            navigate('/players')
        })
    }
    return (
        <Dropdown>
                    <div className="createPlayerPage">
            <Formik
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
                        <Dropdown.Item>Select a Team</Dropdown.Item>
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
                    <button type="submit"> Create Player </button>
                    <Link to={'/players'} className='edit'>Cancel</Link>
                </Form>
            </Formik>
        </div>
        </Dropdown>

    );
}

export default AddPlayer