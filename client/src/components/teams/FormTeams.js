import { useState, useEffect } from 'react';
import { Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const FormTeams = (apiFunc) => {
    const BASE_URL = process.env.REACT_APP_URL

    const [isLoading, setIsLoading] = useState(true);
    const [teams, setTeams] = useState(null);

   

    const requestGetTeams = async (...args) => {
        try {
            const response = await apiFunc(...args)
            return response.json()
                .then(data => {
                    setTeams(data)
                    setIsLoading(false)
                })
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) {
        return (<Spinner animation="border" variant="primary" />)
    }

    const requestDeleteTeam = async (...args) => {
        try {
            await fetch(...args, {
                method: "DELETE",
            }).then(response => {
              //  setTeams(teams.filter(team => team.id !== id))
                return response.json()
            })
        } catch (error) {
            console.log(error)
        }
    }
    return { teams, requestGetTeams, requestDeleteTeam, isLoading }
}

export default FormTeams