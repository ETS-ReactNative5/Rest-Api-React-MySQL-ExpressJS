import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const useFormAddTeam = () => {
    const BASE_URL = process.env.REACT_APP_URL

    const navigate = useNavigate();
    const [teams, setTeam] = useState([]);
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {
        try {
            const response = await fetch(`${BASE_URL}/teams`)
            return response.json()
                .then(data => {
                    const team = data.map(team => team.team_name).flat();
                    setTeam(team)
                    setError(null)
                    setIsLoading(false)
                })
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }
    }, [BASE_URL]);

    const initialValues = {
        team_name: "",
    };

    const validationSchema = Yup.object().shape({
        team_name: Yup.string().required("Team Name field is required!").min(3, "Team name should be atleast 3 characters!").max(20, "Name is too long, maximum is 20 characters!")
            .notOneOf(teams, 'Team with this name exists!')
    });

    const onSubmit = (data) => {
        fetch(`${BASE_URL}/teams`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            navigate('/teams')
        })
    }

    return { initialValues, validationSchema, error, isLoading, onSubmit }
}

export default useFormAddTeam