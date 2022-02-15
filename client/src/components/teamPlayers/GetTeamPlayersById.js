import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';

const TeamPlayersById = () => {
    const { REACT_APP_URL_TEAM_PLAYERS } = process.env
    const URL = REACT_APP_URL_TEAM_PLAYERS

    const [teamPlayersById, setTeamPlayersById] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getTeamPlayersById();
    })

    const getTeamPlayersById = async () => {
        try {
            const response = await fetch(`${URL}/${id}`,)
            return response.json()
                .then(data => {
                    setTeamPlayersById(data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h2 className='centered'>Players</h2>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: "20%" }}>№</th>
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
                            <td>{value['players.age']}</td>
                            <td>{value['players.position']}</td>
                        </tr>
                    ))}
                    <div style={{ textAlign: "left" }}>
                        <Link to={'/Team-Players'} className='link'>Back To Team Players</Link>
                        <Link to={'/'} className='link'>Home Page</Link>
                    </div>
                </tbody>
            </table>
        </div>
    )
}

export default TeamPlayersById