import { useState, useEffect } from 'react';

const FormTeams = () => {
    const BASE_URL = process.env.REACT_APP_URL

    const [isLoading, setIsLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState(null)

    useEffect(async () => {
        try {
            const response = await fetch(`${BASE_URL}/teams`)
            return response.json()
                .then(data => {
                    setTeams(data)
                    setError(null)
                    setIsLoading(false)
                })
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }
    }, [BASE_URL]);


    const deleteTeam = async (id) => {
        try {
            await fetch(`${BASE_URL}/teams/${id}`, {
                method: "DELETE",
            }).then(response => {
                setTeams(teams.filter(team => team.id !== id))
                return response.json()
            })
        } catch (error) {
            console.log(error)
        }
    }

    return { teams, error, deleteTeam, isLoading }
}

export default FormTeams