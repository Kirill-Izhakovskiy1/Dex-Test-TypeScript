import Navifation from "./navigation";
import Search from "../UI/search";
import Add from "../UI/add+";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import SideBar from "./sideBar";
import MenuByBurger from "../UI/menuByBurger";
import api from "../API copy";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom"
import store from "../redux/store";
function CardsTeam() {
  const domain = "http://dev.trainee.dex-it.ru";
  const [cards, setCards] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const params = useParams();
  const id = params.id;
  
  console.log(id);
  const handlePageClick = (page) => {
    // console.log(page)
    api.team
      .getTeams({
        name: "",
        page: page.selected + 1,
        pageSize: 6,
      })
      .then((response) => {
        setCards(response.data.data);
        console.log(response);
        setPageCount(response.data.count / response.data.size);
      });
  };
  useEffect(() => {
    api.team
      .getTeams({
        name: "",
        page: 1,
        pageSize: 6,
      })
      .then((response) => {
        setCards(response.data.data);
        console.log(response);
        setPageCount(response.data.count / response.data.size);
      });
  }, []);

  const { coloritem, setColoritem } = useState(false);
  function changeColorofSign() {
    setColoritem(!coloritem);
  }
  const navigate = useNavigate();

  function getTeam(id:number) {
    store.dispatch({
      type: "team/set",
      payload: cards.filter((team) => team.id === id)[0],
    });
    navigate(`/cardTeam/${id}`);
  }

  const [value, setValue] = useState("");

  const filteredCountries = cards.filter((card) => {
    return card.name.toLowerCase().includes(value.toLowerCase());
  });

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
                {" "}
                <Add />{" "}
              </Link>
            </div>
          </div>
          <div className="cardsPresenting">
            {cards.length === 0 && (
              <div className="EmptyHere">
                {" "}
                <img
                  src="img/illustration.png"
                  className="EmptyHerePhoto"
                />{" "}
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

          <div className="layout-pages">
            <ReactPaginate
              className="pages"
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              marginPagesDisplayed={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardsTeam;
