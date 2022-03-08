import { useState, useEffect } from "react";

const useFormPlayers = () => {
    const BASE_URL = process.env.REACT_APP_URL
  
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [players, setPlayers] = useState([]);
    const [paranoidTeams, setParanoidTeams] = useState([]);
  
  
    useEffect(async () => {
      try {
        const response = await fetch(`${BASE_URL}/players`)
        return response.json()
          .then(data => {
            setPlayers(data.teamExists)
            setParanoidTeams(data.paranoid)
            setError(null)
            setIsLoading(false)
          })
      } catch (error) {
        setError(error)
        setIsLoading(false)
      }
    }, [BASE_URL]);
  
  
  
    const deletePlayer = async (id) => {
      try {
        await fetch(`${BASE_URL}/players/${id}`, { method: "DELETE" })
          .then((data) => {
            setPlayers(players.filter(player => player.id !== id))
            setParanoidTeams(paranoidTeams.filter(player => player.id !== id))
            return data.json();
          })
      } catch (error) {
        console.log(error)
      }
    }

    return {players, paranoidTeams, error, isLoading, deletePlayer}

}

export default useFormPlayers