import "./App.css";
import Home from "./components/home/Home";
import AllDaos from "./components/Daos/AllDaos";
import DaosMember from "./components/Daos-members/DaosMember";
import Userprofile from "./components/user-profile/UserProfile";
import MemberProfile from "./components/member-profile/MemberProfile";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Meet from "./components/huddle-meet/Meet";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      {loading ? (
        <div class="center">
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
          <div class="wave"></div>
        </div>
      ) : (
        <div className="App">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/all-daos" element={<AllDaos />}></Route>
              <Route path="/user-profile" element={<Userprofile />}></Route>
              <Route path="/member-profile" element={<MemberProfile />}></Route>
              <Route path="/daos-member" element={<DaosMember />}></Route>
              <Route path="/meet-call" element={<Meet />}></Route>
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
