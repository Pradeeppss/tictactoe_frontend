import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Invite() {
  let [user, setuser] = useState({});
  let navigate = useNavigate();

  let makenewgame = async (e) => {
    let sendData = {
      player_one: user.email,
      player_two: e.target.email.value,
      turn: user.email,
    };
    try {
      let url = "http://localhost:5055/makenewGame";
      let { data } = await axios.post(url, sendData);
      console.log(data);
      if (data.status) {
        navigate(`/gamepage/${data.result._id}`);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let userdata = localStorage.getItem("logindata");
    let user = JSON.parse(userdata);
    setuser(user);
  }, []);
  return (
    <>
      <section className="log-main-sec flex-column height-screen  flex ">
        <div>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="fa fa-angle-left fa-2x back-btn"
          ></button>
          <div className="reg-head-div">
            <p className="font-epilogue f-small f-bold ">Start a new game</p>
            <p className="font-epilogue f-big f-bold reg-main-head">
              Whom do you want to play with?
            </p>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              makenewgame(event);
            }}
            className="input-form"
            action=""
          >
            <div className="flex flex-column">
              <label className="font-epilogue f-small f-bold" htmlFor="name">
                Email
              </label>
              <input
                name="email"
                required
                className="inputs"
                type="email"
                placeholder="Type your email here"
              />
            </div>
            <button className="btn w-full orange-color m-0">Start game</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Invite;
