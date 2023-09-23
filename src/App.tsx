import { Sign } from 'crypto';
import './App.css';
import {Routes, Route} from "react-router-dom"
import SignIn from './pages/auth/sigin';
import SignUp from './pages/auth/signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    
  );
}

export default App;
