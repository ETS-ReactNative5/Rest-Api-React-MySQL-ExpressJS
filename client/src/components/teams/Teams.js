import { Link, } from "react-router-dom";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import useFormTeams from './useFormTeams'
import 'bootstrap/dist/css/bootstrap.min.css';

const Teams = () => {
    const { teams, error, deleteTeam, isLoading } = useFormTeams()

    if (isLoading) {
        return (<Spinner animation="border" variant="primary" />)
    }
    if (error) {
        return <div>There was an error: {error}</div>
    }

    return (
        <div>
            <h2 className='centered'>Clubs</h2>
            <Link to="/Teams/add" className="link">Add New</Link>
            <table className='teams'>
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
                                <ButtonGroup>
                                    <Link to={`/Teams/${team.id}`} className='link'>View</Link>
                                    <Link to={`/Teams/edit/${team.id}`} className='edit'>Edit</Link>
                                    <Button variant="danger" onClick={() => deleteTeam(team.id)}>Delete</Button>
                                </ButtonGroup>
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