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
import { useParams } from "react-router-dom";
import store from "../redux/store";
import { useSelector } from "react-redux";

const AddnewTeam: React.FC = () => {
  const { coloritem, setColoritem } = useState(false);
  const [photo, setPhoto] = useState("");
  let teamData: object = useSelector((state:any) => state.team)
  interface team {
    name: string,
    foundationYear: number,
    division: string,
    conference: string,
    imageUrl: string,
    id: number
}
  let teamParams:team = store.getState().team as team
  const params = useParams();
  const id = params.id;
  console.log(id);
  const sendData = () => {
    if (id) {
      api.team
        .upDateTeam(
       store.getState().team
        )
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      api.team
        .add({
          name: name,
          foundationYear: year,
          division: division,
          conference: conference,
          imageUrl: photo,
        })
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  interface value {
    target: {
      value: string;
    };
  }
  interface valueNumber {
    target: {
      value: number;
    };
  }
  // interface valuePhoto {
  //   target: {
  //     value: any;
  //   };
  // }
  const sendName = (e: value) => {
    console.log(e);
    name = e.target.value;
    console.log(name);
    store.dispatch({
      type: "team/set",
      payload: { name: name },
    });
  };
  const sendDivision = (e: value) => {
    division = e.target.value;
    console.log(division);
    store.dispatch({
      type: "team/set",
      payload: { division: division },
    });
  };
  const sendConference = (e: value) => {
    conference = e.target.value;
    console.log(conference);
    store.dispatch({
      type: "team/set",
      payload: { conference: conference },
    });
  };
  const SendYear = (e: valueNumber) => {
    year = e.target.value;
    console.log(year);
    store.dispatch({
      type: "team/set",
      payload: { year: year },
    });
  };

  const sendPhoto = (e) => {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    api.saveImage(formData).then((response) => {
      setPhoto(response.data);
      console.log(response);
    });
  };

  let name: string;
  let division: string;
  let conference: string;
  let year: number;

  // let photo
  const domain = "http://dev.trainee.dex-it.ru";
  function changeColorofSign() {
    setColoritem(!coloritem);
  }

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
                  <img
                    src={"img/add_a_photo_24px_rounded.png"}
                    className="ImgofCamera"
                  />
                </div>
              </label>
            )}
            {photo && (
              <img src={`${domain}${photo}`} className="photo-location" />
            )}
            <div className="InputNameAddPlayer">
              <Input1 label="Name" type="text" onInput1={sendName} value={teamParams.name}/>
              <div className="DivisionInput">
                <Input1 label="Division" onInput1={sendDivision} value={teamParams.division}/>
              </div>
              <div className="ConferenceInput">
                <Input1 label="Conference" onInput1={sendConference} value={teamParams.conference}/>
              </div>
              <div className="Year of foundation1">
                <Input1 label="Year of foundation" onInput1={SendYear} value={teamParams.foundationYear}/>
              </div>
              {photo}
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

export default AddnewTeam;
