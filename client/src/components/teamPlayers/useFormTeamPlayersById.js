import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const useFormTeamPlayersById = () => {
    const BASE_URL = process.env.REACT_APP_URL

    const [teamPlayersById, setTeamPlayersById] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const { id } = useParams();

    useEffect(async () => {
        try {
            const response = await fetch(`${BASE_URL}/team-players/${id}`,)
            return response.json()
                .then(data => {
                    setTeamPlayersById(data)
                    setError(null)
                    setIsLoading(false)
                })
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }
    }, [BASE_URL]);

    return { teamPlayersById, error, isLoading }
}

export default useFormTeamPlayersById