import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Teams from './components/teams/Teams'
import AddTeam from './components/teams/AddTeam';
import EditTeam from './components/teams/EditTeam';
import Players from './components/players/Players';
import AddPlayer from './components/players/AddPlayer';
import EditPlayer from './components/players/EditPlayer';
import Results from './components/results/Results';
import AddResult from './components/results/AddResult';
import EditResult from './components/results/EditResult';
import Team from './components/teams/GetTeam';
import TeamPlayers from './components/teamPlayers/MainTeamPlayers';
import TeamPlayersById from './components/teamPlayers/TeamPlayersById';
import HomePage from './components/homePage/homePage';
import Layout from './components/homePage/layout/Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={< HomePage />} />

          <Route path='/Teams' element={<Teams />} />
          <Route path='/Teams/:id' element={<Team />} />
          <Route path='/Teams/add' element={<AddTeam />} />
          <Route path='/Teams/edit/:id' element={<EditTeam />} />

          <Route path='/Players' element={<Players />} />
          <Route path='/Players/add' element={<AddPlayer />} />
          <Route path='/Players/edit/:id' element={<EditPlayer />} />

          <Route path='/Results' element={<Results />} />
          <Route path='/Results/add' element={<AddResult />} />
          <Route path='/Results/edit/:id' element={<EditResult />} />

          <Route path='/Team-Players/' element={<TeamPlayers />} />
          <Route path='/Team-Players/:id' element={<TeamPlayersById />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
