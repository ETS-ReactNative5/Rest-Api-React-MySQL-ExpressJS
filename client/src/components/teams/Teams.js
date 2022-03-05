import { Link, } from "react-router-dom";
import { useEffect } from "react";
import {  Button, ButtonGroup } from "react-bootstrap";
import FormTeams from './FormTeams';
import 'bootstrap/dist/css/bootstrap.min.css';
const BASE_URL = process.env.REACT_APP_URL

const getTeams = async  () => await fetch(`${BASE_URL}/teams`)
const deleteTeam = (id) => fetch(`${BASE_URL}/teams/${id}`)
const Teams = () => {
    const getTeamsApi=FormTeams(getTeams)
    const deleteTeamApi= FormTeams(deleteTeam)
useEffect(()=>{
    getTeamsApi.requestGetTeams();
    deleteTeamApi.requestDeleteTeam();
}, []);
    return (
        <div>
            <h2 className='centered'>Clubs</h2>
            <div><Link to="/Teams/add" className="add">Add New</Link></div>
            <table className="teams">
                <thead>
                    <tr >
                        <th>№</th>
                        <th>Team</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody >
                    {getTeamsApi.teams?.map((team, index) => (
                        <tr key={team.id}>
                            <td>{index + 1}.</td>
                            <td>{team.team_name}</td>
                            <td>
                                <ButtonGroup>
                                    <Link to={`/Teams/${team.id}`} className='link'>View</Link>
                                    <Link to={`/Teams/edit/${team.id}`} className='edit'>Edit</Link>
                                    <Button variant="danger" onClick={() => deleteTeamApi(team.id)}>Delete</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div ><Link to={'/'} className='link'>Back To Home Page</Link></div>
        </div>
    )
}

export default Teams