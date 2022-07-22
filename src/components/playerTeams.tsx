import Navifation from './navigation'
import Search from '../UI/search'
import Add from '../UI/add+'
import ReactPaginate from 'react-paginate'
import Selector from '../UI/selector'
import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import SideBar from './sideBar'
import api from '../API copy'
import store from '../redux/store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { array } from 'yup'
import Select from 'react-select'
import { useSelector } from 'react-redux'
import React from 'react'
const PlayesTeams: React.FC = () => {
  const navigate = useNavigate()
  const [pageCount, setPageCount] = useState<number>(0)
  const [cards, setCards] = useState<Array<Team>>([])
  const [selectCard, setSelectCard] = useState<Array<number>>([])
  const [currentPage, setCurrentPage] = useState([])
  const [currentSize, setCurrentSize] = useState({label:6, value:6})
  const [initialPage, setInitialPAge] = useState(0)
  const [value, setValue] = useState<string>('')
  let teamId
  console.log(selectCard)
  let playersonEachPage = useSelector((state: any) => state.players)
  let allPlayers: Array<Player> = store.getState().players as Array<Player>
  const domain = 'http://dev.trainee.dex-it.ru'
  const [players, setplayers] = useState([])
  interface Player {
    id: number
    avatarUrl: string
    name: string
    team
  }
  interface Team {
    value: number
    label: string
  }
  const handlePageClick = (page) => {
    api.player
      .getPlayers({
        name: '',
        teamIds: selectCard.map((e) => e.value),
        page: page.selected + 1,
        pageSize: currentSize.value ,
      })
      .then((response) => {
        console.log(response)
        store.dispatch({
          type: 'players/set',

          payload: response.data.data,
        })
        console.log(store.getState().players)
        // setCurrentPage(response.data.data)
        setInitialPAge(page.selected)
        console.log(response)
        setPageCount(response.data.count / response.data.size)
      })
  }

  useEffect(() => {
    api.team
      .getTeams({
        name: '',
        page: 1,
        pageSize: 10000,
      })
      .then((response) => {
        setCards(
          response.data.data.map((team) => {
            return { value: team.id, label: team.name }
          }),
        )

        console.log(response)
      })
  }, [])
  const sendTeamId = (e) => {
    console.log(e)
    setSelectCard(e)
    api.player
      .getPlayers({
        name: '',
        page: 1,
        teamIds: e.map((e) => e.value),
        pageSize: currentSize.value,
      })
      .then((response) => {
        store.dispatch({
          type: 'players/set',
          payload: response.data.data,
        })

        console.log(response)
        // setCurrentPage(response.data.data)
        setPageCount(response.data.count / response.data.size)
      })
  }
  function getPlayer(id) {
    store.dispatch({
      type: 'player/set',
      payload: allPlayers.filter((player: Player) => player.id === id)[0],
    })
    navigate(`/playerCard/:${id}`)
  }
 

  function filteredCountries() {
    cards.filter((card) => {
      return card.name.toLowerCase().includes(value.toLowerCase())
    })
  }
  const filteredPlayer: Array<any> = allPlayers.filter((player) => {
    return (player.name.toString().toLowerCase().includes(value.toLowerCase()) ) 
    // )
  })
  function choosedSize(value) {
    setCurrentSize(value)
    api.player
      .getPlayers({
        name: '',
        page: 1,
        teamIds: selectCard.map(e => e.value),
        pageSize: value.value,
      })
      .then((response) => {
        store.dispatch({
          type: 'players/set',
          payload: response.data.data,
        })

        console.log(response)
        setInitialPAge(0)
        // setCurrentPage(response.data.data)
        setPageCount(response.data.count / response.data.size)
      })
     
  }
  return (
    <div className="cardsTeam">
      <Navifation />

      <div className="underNav">
        <SideBar />
        <div className="CardsShow">
          <div className="cardsShowing">
            <div className="InputinCards1">
              <Search onInput={(e) => setValue(e.target.value)} />
              <div className="marginForselectinPlayer">
                <Selector
                  options={cards}
                  onInput={sendTeamId}
                  multiple={true}
                  value={selectCard}
                />
              </div>
            </div>
            <Link to="/addnewPlayer" className="AddTeam1">
              <Add />
            </Link>
          </div>
          <div className="cardsPresenting">
            {allPlayers.length === 0 && (
              <div className="EmptyHere">
                <Link to="/sign1">
                  <img
                    src="img/illustration (1).png"
                    className="EmptyHerePhoto"
                  />
                </Link>
              </div>
            )}
            <div className="show-cards">
              {filteredPlayer.map((player) => (
                <div className="card" onClick={() => getPlayer(player.id)}>
                  <div>
                    {
                      <img
                        src={`${domain}${player.avatarUrl}`}
                        className="card__img"
                      />
                    }
                    <div className="card__inf">
                      <p className="card__name">{player.name}</p>
                      {/* <p className="card__year">{player.foundationYear}</p> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Selector
            options={[
              { value: 1, label: 1},
              { value: 2, label: 2 },
              { value: 3, label: 3 },
            ]}
            onInput={choosedSize}
            value={currentSize}
          />
          <div className="layout-pages">
            <ReactPaginate
              className="pages"
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              // pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              // renderOnZeroPageCount={null}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              forcePage={initialPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayesTeams
