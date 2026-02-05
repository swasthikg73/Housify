import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Layout.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Layout = () => {
  return (
    <div>
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const RequireAuth = () => {
  const { CurrentUser } = useContext(AuthContext);

  return !CurrentUser ? (
    <Navigate to={"/login"} />
  ) : (
    <div>
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export { Layout, RequireAuth };
