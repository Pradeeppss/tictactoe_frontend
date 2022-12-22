import { Route, Routes } from "react-router-dom";
import Gamepage from "./components/game/Gamepage";
import Homepage from "./components/home/Homepage";
import Invite from "./components/home/Invite";
import Login from "./components/Regin.js/Login";
import Register from "./components/Regin.js/Register";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gamepage/:_id" element={<Gamepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/invite" element={<Invite />} />
      </Routes>
    </div>
  );
}

export default App;
