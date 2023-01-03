import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Game() {
  let navigate = useNavigate();
  let { _id } = useParams();
  let [currUser, setcurrUser] = useState({});
  let [myturn, setmyturn] = useState(false);
  let [statusText, setstatusText] = useState("Start");
  let [XorO, setXorO] = useState(0);
  let [turnno, setturnno] = useState(0);

  let defaultArr = [
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
  let [gameArr, setgameArr] = useState([...defaultArr]);

  let getgamedetails = async () => {
    console.log(_id);
    let userdata = JSON.parse(localStorage.getItem("logindata"));
    setcurrUser({ ...userdata });
    try {
      // let url = `http://localhost:5055/getgamebyid/${_id}`;
      let url = `https://tictactoe-production-b4be.up.railway.app/getgamebyid/${_id}`;
      let {
        data: { status, result },
      } = await axios.get(url);
      if (status) {
        // console.log(result);
        if (result.gameState.length !== 0) {
          if (result.player_two === userdata.email) {
            setXorO(1);
          }
          setgameArr([...result.gameState]);
          if (result.gameStatus === "Draw") {
            setstatusText("Draw");
          } else if (result.gameStatus) {
            if (result.turn === userdata.email) {
              setstatusText("You Lost");
            } else {
              setstatusText("You Won");
            }
          } else {
            // console.log(result.turn);
            if (result.turn === userdata.email) {
              setstatusText("Your Move");
            } else {
              setstatusText("Opponent's Move");
            }
          }
        }
        if (result.turn === userdata.email) {
          console.log("allowed access");
          setmyturn(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  let updategamearr = async (index) => {
    setmyturn(false);
    setturnno((currno) => {
      return currno + 1;
    });
    let currarr = gameArr;
    console.log(XorO);
    console.log(currUser);
    if (XorO === 0) {
      console.log("here");
      currarr[index].value = 1;
      setgameArr([...currarr]);
    } else {
      console.log("not here");

      currarr[index].value = 0;
      setgameArr([...currarr]);
    }
    let sendobj = {
      game_id: _id,
      user: currUser.email,
      game: currarr,
      turn: turnno + 1,
    };
    try {
      // let url = "http://localhost:5055/updategameStatus";
      let url = `https://tictactoe-production-b4be.up.railway.app/updategameStatus`;
      let {
        data: { status, result },
      } = await axios.post(url, sendobj);
      if (status) {
        // console.log(result);
        if (result.gameStatus === "Draw") {
          setstatusText("Draw");
        } else if (result.gameStatus) {
          if (result.turn === currUser.email) {
            setstatusText("You Lost");
          } else {
            setstatusText("You Won");
          }
        } else {
          setstatusText("Opponent's Move");
        }
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
        <p className="p-half font-epilogue ">{statusText}</p>
        <div className="outside-box w-full flex">
          {gameArr.map((elem, ind) => {
            return (
              <button
                disabled={elem.disabled || !myturn}
                onClick={() => {
                  updategamearr(ind);
                }}
                key={ind}
                className="box-in-box"
              >
                {elem.value === null ? null : elem.value + XorO === 1 ? (
                  <img
                    src={"/gamepage/Property 1=x.svg"}
                    className="svg-ingame"
                    alt=""
                  />
                ) : (
                  <img
                    src={"/gamepage/Property 1=o.svg"}
                    className="svg-ingame"
                    alt=""
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="btn sub-btn orange-color "
      >
        Submit
      </button>
    </>
  );
}

export default Game;
