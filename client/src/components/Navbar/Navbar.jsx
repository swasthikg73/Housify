import "./Navbar.scss";
import { assets } from "../../assets/assets";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNotificationStore } from "../../lib/NotificationCounts.js";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { CurrentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  useEffect(() => {
    if (CurrentUser) {
      fetch();
    }
  }, [CurrentUser]);

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src={assets.logo} alt="" />
          <span>Housify</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/about">Contact</Link>
        <Link to="/">Agents</Link>
      </div>

      <div className="right">
        {CurrentUser ? (
          <div className="user">
            <img src={CurrentUser.avatar || assets.user} alt="" />
            <span>{CurrentUser?.username}</span>
            <Link className="profile" to={`/profile/${CurrentUser.id}`}>
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login">Sign In</Link>
            <Link className="register" to="/register">
              Sign Up
            </Link>
          </>
        )}

        <div className="menuIcon">
          <img src={assets.menu} alt="" onClick={() => setOpen(!open)} />
        </div>

        <div className={open ? "menu active" : "menu"}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/about">Contact</Link>
          <Link href="/about">Agents</Link>
          <Link href="/login">Sign In</Link>
          <Link href="/register">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
