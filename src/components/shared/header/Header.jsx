import logo from "../../../assets/img/tiro.jfif";
import "./Header.css";

export const Header = () => {
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div>
          <img className="logo" src={logo} alt="logo a tiro de as" />
        </div>
        <div className="justify-content-center align-self-center px-3">
          <h1>Comercializadora "A tiro de as"</h1>
        </div>
      </div>
    </div>
  );
};
