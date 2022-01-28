import { useEffect, useState } from 'react';
import { Link, } from "react-router-dom";
import { Spinner } from "react-bootstrap";


const Results = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    try {
      await fetch('http://localhost:5000/results/',)
        .then((data) => {
          return data.json();
        }).then(response => {
          setResults(response)
          setIsLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteResult = async (id) => {
    try {
      await fetch(`http://localhost:5000/results/${id}`, {
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
    <div >
      <h2 className='centered'>Results</h2>
      <Link to="/Results/add" className="link">Add New</Link>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Home Goals</th>
            <th>Away Goals</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={result.id}>
              <td>{index + 1}.</td>
              <td>{result['host.team_name']}</td>
              <td>{result['guest.team_name']}</td>
              <td>{result.home_goals}</td>
              <td>{result.away_goals}</td>
              <td>{result.date}</td>
              <td>{result.venue}</td>
              <td>
                <Link to={`/Results/edit/${result.id}`} className='edit'>Edit</Link>
                <div className='edit'>
                  <button onClick={() => deleteResult(result.id)}>Delete</button>
                </div>
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
