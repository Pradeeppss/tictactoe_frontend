import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Game() {
  let navigate = useNavigate();
  let { _id } = useParams();
  let [game, setgame] = useState({});
  let [move, setmove] = useState("your turn");
  let [disable, setdisable] = useState(false);
  let [playnum, setplaynum] = useState(0);
  let defaultarr = [
    {
      value: null,
      right: [3, false],
      left: [1, false],
      front: [4, false],
      disabled: false,
    },
    {
      value: null,
      right: [0, false],
      left: [2, false],
      front: [4, false],
      disabled: false,
    },
    {
      value: null,
      right: [1, false],
      left: [5, false],
      front: [4, false],
      disabled: false,
    },
    {
      value: null,
      right: [6, false],
      left: [0, false],
      front: [4, false],
      disabled: false,
    },
    {
      value: null,
      right: [0, false],
      left: [0, false],
      front: [4, false],
      disabled: false,
    },
    {
      value: null,
      right: [2, false],
      left: [8, false],
      front: [4, false],
      disabled: false,
    },
    {
      value: null,
      right: [7, false],
      left: [3, false],
      front: [4, false],
      disabled: false,
    },
    {
      value: null,
      right: [8, false],
      left: [6, false],
      front: [4, false],
      disabled: false,
    },
    {
      value: null,
      right: [5, false],
      left: [7, false],
      front: [4, false],
      disabled: false,
    },
  ];
  let [gameArr, setgameArr] = useState(defaultarr);

  let getgamedetails = async () => {
    try {
      let url = `http://localhost:5055/getgamebyid/${_id}`;
      let {
        data: { status, result },
      } = await axios.get(url);
      setgame({ ...result });
      if (status) {
        if (result.gameState.length !== 0) {
          if (result.gameStatus === "opponent's turn") {
            setmove("opponent's turn");
            setdisable(true);
          } else {
            setmove("your turn");
          }
          setgameArr([...result.gameState]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  let updategamearr = async (index) => {
    setdisable(true);
    let curnum = playnum + 1;
    setplaynum((currnum) => currnum + 1);
    let currArr = gameArr;
    let message = "";
    let turnemail;
    if (curnum % 2 === 0) {
      currArr[index].value = 0;
      message = "your turn";
      turnemail = game.player_one;
      currArr[index].disabled = true;
    } else {
      message = "opponent's turn";
      turnemail = game.player_two;
      currArr[index].value = 1;
      currArr[index].disabled = true;
    }
    setgameArr([...currArr]);
    try {
      let url = "http://localhost:5055/updategameStatus";
      let { data } = await axios.post(url, {
        game: currArr,
        game_id: _id,
        gamestatus: message,
        turn: turnemail,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  let submitGame = async () => {
    try {
      let url = "http://localhost:5055/checkgameStatus";
      let { data } = await axios.post(url, { game: gameArr, turn: playnum });
      console.log(data.message);
      if (data.status) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("hi hi hi");
    getgamedetails();
  }, []);
  return (
    <>
      <section className="game-sec  flex">
        <p className="p-half font-epilogue ">{move}</p>
        <div className="outside-box w-full flex">
          {gameArr.map((elem, ind) => {
            return (
              <button
                disabled={elem.disabled}
                onClick={() => {
                  updategamearr(ind);
                }}
                key={ind}
                className="box-in-box"
              >
                {elem.value === 1 ? (
                  <img
                    src={"/gamepage/Property 1=x.svg"}
                    className="svg-ingame"
                    alt=""
                  />
                ) : elem.value === 0 ? (
                  <img
                    src={"/gamepage/Property 1=o.svg"}
                    className="svg-ingame"
                    alt=""
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </section>
      <button
        onClick={() => {
          submitGame();
        }}
        className="btn sub-btn orange-color "
      >
        Submit
      </button>
    </>
  );
}

export default Game;
