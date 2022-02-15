import { useEffect, useState } from 'react';
import { Link, } from "react-router-dom";
import { Spinner, Button, ButtonGroup } from "react-bootstrap";


const Results = () => {
  const { REACT_APP_URL_RESULTS } = process.env
  const URL = REACT_APP_URL_RESULTS
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);

  const [color, setColor] = useState({});
  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    try {
      const response = await fetch(URL)
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
      await fetch(`${URL}/${id}`, {
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
    <div style={{ textAlign: "center" }}>
      <h2 className='centered'>Results</h2>
      <div style={{ textAlign: "left" }}><Link to="/Results/add" className="link">Add New</Link></div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Date</th>
            <th style={{ width: "20%" }}>Home Team</th>
            <th style={{ width: "8%" }}>Home Goals</th>
            <th style={{ width: "8%" }}>Away Goals</th>
            <th style={{ width: "20%" }}>Away Team</th>
            <th>Venue</th>
            <th style={{ width: "15%" }}>Actions</th>
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
      <div style={{ textAlign: "left" }}><Link to={'/'} className='link'>Back To Home Page</Link></div>
    </div>
  )
}

export default Results;
