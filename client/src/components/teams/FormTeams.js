import { useState, useEffect } from 'react';
import { Spinner } from "react-bootstrap";
import { Link, } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const FormTeams = () => {
    const BASE_URL = process.env.REACT_APP_URL

    const [isLoading, setIsLoading] = useState(true);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        try {
            const response = await fetch(`${BASE_URL}/teams`)
            return response.json()
                .then(data => {
                    setTeams(data)
                    setIsLoading(false)
                    return data
                })
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) {
        return (<Spinner animation="border" variant="primary" />)
    }

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

    return (
        <tbody>
            {teams.map((team, index) => (
                <tr key={team.id}>
                    <td>{index + 1}.</td>
                    <td>{team.team_name}</td>
                    <td>
                        <ButtonGroup>
                            <Link to={`/Teams/${team.id}`} className='link'>View</Link>
                            <Link to={`/Teams/edit/${team.id}`} className='edit'>Edit</Link>
                            <Button variant="danger" onClick={() => deleteTeam(team.id)}>Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

export default FormTeams