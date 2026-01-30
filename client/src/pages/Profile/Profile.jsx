import React from "react";
import "./Profile.scss";
import Card from "../../components/Card/Card.jsx";
import { assets, ListData, userData } from "../../assets/assets.js";
import Chat from "../../components/chat/Chat.jsx";

const Profile = () => {
  return (
    <div className="profilePage">
      <div className="userdetails">
        <div className="wrappers">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>

          <div className="info">
            <span>
              Avatar: <img src={userData.img} alt="" />
            </span>

            <span>
              Username : <b>John Doe</b>
            </span>

            <span>
              E-mail : <b>john@gmail.com</b>
            </span>
          </div>

          <div className="title">
            <h1>My List</h1>
            <button>Add New Post</button>
          </div>

          <div className="list">
            {ListData.map((item, index) => (
              <Card card={item} key={index} />
            ))}
          </div>

          <div className="title">
            <h1>Saved List</h1>
          </div>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrappers">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Profile;
