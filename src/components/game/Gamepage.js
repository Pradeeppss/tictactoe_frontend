import { useNavigate } from "react-router-dom";
import Game from "./Game";

function Gamepage() {
  let navigate = useNavigate();
  return (
    <>
      <section className="flex game-page height-screen w-screen p-1">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="fa back-btn fa-angle-left fa-2x"
        ></button>
        <p className="game-heading font-epilogue">Game with Pradeep</p>
        <div>
          <p className="font-epilogue">Your piece</p>
          <div className="">
            <img
              src={"/gamepage/Property 1=x.svg"}
              alt=""
              className="svg-img"
            />
          </div>
        </div>
        <Game />
      </section>
    </>
  );
}

export default Gamepage;
