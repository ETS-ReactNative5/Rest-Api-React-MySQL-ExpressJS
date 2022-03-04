import { Link, } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";
import FormTeams from './FormTeams';
import 'bootstrap/dist/css/bootstrap.min.css';

const Teams = () => {

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
                <FormTeams>
                </FormTeams>
            </table>
            <div ><Link to={'/'} className='link'>Back To Home Page</Link></div>
        </div>
    )
}

export default Teams