import SideBar from "../components/sideBar.jsx"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from "react"
function MenuByBurger ({active}) {
   
    let location = useLocation()
    return <div className={active ? "Menu active" :  "Menu"}>
        <div className="MenuName">
       <div className="MenuName_logo"><img src="img/profile.png"></img></div> 
       <div className="sideBarForMenu">
        <SideBar/>
        </div>
        </div>
      
    </div>
}

export default MenuByBurger