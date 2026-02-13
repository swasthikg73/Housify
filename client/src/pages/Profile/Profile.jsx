import "./Profile.scss";
import Card from "../../components/Card/Card.jsx";
import { ListData, userData } from "../../assets/assets.js";
import Chat from "../../components/chat/Chat.jsx";
import apiRequest from "../../lib/apiRequest.js";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

const Profile = () => {
  const navigate = useNavigate();
  const { CurrentUser, updateUser } = useContext(AuthContext);

  const { profilePosts, chats } = useLoaderData();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRequest.post("/auth/logout");

      if (res.data.success) {
        updateUser(null);
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {}
  };

  return (
    <div className="profilePage">
      <div className="userdetails">
        <div className="wrappers">
          <div className="title">
            <h1>User Information</h1>

            <Link to="/profile-update">
              <button>Update Profile </button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar: <img src={CurrentUser?.avatar || userData.img} alt="" />
            </span>

            <span>
              Username : <b>{CurrentUser?.username}</b>
            </span>

            <span>
              E-mail : <b>{CurrentUser?.email}</b>
            </span>

            <button onClick={handleLogout} className="Logout">
              Logout
            </button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/addpost">
              <button>Add New Post</button>
            </Link>
          </div>
          <div className="list">
            {profilePosts.myPosts.map((item, index) => (
              <Card card={item} key={index} />
            ))}
          </div>
          <div className="title">
            <h1>Saved List</h1>{" "}
          </div>
          <div className="list">
            {profilePosts.savedPosts.map((post, index) => (
              <Card card={post.post} key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrappers">
          <Chat chats={chats.chats} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
