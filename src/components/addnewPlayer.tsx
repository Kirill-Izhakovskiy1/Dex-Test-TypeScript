import Navifation from "./navigation";
import Search from "../UI/search";
import Add from "../UI/add+";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import Input1 from "../UI/Input1";
import Input from "../UI/input_type";
import Selector from "../UI/selector";
import SmallInput from "../UI/smallInput";
import SideBar from "./sideBar";
import api from "../API copy";
import { useEffect } from "react";
import calendar from "./calendar";
import Calendar from "./calendar";
import { useParams } from "react-router-dom";
import store from "../redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const AddnewPlayer = () => {
  const [positions, setPositions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [photo, setPhoto] = useState("");
  const domain: string = "http://dev.trainee.dex-it.ru";
  interface teamsString {
    label: string;
    value: string;
  }
  interface teamsNumber {
    label: string;
    value: number;
  }
  interface value {
    target: {
      value: string;
    };
  }

  // [
  // {
  //   name: 'stenly',
  //   foundationYear: 1998,
  //   division: 'high',
  //   conference: 'high',
  //   imageUrl: 'high',
  //   id: 2507
  // },
  // {
  //   name: 'stenly1',
  //   foundationYear: 1998,
  //   division: 'high',
  //   conference: 'high',
  //   imageUrl: 'high',
  //   id: 2507
  // }
  // ]

  let name2: object = useSelector((state: any) => state.player);
  let teamValue: number = useSelector((state: any) => state.player.team);
  useEffect(() => {
    if (id) {
      console.log(id);
      api.player
        .get({
          id: id.slice(1),
        })
        .then((res) => {
          console.log(res);
          store.dispatch({
            type: "player/set",
            payload: res.data,
          });
        });
    }
  }, []);
  const sendData = () => {
    if (id) {
      console.log({
        name: name,
        number: +number,
        position: position,
        team: +team,
        birthday: currentDate,
        height: +height,
        weight: +weight,
        avatarUrl: "string",
        id: +id,
      });
      api.player
        .upDate(store.getState().player)
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log({
        name: name,
        number: number,
        position: position,
        team: team,
        birthday: currentDate,
        height: height,
        weight: weight,
        avatarUrl: "string",
      });
      api.player
        .add(player)
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const params = useParams();
  const id = params.id;
  console.log(id);

  useEffect(() => {
    api.player.getPositions().then((res) => {
      console.log(res);
      setPositions(
        res.data.map((p) => {
          return { value: p, label: p };
        })
      );
    });
  }, []);
  useEffect(() => {
    api.team
      .getTeams({
        name: "",
        page: 1,
        pageSize: 10,
      })
      .then((response) => {
        setTeams(
          response.data.data.map((one) => ({
            label: one.name,
            value: one.id,
          }))
        );
        console.log(response);
      });
  }, []);

  const { coloritem, setColoritem } = useState(false);

  function changeColorofSign() {
    // s=10
    // let num = 3;
    setColoritem(!coloritem);
  }

  let name: string;
  let position: string;
  let team: number;
  let height: number;
  let weight: number;
  let currentDate: string;
  let number: number;
  interface valueOfString {
    target: {
      value: string;
    };
  }
  interface valueNumber {
    target: {
      value: number;
    };
  }
  // console.log(currentDate);
  function onDateChange(date) {
    currentDate = date;
    console.log(date);
    store.dispatch({
      type: "player/set",
      payload: { birthday: date },
    });
  }
  const sendName = (e: valueOfString) => {
    name = e.target.value;
    console.log(name);
    store.dispatch({
      type: "player/set",
      payload: { name: name },
    });
    console.log(store.getState().player);
  };
  const sendPosition = (e: teamsString) => {
    console.log(e);
    position = e.value;

    store.dispatch({
      type: "player/set",
      payload: { position: position },
    });
  };
  const sendteam = (e: teamsNumber) => {
    // team = e.target.value;
    team = e.value;
    console.log(e);
    store.dispatch({
      type: "player/set",
      payload: { team: team },
    });
    // console.log(store.getState().player.team)
  };
  const sendHeight = (e: valueNumber) => {
    height = e.target.value;
    console.log(height);
    store.dispatch({
      type: "player/set",
      payload: { height: height },
    });
  };

  const sendPhoto = (e) => {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    api.saveImage(formData).then((response) => setPhoto(response.data));
  };

  const sendWeight = (e: valueNumber) => {
    weight = e.target.value;
    console.log(weight);
    store.dispatch({
      type: "player/set",
      payload: { weight: weight },
    });
    store.dispatch({
      type: "player/set",
      payload: { weight: weight },
    });
  };

  const sendNumber = (e: valueNumber) => {
    number = e.target.value;
    console.log(number);
    store.dispatch({
      type: "player/set",
      payload: { number: number },
    });
    console.log(store.getState().player);
  };
  interface playerType {
    avatarUrl: string;
    birthday: string;
    height: number;
    id: number;
    name: string;
    number: number;
    position: string;
    team: number;
    teamName: string;
    weight: number;
  }
  let player: playerType = store.getState().player as playerType;
  console.log(player);
  return (
    <div className="cardsTeam">
      <Navifation />
      <div className="underNavPlayer">
        <SideBar />
        <div className="AddPlayer">
          <div className="NavAddPlayer">
            <p className="textinAddplayer">Players/Add Players</p>
          </div>
          <div className="ADDPlayerONE">
            {!photo && (
              <label>
                <div className="inputPhoto">
                  <input
                    type="file"
                    className="Input_file"
                    onInput={sendPhoto}
                  />
                  <img src={player.avatarUrl} className="ImgofCamera" />
                </div>
              </label>
            )}
            {photo && (
              <img src={`${domain}${photo}`} className="photo-location" />
            )}
            <div className="InputNameAddPlayer">
              <Input1
                label="Name"
                type="text"
                onInput1={sendName}
                value={player.name}
              />
              {/* value={player.name} */}
              <Selector
                label="Position"
                options={positions}
                onInput={sendPosition}
                value={positions.find((item) => item.value == player.position)}
              />
              {/* <input type="text" value="text" /> */}
              <Selector
                label="Team"
                options={teams}
                onInput={sendteam}
                value={teams.find((item) => item.value == player.team)}
              />
              <div className="FourInputs">
                <div className="ftwofirsrsmallinputs">
                  <SmallInput
                    label="Height (cm)"
                    onInput={sendHeight}
                    value={player.height}
                  />

                  <div className="small2">
                    <SmallInput
                      label="Weight (kg)"
                      onInput={sendWeight}
                      value={player.weight}
                    />
                  </div>
                </div>
                <div className="stwosecondsmallinputs">
                  <div className="calendar">
                    <Calendar
                      onDateChange={onDateChange}
                      valueCurrent={new Date(player.birthday)}
                    />
                    {/* {console.log(birthday)} */}
                  </div>

                  <div className="small4">
                    <SmallInput
                      label="Number"
                      onInput={sendNumber}
                      value={player.number}
                    />
                  </div>
                </div>
              </div>
              <div className="buttons">
                <div className="marginforcancel">
                  <button className="cancel">Cancel</button>
                </div>
                <div className="marginforsave">
                  <button className="save" onClick={sendData}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddnewPlayer;
