import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Spinner } from 'react-bootstrap';

const TeamPlayers = () => {
    const BASE_URL = process.env.REACT_APP_URL

    const [isLoading, setIsLoading] = useState(true);
    const [teamPlayers, setTeamPlayers] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getTeamPlayers();
        getTeams();
    }, []);

    const getTeamPlayers = async () => {
        try {
            const response = await fetch(`${BASE_URL}/team-players`)
            return response.json()
                .then(data => {
                    const res = data.filter((value) => {
                        return value['players.id'] != null
                    })
                    setTeamPlayers(res)
                    setIsLoading(false)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getTeams = async () => {
        try {
            const response = await fetch(`${BASE_URL}/teams`)
            return response.json()
                .then(data => {
                    setTeams(data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) {
        return (<Spinner animation="border" variant="primary" />)
    }

    return (
        <div>
            <h2 className='centeredSecond'>All Team Players</h2>
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Team Name</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {teamPlayers.map((value, index) => (
                        <tr key={value['players.id']}>
                            <td>{index + 1}.</td>
                            <td>{value['team_name']}</td>
                            <td>{value['players.name']}</td>
                            <td>{value['players.age']}</td>
                            <td>{value['players.position']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h2 className='centeredSecond'>View Team Players</h2>
                <table>
                    <thead>
                        <th>№</th>
                        <th>Team</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {teams.map((value, index) => (
                            <tr key={value['id']}>
                                <td>{index + 1}.</td>
                                <td>{value['team_name']}</td>
                                <td>
                                    <Link to={`/Team-Players/${value.id}`} className='link'>View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div><Link to={'/'} className='link'>Back to Home Page</Link></div>
        </div>
    )
}

export default TeamPlayers