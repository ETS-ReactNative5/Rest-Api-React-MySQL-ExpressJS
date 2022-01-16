import { useState, useEffect } from 'react'
import axios from "axios";
import { Link, } from "react-router-dom";


const Teams = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        try {
            const response = await axios.get('http://localhost:5000/teams')
            setTeams(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTeam = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/teams/${id}`)
            setTeams(teams.filter(team => team.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h2 className='centered'>Clubs</h2>
            <Link to="/Teams/add" className="link">Add New</Link>
            <table className="table is-striped is-fullwidth">
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
                                <button onClick={() => deleteTeam(team.id)}
                                    className="button is-small is-danger">Delete</button>
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