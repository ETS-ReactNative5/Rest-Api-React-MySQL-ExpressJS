import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';

const TeamPlayersById = () => {
    const [teamPlayersById, setTeamPlayersById] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getTeamPlayersById();
    })

    const getTeamPlayersById = async () => {
        try {
            await fetch(`http://localhost:5000/team-players/${id}`,)
                .then((response) => {
                    return response.json();
                }).then(data => {
                    setTeamPlayersById(data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
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
                    {teamPlayersById.map((value, index) => (
                        <tr key={value['p.id']}>
                            <td>{index + 1}.</td>
                            <td>{value['p.name']}</td>
                            <td>{value['p.age']}</td>
                            <td>{value['p.position']}</td>
                        </tr>
                    ))}
                    <div> <Link to={'/Team-Players'} className='link'>Back To Team Players</Link> </div>
                    <div> <Link to={'/'} className='link'>Home Page</Link> </div>
                </tbody>
            </table>
        </div>
    )
}

export default TeamPlayersById