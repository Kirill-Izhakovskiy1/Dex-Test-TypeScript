import { useState } from "react"
import Burger from "../UI/busrger.tsx"
import MenuByBurger from "../UI/menuByBurger"
import store from "../redux/store"
import { useSelector } from "react-redux"
const Navifation: React.FC = () => {
    let namePlayer = useSelector(state => state.auth.name)
    const [menuActive, setMenuActive] = useState(false)
    return <div className="NAVBAR">
    <div className="burgerOnclick"  >
    <Burger menu={menuActive} setActive={setMenuActive} />
    </div>
    
   <div className="LogoBaske"> <img src="/img/logo.png" className="LogoBaske-1"></img></div>
   <div className='NameACC'>
       
       <div className="c">
           {/* John Smith */}
           {namePlayer}
           </div>
       <div className="accLogo"><img src="/img/profile.png"></img></div>
   </div>
   <MenuByBurger active={menuActive} /> 
    </div>
    

}

export default Navifation