import Navifation from "./navigation";
import Search from "../UI/search";
import Add from "../UI/add+";
import ReactPaginate from "react-paginate";
import Selector from "../UI/selector";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import SideBar from "./sideBar";
import api from "../API copy";
import store from "../redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { array } from "yup";
import Select from "react-select";
import { useSelector } from "react-redux";
const PlayesTeams: React.FC = () => {
  const navigate = useNavigate();
  const [pageCount, setPageCount] = useState(0);
  const [cards, setCards] = useState([]);
  const [selectCard, setSelectCard] = useState([]);
  // let id
  // let name = useSelector(state.players.name)
  let teamId;
  let allPlayers: Array<Player> = store.getState().players as Array<Player>;
  const domain = "http://dev.trainee.dex-it.ru";
  const [players, setplayers] = useState([]);
  interface Player {
    id: number;
    imageUrl:string,
    name: string
  }
  const handlePageClick = (page) => {
    api.player
      .getPlayers({
        name: "",
        teamIds: teamId,
        page: page.selected + 1,
        pageSize: 6,
      })
      .then((response) => {
        console.log(response);
        store.dispatch({
          type: "players/set",
          payload: {
            payload: response.data.data,
          },
        });
        console.log(store.getState().players);

        console.log(response);
        setPageCount(response.data.count / response.data.size);
      });
  };

  useEffect(() => {
    api.team
      .getTeams({
        name: "",
        page: 1,
        pageSize: 10000,
      })
      .then((response) => {
        setCards(
          response.data.data.map((team) => {
            return { value: team.id, label: team.name };
          })
        );

        console.log(response);
        setPageCount(response.data.count / response.data.size);
      });
  }, []);
  const sendTeamId = (e) => {
    console.log(e);
    setSelectCard(e)
    api.player
      .getPlayers({
        name: "",
        page: 1,
        teamIds: e.map((e) => e.value),
        pageSize: 6,
      })
      .then((response) => {
        store.dispatch({
          type: "players/set",
          payload: response.data.data,
        });

        console.log(response);
        setPageCount(response.data.count / response.data.size);
      });
  };
  function getPlayer(id) {
    store.dispatch({
      type: "player/set",
      payload: allPlayers.filter((player: Player) => player.id === id)[0],
    });
    navigate(`/playerCard/:${id}`);
  }
  const [value, setValue] = useState("");

  function filteredCountries() {
    cards.filter((card) => {
      return card.name.toLowerCase().includes(value.toLowerCase());
    });
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
                {/* <Select options={cards} onInputChange={sendTeamId}/> */}
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
              {allPlayers.map((player) => (
                <div className="card" onClick={() => getPlayer(player.id)}>
                  <div>
                    {
                      <img
                        src={`${domain}${player.imageUrl}`}
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
          <div className="layout-pages">
            <ReactPaginate
              className="pages"
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              // pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              pageRangeDisplayed={4}
              marginPagesDisplayed={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayesTeams;
