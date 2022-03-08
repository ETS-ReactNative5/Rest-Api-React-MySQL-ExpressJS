import { Link, } from "react-router-dom";
import { Spinner, Button, ButtonGroup } from "react-bootstrap";
import useFormResults from './useFormResults';

const Results = () => {
  const { results, isLoading, error, deleteResult } = useFormResults()

  if (isLoading) {
    return (<Spinner animation="border" variant="primary" />)
  }
  if (error) {
    return <div>There was an error: {error}</div>
  }

  return (
    <div>
      <h2 className='centered'>Results</h2>
      <div><Link to="/Results/add" className="link">Add New</Link></div>
      <table className='results'>
        <thead>
          <tr>
            <th>№</th>
            <th>Date</th>
            <th>Home Team</th>
            <th>Home Goals</th>
            <th>Away Goals</th>
            <th>Away Team</th>
            <th>Venue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={result.id}>
              <td>{index + 1}.</td>
              <td>{result.date}</td>
              <td style={{
                color:
                  !!(result.home_goals > result.away_goals) ? "green" :
                    !!(result.home_goals === result.away_goals) ? null : "red"
              }}>{result['host.team_name']}</td>
              <td style={{
                color:
                  !!(result.home_goals > result.away_goals) ? "green" :
                    !!(result.home_goals === result.away_goals) ? null : "red"
              }}>{result.home_goals}</td>
              <td style={{
                color:
                  !!(result.home_goals < result.away_goals) ? "green" :
                    !!(result.home_goals === result.away_goals) ? null : "red"
              }}>{result.away_goals}</td>
              <td style={{
                color:
                  !!(result.home_goals < result.away_goals) ? "green" :
                    !!(result.home_goals === result.away_goals) ? null : "red"
              }}>{result['guest.team_name']}</td>
              <td>{result.venue}</td>
              <td>
                <ButtonGroup>
                  <Link to={`/Results/edit/${result.id}`} className='edit'>Edit</Link>
                  <Button variant='danger' onClick={() => deleteResult(result.id)}>Delete</Button>
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

export default Results;
