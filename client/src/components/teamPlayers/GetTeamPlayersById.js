import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';

const TeamPlayersById = () => {
    const BASE_URL = process.env.REACT_APP_URL

    const [teamPlayersById, setTeamPlayersById] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getTeamPlayersById();
    })

    const getTeamPlayersById = async () => {
        try {
            const response = await fetch(`${BASE_URL}/team-players/${id}`,)
            return response.json()
                .then(data => {
                    setTeamPlayersById(data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h2 className='centeredSecond'>Players</h2>
            <table className='getPlayers'>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {teamPlayersById.map((value, index) => (
                        <tr key={value['players.id']}>
                            <td>{index + 1}.</td>
                            <td>{value['players.name']}</td>
                            <td>{value['players.position']}</td>
                            <td>{value['players.age']}</td>
                        </tr>
                    ))}
                        <Link to={'/Team-Players'} className='link'>Back To Team Players</Link>
                        <Link to={'/'} className='link'>Home Page</Link>
                </tbody>
            </table>
        </div>
    )
}

export default TeamPlayersById