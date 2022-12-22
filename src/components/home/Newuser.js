import { useNavigate } from "react-router-dom";

function NewUser() {
  let navigate = useNavigate();
  return (
    <>
      <section className="new-main  height-screen flex flex-column p-1 height-screen w-screen">
        <header className="font-epilogue new-heading w-full">Your Games</header>
        <div className="w-full new-box flex">
          <div className="new-head-box">
            <h1 className="font-bilbo new-main-head">No Games Found</h1>
          </div>
          <div className="flex w-full">
            <button
              onClick={() => {
                navigate("/invite");
              }}
              className="orange-color btn w-full"
            >
              Start a new game
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default NewUser;
