import { useEffect, useState } from 'react';
import { Link, } from "react-router-dom";
import './Players.css';
import { Spinner } from 'react-bootstrap';

const Players = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [paranoidTeams, setParanoidTeams] = useState([]);


  useEffect(() => {
    getPlayers();
  }, []);

  const getPlayers = async () => {
    try {
      await fetch('http://localhost:5000/players/',)
        .then((response) => {
          return response.json();
        }).then(data => {
          const teamExists = data.filter(players => (players.teams.deletedAt === null))
          setPlayers(teamExists)
          const paranoid = data.filter(players => (players.teams.deletedAt !== null))
          setParanoidTeams(paranoid)
          setIsLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const deletePlayer = async (id) => {
    try {
      await fetch(`http://localhost:5000/players/${id}`, { method: "DELETE" })
        .then((data) => {
          setPlayers(players.filter(player => player.id !== id))
          setParanoidTeams(paranoidTeams.filter(player => player.id !== id))
          return data.json();
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
      <h2 className='centered'>Players</h2>
      <Link to="/Players/add" className="link">Add New</Link>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Team Name</th>
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
              <td>{player.teams.team_name}</td>
              <td>{player.name}</td>
              <td>{player.position}</td>
              <td>{player.age}</td>
              <td>
                <Link to={`/Players/edit/${player.id}`} className='edit'>Edit</Link>
                <button onClick={() => deletePlayer(player.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className='centered' style={{marginBottom:'50px'}}>Free Transfers</h2>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>Position</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paranoidTeams.map((player, index) => (
            <tr key={player.id}>
              <td>{index + 1}.</td>
              <td>{player.name}</td>
              <td>{player.position}</td>
              <td>{player.age}</td>
              <td>
                <Link to={`/Players/edit/${player.id}`} className='edit'>Edit</Link>
                <button onClick={() => deletePlayer(player.id)}>Delete</button>
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
