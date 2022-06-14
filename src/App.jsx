import "./App.css";
import { Routes, Route, Link, Redirect, Navigate } from "react-router-dom";
import SignUp from "./components/signup/singUp.tsx";
// import SignIn1 from "./components/signIn";
import TeamsCard from "./components/teamsCard.tsx";
import PlayerCard from "./components/playerCard.tsx";
import Roster from "./components/roster.tsx";
import Add from "./UI/add+";
import Navifation from "./components/navigation.jsx";
import CardsTeam from "./components/cardsTeams.tsx";
import PlayesTeams from "./components/playerTeams.tsx";
import PageNotfound from "./components/pageNotfound.tsx";
import AddnewPlayer from "./components/addnewPlayer.tsx";
import AddnewTeam from "./components/addNewTeam.tsx";
import useAuth from "./hooks/useAuth";
import { AuthContext } from "./context/AuthContexts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "./API copy";
import CardTeam from "./components/cardTeam.tsx";
import UpDateNewPlayer from "./components/upDatenewPlayer.tsx";
import SignIn from "./components/signin/signIn.tsx";
import store from "./redux/store";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

function App() {
  const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/signin")
  // }, [])
  let auth = useSelector((state) => state.auth.token);
  console.log(store.getState().auth.token);
  console.log(Cookies.get("token"), "cookies");
  return (
    <div className="App">
      {/* {store.getState().auth.token + ''} */}
      <Routes>
        {!auth && <Route path="/signin" element={<SignIn />} />}
        {!auth && <Route path="/signup" element={<SignUp />} />}
        {auth && <Route path="/Roster" element={<AddnewPlayer />} />}
        {auth && <Route path="/playerTeams" element={<PlayesTeams />} />}
        {auth && <Route path="/cardsTeam" element={<CardsTeam />} />}
        {auth && <Route path="/cardTeam/:id" element={<CardTeam />} />}
        {auth && <Route path="*" element={<PageNotfound />} />}
        {auth && <Route path="/addnewPlayer" element={<AddnewPlayer />} />}
        {auth && <Route path="/AddNewTeam" element={<AddnewTeam />} />}
        {auth && (
          <Route path="/updateNewPlayer/:id" element={<AddnewPlayer />} />
        )}
        {auth && <Route path="/playerCard/:id" element={<PlayerCard />} />}
        {auth && <Route path="/updateNewTeam/:id" element={<AddnewTeam />} />}
      </Routes>
    </div>
  );
}

export default App;
