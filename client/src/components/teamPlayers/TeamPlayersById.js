import { Link } from 'react-router-dom';
import useFormTeamPlayersById from './useFormTeamPlayersById';
import { Spinner } from 'react-bootstrap';

const TeamPlayersById = () => {
    const { teamPlayersById, error, isLoading } = useFormTeamPlayersById()

    if (isLoading) {
        return (<Spinner animation="border" variant="primary" />)
    }
    if (error) {
        return <div>There was an error: {error}</div>
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