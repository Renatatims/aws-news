import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/profile/:username" element={<Profile/>}/>
        </Routes>
    </Router>
  );
}

export default App;
