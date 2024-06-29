
import Button from '@mui/material/Button';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./components/auth/Register";
import NavBar from "./components/auth/NavBar/NavBar";
import HomePage from './components/HomePage';




function App() {
  return (
    <Router>
      <NavBar />
      <div className="App"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
