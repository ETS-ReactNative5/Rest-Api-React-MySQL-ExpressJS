import { useState, useEffect } from 'react';
import { Link, } from "react-router-dom";
import { Spinner, Button, ButtonGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Teams = () => {
    const { REACT_APP_URL_TEAMS } = process.env
    const URL = REACT_APP_URL_TEAMS

    const [isLoading, setIsLoading] = useState(true);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        try {
            const response = await fetch(URL)
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

    const deleteTeam = async (id) => {
        try {
            await fetch(`${URL}/${id}`, {
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
        <div style={{ textAlign: 'center' }}>
            <h2 className='centered'>Clubs</h2>
            <div style={{ textAlign: "left" }}><Link to="/Teams/add" className="link">Add New</Link></div>
            <table>
                <thead>
                    <tr >
                        <th>№</th>
                        <th style={{ width: "50%" }}>Team</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody >
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
            </table>
            <div style={{ textAlign: "left" }}><Link to={'/'} className='link'>Back To Home Page</Link></div>
        </div>
    )
}

export default Teams