import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useFormGetTeam from './useFormGetTeam';

const Team = () => {
    const { team, homeResults, awayResults, players, error, isLoading } = useFormGetTeam()

    if (isLoading) {
        return (<Spinner animation="border" variant="primary" />)
    }
    if (error) {
        return <div>There was an error: {error}</div>
    }

    return (
        <div>
            <h2 className='centeredSecond'>Home Results</h2>
            <table className='getTeams'>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Date</th>
                        <th>Home Team</th>
                        <th>Home Goals</th>
                        <th>Away Goals</th>
                        <th>Away Team</th>
                        <th>Venue</th>
                    </tr>
                </thead>
                <tbody>
                    {homeResults.map((homeResult, index) => (
                        <tr key={homeResult.id}>
                            <td>{index + 1}.</td>
                            <td>{homeResult['homeTeam.date']} </td>
                            <td>{team}</td>
                            <td>{homeResult['homeTeam.home_goals']}</td>
                            <td>{homeResult['homeTeam.away_goals']}</td>
                            <td>{homeResult['team_name']}</td>
                            <td>{homeResult['homeTeam.venue']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className='centeredSecond'>Away Results</h2>
            <table className='getTeams'>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Date</th>
                        <th>Home Team</th>
                        <th>Home Goals</th>
                        <th>Away Goals</th>
                        <th>Away Team</th>
                        <th>Venue</th>
                    </tr>
                </thead>
                <tbody>
                    {awayResults.map((awayResult, index) => (
                        <tr key={awayResult.id}>
                            <td>{index + 1}.</td>
                            <td>{awayResult['awayTeam.date']} </td>
                            <td>{awayResult['team_name']}</td>
                            <td>{awayResult['awayTeam.home_goals']}</td>
                            <td>{awayResult['awayTeam.away_goals']}</td>
                            <td>{team}</td>
                            <td>{awayResult['awayTeam.venue']}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className='centeredSecond'>Players</h2>
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, index) => (
                        <tr key={player.id}>
                            <td>{index + 1}.</td>
                            <td>{player['players.name']}</td>
                            <td>{player['players.position']}</td>
                            <td>{player['players.age']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={'/teams'} className='link'>Back to Teams</Link>
            <div><Link to={'/'} className='link'>Back to Home Page</Link></div>
        </div>
    )
}

export default Team 