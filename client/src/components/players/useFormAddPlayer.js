import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

const useFormAddPlayer = () => {
    const BASE_URL = process.env.REACT_APP_URL

    const [teamName, setTeamName] = useState([]);
    const [teams, setTeams] = useState([]);
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getTeams();
        getPlayers();
    }, [BASE_URL]);

    const getTeams = async () => {
        try {
            const response = await fetch(`${BASE_URL}/teams`)
            return response.json()
                .then(data => {
                    setTeams(data)
                    const team_name = data.map(team => team.team_name).flat();
                    setTeamName(team_name)
                    setError(null)
                    setIsLoading(false)
                })
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }
    }

    const getPlayers = async () => {
        try {
            const response = await fetch(`${BASE_URL}/players`)
            return response.json()
                .then(data => {
                    const player = data.players.map(player => player.name).flat();
                    setPlayers(player)
                    setError(null)
                    setIsLoading(false)
                })
        } catch (error) {
            setError(error)
            setIsLoading(false)
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
        age: Yup.number("Age is a number value!").min(15, "Player should be atleast 15 years of age!").max(45, "Player is too old, maximum age is 45!").required("Age is required!"),
    });

    const onSubmit = async (data) => {
        data.teamId = teams.find(team => team.team_name === data.team_name).id
        fetch(`${BASE_URL}/players`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            navigate('/players')
        })
    }

    return { initialValues, validationSchema, onSubmit, error, isLoading, teamName }

}

export default useFormAddPlayer