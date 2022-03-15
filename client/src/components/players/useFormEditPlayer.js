import { useState, useEffect } from "react";
import * as Yup from 'yup';
import { useNavigate, useParams } from "react-router-dom";

const useFormEditPlayer = () => {
    const BASE_URL = process.env.REACT_APP_URL

    const [teams, setTeams] = useState([]);
    const [teamName, setTeamName] = useState([]);
    const [playersName, setPlayersName] = useState([]);

    const [name, setName] = useState([]);
    const [teamId, setTeamId] = useState([]);
    const [position, setPosition] = useState([]);
    const [age, setAge] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getTeams();
        getPlayer();
        getPlayerValues();
    }, []);

    const getTeams = async () => {
        try {
            const response = await fetch(`${BASE_URL}/teams`)
            return response.json()
                .then(data => {
                    setTeams(data)
                    const team = data.map(team => team.team_name).flat();
                    setTeamName(team)
                    setError(null)
                    setIsLoading(false)
                })
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }
    }

    const getPlayer = async () => {
        try {
            const response = await fetch(`${BASE_URL}/players`)
            return response.json()
                .then(data => {
                    const players = data.players.map(player => player.name).flat();
                    setPlayersName(players)
                    setError(null)
                    setIsLoading(false)
                })
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }
    }

    const getPlayerValues = async () => {
        try {
            const response = await fetch(`${BASE_URL}/players/${id}`,)
            return response.json()
                .then(data => {
                    setName(data.name)
                    setTeamId(data.teamId)
                    setPosition(data.position)
                    setAge(data.age)
                    setError(null)
                    setIsLoading(false)
                })
        } catch (error) {
            setError(error)
            setIsLoading(false)
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
        name: Yup.string().required("Name is required!").min(3, "Name should be atleast 3 characters!").max(20, "Name should be maximum 20 characters!")
            .notOneOf(playersName, 'Player with this name already exists!'),
        position: Yup.string().required("Position field is required!").min(2, "Minimum position value is 2 characters!").max(15, "Maxmimum position value is 10 characters!"),
        age: Yup.number("Age is a number value!").required("Age is required!").min(15, "Player should be atleast 15 years of age!").max(45, "Player is too old, maximum age is 45!")
    });

    const onSubmit = async (data) => {
        data.teamId = await teams.find(team => team.team_name === data.team_name).id
        fetch(`${BASE_URL}/players/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            navigate('/players')
        })
    }

    return { initialValues, validationSchema, onSubmit, error, isLoading, teamName }

}

export default useFormEditPlayer