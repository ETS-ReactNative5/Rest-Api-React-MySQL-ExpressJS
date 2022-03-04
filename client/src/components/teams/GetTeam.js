import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Team = () => {
    const BASE_URL = process.env.REACT_APP_URL

    const [team, setTeam] = useState([]);
    const [homeResults, sethomeResults] = useState([]);
    const [awayResults, setAwayResult] = useState([]);
    const [players, setPlayers] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getTeamById();
    }, []);

    const getTeamById = async () => {
        try {
            const response = await fetch(`${BASE_URL}/teams/${id}`,)
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
                })
        } catch (error) {
            console.log(error)
        }
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