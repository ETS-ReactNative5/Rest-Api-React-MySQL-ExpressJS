import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Team = () => {
    const [homeResults, sethomeResults] = useState([]);
    const [awayResults, setAwayResult] = useState([]);
    const [players, setPlayers] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getTeamById();
    }, []);

    const getTeamById = async () => {

        await axios.get(`http://localhost:5000/teams/${id}`)
            .then((response) => {
                const homeRes = response.data.homeResults
                sethomeResults(homeRes)
                const awayRes = response.data.awayResults
                setAwayResult(awayRes)
                const teamPlayers = response.data.teamPlayers
                setPlayers(teamPlayers)
            })
    }

    return (
        <div>
            <h2 className='centered'>Home Results</h2>
            <Link to={'/teams'} className='link'>Back to Teams</Link>
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Host Id</th>
                        <th>Guest Id</th>
                        <th>Home Goals</th>
                        <th>Away Goals</th>
                        <th>Date</th>
                        <th>Venue</th>
                    </tr>
                </thead>
                <tbody>
                    {homeResults.map((hres, index) => (
                        <tr key={hres.id}>
                            <td>{index + 1}.</td>
                            <td>{hres['h.host_id']}</td>
                            <td>{hres['h.guest_id']}</td>
                            <td>{hres['h.home_goals']}</td>
                            <td>{hres['h.away_goals']}</td>
                            <td>{hres['h.date']} </td>
                            <td>{hres['h.venue']}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className='centered'>Away Results</h2>
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Host Id</th>
                        <th>Guest Id</th>
                        <th>Home Goals</th>
                        <th>Away Goals</th>
                        <th>Date</th>
                        <th>Venue</th>
                    </tr>
                </thead>
                <tbody>
                    {awayResults.map((ares, index) => (
                        <tr key={ares.id}>
                            <td>{index + 1}.</td>
                            <td>{ares['a.host_id']}</td>
                            <td>{ares['a.guest_id']}</td>
                            <td>{ares['a.home_goals']}</td>
                            <td>{ares['a.away_goals']}</td>
                            <td>{ares['a.date']} </td>
                            <td>{ares['a.venue']}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className='centered'>Players</h2>
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
                            <td>{player['p.name']}</td>
                            <td>{player['p.position']}</td>
                            <td>{player['p.age']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default Team 