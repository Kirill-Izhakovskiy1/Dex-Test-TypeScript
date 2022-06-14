import { useState } from "react"
const Burger:React.FC = (menu, setActive) =>  {
    
    return <div className="burger" onClick={() => setActive(!menu)} >
        <img src="img/menu_24px.png"></img>
    </div>
}

export default Burger