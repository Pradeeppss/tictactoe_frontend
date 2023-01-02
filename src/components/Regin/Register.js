import axios from "axios";

function Register() {
  let addnewUser = async (event) => {
    let { name, username, email, password } = event.target;
    let sendData = {
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value,
    };
    try {
      let url = "https://tictactoe-production-b4be.up.railway.app/adduser";
      // let url = "http://localhost:5055/adduser";
      let { data } = await axios.post(url, sendData);
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="reg-main-sec  p-1 flex flex-column ">
        <div className="main-div">
          <div className="fa fa-angle-left fa-2x"></div>
          <div className="reg-head-div">
            <p className="font-epilogue f-small f-bold ">Create account</p>
            <p className="font-epilogue f-big f-bold reg-main-head">
              Let's get to know you better!
            </p>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              addnewUser(event);
            }}
            className="input-form"
            action=""
          >
            <div className="flex flex-column">
              <label className="font-epilogue f-small f-bold" htmlFor="name">
                Your name
              </label>
              <input
                required
                name="name"
                className="inputs"
                type="text"
                placeholder="Type your name here"
              />
            </div>
            <div className="flex flex-column">
              <label className="font-epilogue f-small f-bold" htmlFor="name">
                Username
              </label>
              <input
                required
                name="username"
                className="inputs"
                type="text"
                placeholder="Type your username here"
              />
            </div>
            <div className="flex flex-column">
              <label className="font-epilogue f-small f-bold" htmlFor="name">
                Email
              </label>
              <input
                required
                name="email"
                className="inputs"
                type="email"
                placeholder="Type your email here"
              />
            </div>
            <div className="flex flex-column">
              <label className="font-epilogue f-small f-bold" htmlFor="name">
                Password
              </label>
              <input
                required
                name="password"
                className="inputs"
                type="password"
                placeholder="Type your password here"
              />
            </div>
            <button className="btn w-full orange-color m-0">Register</button>
          </form>
        </div>
        <button type="button" className="btn success-btn m-0">
          Congratulations!!! Account created.
        </button>
      </section>
    </>
  );
}

export default Register;
