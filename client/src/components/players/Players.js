import { useEffect, useState } from 'react'
import { Link, } from "react-router-dom";
import axios from 'axios'
import './Players'

const Players = () => {

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getPlayers();
  }, []);

  const getPlayers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/players')
      setPlayers(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deletePlayer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/players/${id}`)
      setPlayers(players.filter(player => player.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2 className='centered'>Players</h2>
      <Link to="/Players/add" className="link">Add New</Link>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Team Id</th>
            <th>Name</th>
            <th>Position</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id}>
              <td>{index + 1}.</td>
              <td>{player.teamId}</td>
              <td>{player.name}</td>
              <td>{player.position}</td>
              <td>{player.age}</td>
              <td>
                <Link to={`/Players/edit/${player.id}`} className='edit'>Edit</Link>
                <button onClick={() => deletePlayer(player.id)}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={'/'} className="link">Back To Home Page</Link>
    </div>
  )
}

export default Players;
