import { Link } from "react-router-dom";
import { Spinner } from 'react-bootstrap';
import useFormMainTeamPlayers from './useFormMainTeamPlayers';

const TeamPlayers = () => {
    const { teams, teamPlayers, error, isLoading } = useFormMainTeamPlayers()

    if (isLoading) {
        return (<Spinner animation="border" variant="primary" />)
    }
    if (error) {
        return <div>There was an error: {error}</div>
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