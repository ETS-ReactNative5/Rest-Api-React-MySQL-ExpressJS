import { useEffect, useState } from 'react';
import { Link, } from "react-router-dom";
import './Players.css';
import { Spinner, Button, ButtonGroup } from 'react-bootstrap';

const Players = () => {
  const BASE_URL = process.env.REACT_APP_URL

  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [paranoidTeams, setParanoidTeams] = useState([]);


  useEffect(() => {
    getPlayers();
  }, []);

  const getPlayers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/players`)
      return response.json()
        .then(data => {
          setPlayers(data.teamExists)
          setParanoidTeams(data.paranoid)
          setIsLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const deletePlayer = async (id) => {
    try {
      await fetch(`${BASE_URL}/players/${id}`, { method: "DELETE" })
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
                <ButtonGroup>
                  <Link to={`/Players/edit/${player.id}`} className='edit'>Edit</Link>
                  <Button variant='danger' onClick={() => deletePlayer(player.id)}>Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className='centeredSecond'>Free Transfers</h2>
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
                <ButtonGroup>
                  <Link to={`/Players/edit/${player.id}`} className='edit'>Edit</Link>
                  <Button variant='danger' onClick={() => deletePlayer(player.id)}>Delete</Button>
                </ButtonGroup>
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
