import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const TeamPlayers = () => {
    const [teamPlayers, setTeamPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        getTeamPlayers()
    }, []);

    useEffect(() => {
        getTeams()
    }, []);

    const getTeamPlayers = async () => {
        try {
            await fetch('http://localhost:5000/team-players/',)
                .then((response) => {
                    return response.json();
                }).then(data => {
                    const res = data.filter((value) => {
                        return value['p.id'] != null
                    })
                    setTeamPlayers(res)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const getTeams = async () => {
        try {

            await fetch('http://localhost:5000/teams/',)
                .then((response) => {
                    return response.json();
                }).then(data => {
                    setTeams(data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div >
            <h2 className='centered'>All Team Players</h2>
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
                        <tr key={value['p.id']}>
                            <td>{index + 1}.</td>
                            <td>{value['team_name']}</td>
                            <td>{value['p.name']}</td>
                            <td>{value['p.age']}</td>
                            <td>{value['p.position']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h2 className='centered'>View Team Players</h2>
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
<Link to={'/'} className='link'>Back to Home Page</Link>
        </div>
    )
}

export default TeamPlayers