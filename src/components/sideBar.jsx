import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import Cookies from "js-cookie";
import store from "../redux/store";
import { useNavigate } from "react-router-dom";
function SideBar () {
    let location = useLocation()
    let navigate = useNavigate()
    function signOut() {
        console.log(1)
        Cookies.remove('token')
        console.log(Cookies.get('token'))
        delete localStorage.auth
        store.dispatch({
            type: 'auth/isloaded',
            payload: {isLoaded: false}
          })
          navigate("/signin")
    }

    return <div className="sidebar">
    <div className="TeamsLogo"> 
    <Link to='/cardsTeam'  className={`CardsSign ${location.pathname  == '/cardsTeam' ? 'active' : '' }` }> </Link>
    </div>
    <div className="PlayersLogo">
     <Link to="/playerTeams" className={`personSign ${location.pathname == '/playerTeams' ? 'active' : ''}`}> </Link>
    </div>
    <div className="SignOutLogo">
        <img src="/img/Frame 27.png" onClick={signOut}/>
    </div>
</div>
}


export default SideBar