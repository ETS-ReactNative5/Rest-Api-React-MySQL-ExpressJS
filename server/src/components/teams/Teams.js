import { useState, useEffect } from 'react';
import { Link, } from "react-router-dom";

const Teams = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        try {
            await fetch('http://localhost:5000/teams/',)
                .then((data) => {
                    return data.json();
                }).then(response => {
                    setTeams(response)
                    setIsLoading(false)
                })
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) {
        return <section>
            <p>Loading...</p>
        </section>
    }

    const deleteTeam = async (id) => {
        try {
            await fetch(`http://localhost:5000/teams/${id}`, {
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
        <div>
            <h2 className='centered'>Clubs</h2>
            <Link to="/Teams/add" className="link">Add New</Link>
            <table>
                <thead>
                    <tr >
                        <th>№</th>
                        <th>Team</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody >
                    {teams.map((team, index) => (
                        <tr key={team.id}>
                            <td>{index + 1}.</td>
                            <td>{team.team_name}</td>
                            <td>
                                <Link to={`/Teams/${team.id}`} className='link'>View</Link>
                                <Link to={`/Teams/edit/${team.id}`} className='edit'>Edit</Link>
                                <button onClick={() => deleteTeam(team.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={'/'} className='link'>Back To Home Page</Link>
        </div>
    )
}

export default Teams