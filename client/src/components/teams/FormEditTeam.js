import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

const FormEditTeam = () => {
    const BASE_URL = process.env.REACT_APP_URL

    const [team, setTeam] = useState([]);
    const [team_name, setTeamName] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getTeams();
        getTeamValues();
    }, []);

    const getTeams = async () => {
        try {
            const response = await fetch(`${BASE_URL}/teams`)
            return response.json()
                .then(data => {
                    const team = data.map(team => team.team_name).flat();
                    setTeam(team)
                })
        } catch (error) {
            console.log(error)
        }
    }
    const getTeamValues = async () => {
        try {
            const response = await fetch(`${BASE_URL}/teams/${id}`,)
            return response.json()
                .then(data => {
                    const teamName = data.teamPlayers.map(team => team.team_name).flat();
                    setTeamName(teamName[0])
                })
        } catch (error) {
            console.log(error)
        }
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
        team_name: Yup.string().required("Team Name field is required!").min(3, "Team name is too short, minimum is 3 characters!").max(20, "Team name is too long, maximum is 20 characters!")
            .notOneOf(team, 'Team with this name exists!')
    });

    const onSubmit = (data) => {
        fetch(`${BASE_URL}/teams/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            navigate('/teams')
        })
    }
    return { initialValues, validationSchema, onSubmit }
}

export default FormEditTeam