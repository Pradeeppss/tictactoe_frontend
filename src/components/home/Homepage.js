import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Entry from "./Entry";
import NewUser from "./Newuser";

function Homepage() {
  let navigate = useNavigate();
  let [games, setgames] = useState([]);
  let findallgames = async (email) => {
    try {
      let url =
        "https://tictactoe-production-b4be.up.railway.app/findallgames/" +
        email;
      let { data } = await axios.get(url);
      setgames([...data.result]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let userlogin = localStorage.getItem("logindata");
    if (userlogin) {
      let user = JSON.parse(userlogin);
      setlogin(true);
      findallgames(user.email);
    }
  }, []);
  let [login, setlogin] = useState(false);
  if (!login) {
    return (
      <>
        <Entry />
      </>
    );
  } else {
    if (games.length === 0) {
      return (
        <>
          <NewUser />
        </>
      );
    } else {
      return (
        <>
          <section className="new-main allgames flex flex-column p-1 w-screen">
            <header className="font-epilogue new-heading w-full">
              Your Games
            </header>
            <div className="w-full new-box card-box w-full flex ">
              {games.map((elem, ind) => {
                return (
                  <div key={ind} className="card p-1 w-full">
                    <h1 className="font-epilogue  f-bold">
                      Game with {elem.player_two}
                    </h1>
                    <p className="font-epilogue p-tb">
                      Tanmay just made their move! It's your turn to play now.
                    </p>
                    <p className="font-epilogue">9th June 2022, 3:15pm</p>
                    <button
                      onClick={() => {
                        navigate("/gamepage/" + elem._id);
                      }}
                      className="btn orange-color m-0 w-full play-btn"
                    >
                      Play!
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => {
                navigate("/invite");
              }}
              className="new-btn font-epilogue"
            >
              <i className="fa fa-plus"></i> New Game
            </button>
          </section>
        </>
      );
    }
  }
}

export default Homepage;
