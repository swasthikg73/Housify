import "./Navbar.scss";
import { assets, userData } from "../../assets/assets";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const user = false;
  return (
    <nav>
      <div className="left">
        <a href="" className="logo">
          <img src={assets.logo} alt="" />
          <span>Housify</span>
        </a>
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/about">Contact</Link>
        <Link to="/">Agents</Link>
      </div>

      <div className="right">
        {!user ? (
          <div className="user">
            <img src={userData.img} alt="" />
            <span>John Max</span>
            <Link className="profile" to="/profile">
              <div className="notification">3</div>

              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/">Sign In</a>
            <a className="register" href="">
              Sign Up
            </a>
          </>
        )}

        <div className="menuIcon">
          <img src={assets.menu} alt="" onClick={() => setOpen(!open)} />
        </div>

        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign In</a>
          <a href="/">Sign Up</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
