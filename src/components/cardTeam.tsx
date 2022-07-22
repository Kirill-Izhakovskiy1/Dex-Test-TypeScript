import Navifation from './navigation'
import SideBar from './sideBar'
import { Link, useParams } from 'react-router-dom'
import api from '../API copy'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react'
const CardTeam: React.FC = () => {
  interface Player {
    // imageUrl: string
    avatarUrl: string
    name: string
    // age: number,
    birthday: number
    team: number
    height: number
    weight: number
    id: number
    number: number
  }
  const [roster, setRoster] = useState<Array<Player>>([])
  const [card, setCard] = useState<team>({} as team)
  const [pageCount, setPageCount] = useState<number>(0)
  const params = useParams()
  const id = params.id
  console.log(id)
  interface team {
    name: string
    foundationYear: number
    division: string
    conference: string
    imageUrl: string
    id: number
  }
  console.log(roster)
  useEffect(() => {
    api.team
      .getTeam({
        id: id,
      })
      .then((res) => {
        console.log(res)
        setCard(res.data)
      })

    api.player
      .getPlayers({
        name: '',
        teamIds: [id],
        page: 1,
        pageSize: 6,
      })
      .then((res) => {
        console.log(res)
        setRoster(res.data.data)
      })
  }, [id])

  const navigate = useNavigate()
  function getChange(id) {
    navigate(`/updateNewPlayer/${id}`)
    console.log(id)
  }
  function getChangeTeam(id) {
    navigate(`/updateNewTeam/${id}`)
    console.log(id)
  }
  const domain = 'http://dev.trainee.dex-it.ru'
  function deleteTeam(id: string) {
    console.log(id)
    api.team.delete(id).then((r) => {
      console.log(r)
    })
  }
  return (
    <div className="cardsTeam">
      <Navifation />
      <div className="underNav">
        <div className="SideBarNone">
          <SideBar />
        </div>

        <div className="CardsShow">
          <div className="cardId">
            <div className="cardId__nav">
              <Link to="/cardsTeam">Teams</Link>/
              <p className="cardId__name">{card.name}</p>
              <p className='changeTeam' onClick={() => getChangeTeam(id)}>
                <img src="\img\create.png" />
              </p>
              <p className="deleteTeam" onClick={() => deleteTeam(id)}><img src='\img\delete.png'/></p>
            </div>

            <div className="cardId__show">
              <div className="cardId__img">
                {
                  <img
                    src={`${domain}${card.imageUrl}`}
                    className="card__img"
                  />
                }
              </div>
              <div className="cardId__inf">
                <p className="nameTeam">{card.name}</p>
                <div className="year_and_division">
                  <div className="yearFlex">
                    <p className="yearTeam">Year of foundation</p>{' '}
                    <p className='certainTeamYear'>{card.foundationYear}</p>
                  </div>
                  <div className="divisionFlex">
                    <p className='divisionTeam'>Division</p>
                    <p className='certainDivisionTeam'>{card.division}</p>
                  </div>
                </div>
                <p className='conferenceTeam'>Conference</p>
                <p className='certainConferenceTeam'>{card.conference}</p>
              </div>
              {/* {player} */}
            </div>
          </div>
          <div className="Roster">
            <div className="roster">Roster</div>
            <div className="player__params">
              <div className="player__number">#</div>

              <div className="player__nameteam__params">Player</div>
              <div className="player__height">Height</div>
              <div className="player__weight">Weight</div>
              <div className="player__age">Age</div>
              {/* <button onClick={() => getChange(player.id)} className="player__change">change</button> */}
            </div>
            {roster.map((player) => (
              <div className="player">
                <div>
                  <div className="player__inf">
                    <div className="player__number">{player.number}</div>
                    {
                      <img
                        src={`${domain}${player.avatarUrl}`}
                        className="player__img"
                      />
                    }
                    <div className="player__nameteam">
                      <div className="player__name">{player.name}</div>
                      <div className="player__team">{player.team}</div>
                    </div>
                    <div className="player__height">{player.height}cm</div>
                    <div className="player__weight">{player.weight}kg</div>
                    <div className="player__age">
                      {new Date().getFullYear() -
                        new Date(player.birthday).getFullYear()}
                    </div>
                    {/* <button onClick={() => getChange(player.id)} className="player__change">change</button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardTeam
