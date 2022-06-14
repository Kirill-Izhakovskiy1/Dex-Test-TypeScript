import Navifation from "./navigation"
import SideBar from "./sideBar"
import { Link, useParams } from "react-router-dom"
import api from "../API copy"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
// import { useParams } from "react-router-dom"

function CardTeam () {
    const [roster, setRoster] = useState([])
    const [card, setCard] = useState<team>({} as team)
    const [pageCount, setPageCount] = useState(0);
  const params = useParams();
  const id = params.id;
  console.log(id);
    interface team {
        name: string,
        foundationYear: number,
        division: string,
        conference: string,
        imageUrl: string,
        id: number
    }
    console.log(roster)
    // let {id} = useParams()
    useEffect(()=> {
        api.team.getTeam({
            id: id
        }).then((res) => {
            console.log(res) 
            setCard(res.data)
        })
    
        api.player.getPlayers({
            name:'',
            teamIds:[id],
            page:1,
            pageSize:6
        }).then((res) => {
            console.log(res)
            setRoster(res.data.data)})
    }, [id])

    const navigate = useNavigate();
    function getChange(id) {
        navigate(`/updateNewPlayer/${id}`)
        console.log(id)
          }
    function getChangeTeam(id) {
        navigate(`/updateNewTeam/${id}`)
        console.log(id)
            }      
    const domain = "http://dev.trainee.dex-it.ru";
    
        return <div className="cardsTeam">
            <Navifation/>
            <div className="underNav">
        
            <div className="SideBarNone">
            <SideBar/>
            </div>
       
                <div className="CardsShow">
                    <div className="cardId">
                        <div className="cardId__nav">
                        <Link to='/cardsTeam'>Teams</Link>
                        <p>{card.name}</p>
                        </div>
                        <button onClick={() => getChangeTeam(id)}>UpdateTeam</button>
                        <div className="cardId__show">
                            <div className="cardId__img">{<img src={`${domain}${card.imageUrl}`} className="card__img"/>}</div>
                            <div className="cardId__inf">
                            <p>{card.name}</p>
                            <p>{card.foundationYear}</p>
                            <p>{card.division}</p>
                            <p>{card.conference}</p></div>
                        </div>
                        
                    </div>
                    <div className="Roster">
                    {roster.map(player => (<div className="player"  >
                        <div>
                            <div className='player__inf'>
                            <div className="player__number"></div>
                            {<img src={`${domain}${player.imageUrl}`} className="player__img"/>}
                                <div className="player__nameteam">
                                    <div className="player__name">{player.name}</div>
                                    <div className="player__team">{player.team}</div>
                                </div>
                                <div className="player__height">{player.height}</div>
                                <div className="player__weight">{player.weight}</div>
                                <div className="player__age">{player.age}</div>
                                <button onClick={() => getChange(player.id)} className="player__change">change</button>
                            </div>
                        </div>
                    </div>) )}
                   
                    </div>
                </div>
            </div>
        </div>
}

export default CardTeam