import React from 'react'
import Link1 from '../UI/link'
import Navifation from './navigation'
import Create from '../UI/create'
import Delete from '../UI/delete'
import store from '../redux/store'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import api from '../API copy'
import SideBar from './sideBar'
const PlayerCard: React.FC = () => {
  let navigate = useNavigate()
  let params = useParams()
  let id: any = params.id
  const domain = 'http://dev.trainee.dex-it.ru'
  console.log(id)
  interface playerType {
    avatarUrl: string
    birthday: string
    height: number
    id: number
    name: string
    number: number
    position: string
    team: number
    teamName: string
    weight: number
  }
  let player: playerType = store.getState().player as playerType
  console.log(player)
  function getChange(id: string) {
    navigate(`/updateNewPlayer/${id}`)
    console.log(id)
    console.log(1)
  }
  function deletePlayer(id: string) {
    console.log(id)
    api.player.delete(id.slice(1)).then((r) => {
      console.log(r)
    })
  }
  return (
    <div className="cardsTeam">
      1
      <Navifation />
      <div className="underNavPlayer">
        <div className="SideBarNone">
          <SideBar />
        </div>
        {/* <div className="SideBarNone">
          <SideBar />
        </div> */}
        <div className="cardBlock">
          <div className="navBarteam">
            {/* {.map(el => (<div>{el.name}</div>))} */}
            <div className="teamsLink">
              <Link1 to="/Player" text="Player"></Link1>/
              <Link1 to="/GregWhittinghton" text="Greg Whittinghton"></Link1>
            </div>
            <div className="DeleteCreate">
              <button className="create" onClick={() => getChange(id)}></button>
              <button className="btn" onClick={() => deletePlayer(id)}>
                delete
              </button>
              <Delete />
            </div>
          </div>
          <div className="teamInf">
            <div className="logotip"><img src={`${domain}${player.avatarUrl}`}/></div>
            <div className="teamsinf">
              <div className="DenverNuggets">{player.name}</div>
              <div className="middleColumn">
                <div className="middleColumn1">
                  <p>Position</p>
                  <div>{player.position}</div>
                  <p>Height</p>
                  <div>{player.height}</div>
                  <p>Age</p>
                  <div>
                    {new Date().getFullYear() -
                      new Date(player.birthday).getFullYear()}
                  </div>
                </div>
                <div className="middleColumn2">
                  <p>Team</p>
                  <div>{player.team}</div>
                  <p>Weight</p>
                  <div>{player.weight}</div>
                </div>
              </div>
              <div className="middleColumn3">
                <div>Conference</div>
                <div>Western</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerCard
