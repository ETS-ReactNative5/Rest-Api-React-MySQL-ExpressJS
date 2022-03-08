import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const useFormGetTeam = () => {
    const BASE_URL = process.env.REACT_APP_URL

    const [team, setTeam] = useState([]);
    const [homeResults, sethomeResults] = useState([]);
    const [awayResults, setAwayResult] = useState([]);
    const [players, setPlayers] = useState([]);
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(async () => {
        try {
            const response = await fetch(`${BASE_URL}/teams/${id}`)
            return response.json()
                .then(data => {
                    const unique = data.awayResults.map(team => team.team_name)
                    setTeam(unique.filter((elem, index, self) => { return index === self.indexOf(elem) }))

                    const homeResultGuestName = data.homeResults.map((item, index) => Object.assign({}, item, data.guestTeamName[index]))
                    sethomeResults(homeResultGuestName)

                    const awayResultsHostName = data.awayResults.map((item, index) => Object.assign({}, item, data.hostTeamName[index]))
                    setAwayResult(awayResultsHostName)

                    const teamPlayers = data.teamPlayers
                    setPlayers(teamPlayers)

                    setError(null)
                    setIsLoading(false)
                })
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }
    }, [BASE_URL]);

    return { team, homeResults, awayResults, players, error, isLoading }
}

export default useFormGetTeam