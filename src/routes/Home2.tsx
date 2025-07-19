import "../App.css";
import downarrow from "../assets/downarrow.png";
import { useNavigate } from "react-router-dom";
export const Home2 = () => {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <section className="background-blur"></section>
        <section className="header-section">
          <h1 className="header-title js-animate-letters">
            <span>A</span>
            <span>L</span>
            <span>O</span>
            <span>K</span>
            <span>'s</span>
            <span>-</span>
            <span>B</span>
            <span>L</span>
            <span>O</span>
            <span>G</span>
            <span>S</span>
          </h1>
        </section>
        <div className="sub-header-text">
          <h2>Read the blogs and contribute your thoughts</h2>
        </div>
        <section className="navigate-button">
          <button
            onClick={() => {
              const jwt = localStorage.getItem("jwt");
              if (jwt) {
                navigate("/blogs");
              } else {
                navigate("/signin");
              }
            }}
            type="button"
            className="btn"
          >
            Start Reading
          </button>
        </section>
        <section className="down-arrow">
          <img src={downarrow} alt="" width="40px" />
        </section>
      </header>
    </>
  );
};