import { useState, useEffect } from "react";

const useFormMainTeamPlayers = () => {
    const BASE_URL = process.env.REACT_APP_URL

    const [isLoading, setIsLoading] = useState(true);
    const [teamPlayers, setTeamPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState(null)

    useEffect(() => {
        getTeamPlayers();
        getTeams();
    }, [BASE_URL]);

    const getTeamPlayers = async () => {
        try {
            const response = await fetch(`${BASE_URL}/team-players`)
            return response.json()
                .then(data => {
                    const res = data.filter((value) => {
                        return value['players.id'] != null
                    })
                    setTeamPlayers(res)
                    setError(null)
                    setIsLoading(false)
                })
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }
    }

    const getTeams = async () => {
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
    }
    return { teams, teamPlayers, error, isLoading }
}

export default useFormMainTeamPlayers