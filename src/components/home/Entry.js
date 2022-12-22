import { useNavigate } from "react-router-dom";

function Entry() {
  let navigate = useNavigate();
  return (
    <>
      <section className="entry-page p-1 height-screen flex">
        <div className="font-bilbo heading-box">
          <p className="entry-head-one">async</p>
          <h1 className="entry-main-head">tic tac toe</h1>
        </div>
        <div className="flex button-box w-full">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="orange-color  btn"
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/register");
            }}
            className="blue-color  btn"
          >
            Register
          </button>
        </div>
      </section>
    </>
  );
}

export default Entry;
