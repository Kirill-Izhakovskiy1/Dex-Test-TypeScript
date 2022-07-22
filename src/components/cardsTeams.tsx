import React from 'react'
import Navifation from './navigation'
import Search from '../UI/search'
import Add from '../UI/add+'
import ReactPaginate from 'react-paginate'
import { NavLink } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import { Link } from 'react-router-dom'
import SideBar from './sideBar'
import MenuByBurger from '../UI/menuByBurger'
import api from '../API copy'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import store from '../redux/store'
import Selector from '../UI/selector'
function CardsTeam() {
  const domain = 'http://dev.trainee.dex-it.ru'
  const [cards, setCards] = useState<Array<string>>([])
  const [pageCount, setPageCount] = useState<number>(0)
  const [currentSize, setCurrentSize] = useState({ label: 6, value: 6 })
  const [initialPage, setInitialPAge] = useState(0)
  const [value, setValue] = useState<string>('')
  const { coloritem, setColoritem } = useState(false)
  const params = useParams()
  const id: any = params.id

  console.log(id)
  const handlePageClick = (page) => {
    // console.log(page)
    api.team
      .getTeams({
        name: '',
        page: page.selected + 1,
        pageSize: currentSize.value,
      })
      .then((response) => {
        setCards(response.data.data)
        console.log(response)
        setInitialPAge(page.selected)
        setPageCount(response.data.count / response.data.size)
      })
  }
  useEffect(() => {
    api.team
      .getTeams({
        name: '',
        page: 1,
        pageSize: currentSize.value,
      })
      .then((response) => {
        setCards(response.data.data)
        console.log(response)
        setPageCount(response.data.count / response.data.size)
      })
  }, [])

  function changeColorofSign() {
    setColoritem(!coloritem)
  }
  const navigate = useNavigate()

  function getTeam(id: number) {
    store.dispatch({
      type: 'team/set',
      payload: cards.filter((team) => team.id === id)[0],
    })
    navigate(`/cardTeam/${id}`)
  }

  const filteredCountries: Array<any> = cards.filter((card) => {
    return card.name.toLowerCase().includes(value.toLowerCase())
  })
  function choosedSize(value) {
    setCurrentSize(value)
    api.team
      .getTeams({
        name: '',
        page: 1,
        pageSize: value.value,
      })
      .then((response) => {
        store.dispatch({
          type: 'team/set',
          payload: response.data.data,
        })
        setCards(response.data.data)
        console.log(response)
        // setCurrentPage(response.data.data)
        setInitialPAge(0)
        console.log('777')
        setPageCount(response.data.count / response.data.size)
      })
  }
  return (
    <div className="cardsTeam">
      <Navifation />
      <div className="underNav">
        <div className="SideBarNone">
          <SideBar />
        </div>
        {id}
        <div className="CardsShow">
          <div className="cardsShowing">
            <div className="InputinCards">
              <Search onInput={(event) => setValue(event.target.value)} />
            </div>
            <div className="AddTeam">
              <Link to="/AddNewTeam">
                {' '}
                <Add />{' '}
              </Link>
            </div>
          </div>
          <div className="cardsPresenting">
            {cards.length === 0 && (
              <div className="EmptyHere">
                {' '}
                <img
                  src="img/illustration.png"
                  className="EmptyHerePhoto"
                />{' '}
              </div>
            )}

            {/* <h1 className="EmptyHeretext">Empty Here</h1>
                <p className="ContinueCard">Add new teams to continue</p> */}
            <div className="show-cards">
              {filteredCountries.map((card) => (
                <div className="card" onClick={() => getTeam(card.id)}>
                  <div>
                    {
                      <img
                        src={`${domain}${card.imageUrl}`}
                        className="card__img"
                      />
                    }
                    <div className="card__inf">
                      <p className="card__name">{card.name}</p>
                      <p className="card__year">{card.foundationYear}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Selector
            options={[
              { value: 6, label: 6 },
              { value: 12, label: 12 },
              { value: 24, label: 24 },
            ]}
            onInput={choosedSize}
            value={currentSize}
          />
          <div className="layout-pages">
            {/* {initialPage} */}
            <ReactPaginate
              className="pages"
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              // renderOnZeroPageCount={null}
              marginPagesDisplayed={7}
              forcePage={initialPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardsTeam
