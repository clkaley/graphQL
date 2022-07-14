import './App.css';
import CharactersList from './pages/CharactersList';
import {Routes, Route} from "react-router-dom";
import Character from './pages/Character';
import Search from './pages/Search';



function App() {
  return (
    <div className="App">
      <h2 style={{textAlign:"center"}}>My first Apollo app 🚀</h2>
      <Routes>
          <Route path="/" element={<CharactersList />}/>
          <Route path="/search" element={<Search />}/>
          <Route path=":id" element={<Character />} />
      </Routes>
    </div>
  );
}

export default App;
