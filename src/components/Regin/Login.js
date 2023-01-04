import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  let login = async (event) => {
    let { username, password } = event.target;
    let sendData = {
      username: username.value,
      password: password.value,
    };
    try {
      // let url = "https://tictactoe-production-b4be.up.railway.app/login";
      let url = "http://localhost:5055/login";
      let { data } = await axios.post(url, sendData);
      if (data.status) {
        localStorage.setItem("logindata", JSON.stringify(data.result));
        console.log("ok");
        navigate("/");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="log-main-sec flex-column height-screen  flex ">
        <div>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="fa back-btn fa-angle-left fa-2x"
          ></button>
          <div className="reg-head-div">
            <p className="font-epilogue f-small f-bold ">Login</p>
            <p className="font-epilogue f-big f-bold reg-main-head">
              Please enter your details
            </p>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              login(event);
            }}
            className="input-form"
            action=""
          >
            <div className="flex flex-column">
              <label className="font-epilogue f-small f-bold" htmlFor="name">
                Username
              </label>
              <input
                name="username"
                className="inputs"
                type="text"
                placeholder="Type your username here"
              />
            </div>

            <div className="flex flex-column">
              <label className="font-epilogue f-small f-bold" htmlFor="name">
                Password
              </label>
              <input
                name="password"
                className="inputs"
                type="text"
                placeholder="Type your password here"
              />
            </div>
            <button className="btn orange-color w-full m-0">Login</button>
          </form>
        </div>
        <button className="btn success-btn m-0">
          Congratulations!!! Account created.
        </button>
      </section>
    </>
  );
}

export default Login;
