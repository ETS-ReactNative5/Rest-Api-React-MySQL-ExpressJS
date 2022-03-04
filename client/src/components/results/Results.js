import { useEffect, useState } from 'react';
import { Link, } from "react-router-dom";
import { Spinner, Button, ButtonGroup } from "react-bootstrap";


const Results = () => {
  const BASE_URL = process.env.REACT_APP_URL

  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);

  const [color, setColor] = useState({});
  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    try {
      const response = await fetch(`${BASE_URL}/results`)
      return response.json()
        .then(data => {
          setResults(data)
          setIsLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
  }


  const deleteResult = async (id) => {
    try {
      await fetch(`${BASE_URL}/results/${id}`, {
        method: "DELETE",
      }).then(response => {
        setResults(results.filter(result => result.id !== id))
        return response.json()
      })
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return (<Spinner animation="border" variant="primary" />)
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
