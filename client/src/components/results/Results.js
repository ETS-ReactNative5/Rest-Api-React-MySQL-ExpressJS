import { useEffect, useState } from 'react'
import { Link, } from "react-router-dom";
import axios from 'axios'
import './Results.css'
const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    try {
      const response = await axios.get('http://localhost:5000/results')
      setResults(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteResult = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/results/${id}`)
      setResults(results.filter(result => result.id !== id))
    } catch (error) {
      console.log(error)
    }
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
              <td>{result.host_id}</td>
              <td>{result.guest_id}</td>
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
