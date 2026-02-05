import "./Chat.scss";
import { assets } from "../../assets/assets.js";
import { AuthContext } from "../../context/AuthContext";

import { useContext, useState } from "react";

const Chat = () => {
  const [chat, setChat] = useState(true);
  const { CurrentUser } = useContext(AuthContext);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        <div className="message">
          <img src={CurrentUser.avatar || assets.user} alt="userImage" />
          <span>john Doe</span>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
            quam explicabo vel mollitia doloribus nam aut dolor at quisquam .
          </p>
        </div>

        <div className="message">
          <img src={CurrentUser.avatar || assets.user} alt="userImage" />
          <span>john Doe</span>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
            quam explicabo vel mollitia doloribus nam aut dolor at quisquam .
          </p>
        </div>

        <div className="message">
          <img src={CurrentUser.avatar || assets.user} alt="userImage" />
          <span>john Doe</span>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
            quam explicabo vel mollitia doloribus nam aut dolor at quisquam .
          </p>
        </div>

        <div className="message">
          <img src={CurrentUser.avatar || assets.user} alt="userImage" />
          <span>john Doe</span>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
            quam explicabo vel mollitia doloribus nam aut dolor at quisquam .
          </p>
        </div>

        <div className="message">
          <img src={CurrentUser.avatar || assets.user} alt="userImage" />
          <span>john Doe</span>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
            quam explicabo vel mollitia doloribus nam aut dolor at quisquam .
          </p>
        </div>
      </div>

      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={CurrentUser.avatar || assets.user} alt="" />
              <span>Jonh Doe</span>
            </div>
            <span className="close" onClick={() => setChat(false)}>
              X
            </span>
          </div>

          <div className="center">
            <div className="chatMessage">
              <p>Lorem isprjt dodlr sit rtg</p>
              <span>1 hour ago</span>
            </div>

            <div className="chatMessage own">
              <p>Lorem isprjt dodlr sit rtg</p>
              <span>1 hour ago</span>
            </div>

            <div className="chatMessage">
              <p>Lorem isprjt dodlr sit rtg</p>
              <span>1 hour ago</span>
            </div>

            <div className="chatMessage own">
              <p>Lorem isprjt dodlr sit rtg</p>
              <span>1 hour ago</span>
            </div>

            <div className="chatMessage">
              <p>Lorem isprjt dodlr sit rtg</p>
              <span>1 hour ago</span>
            </div>

            <div className="chatMessage own">
              <p>Lorem isprjt dodlr sit rtg</p>
              <span>1 hour ago</span>
            </div>

            <div className="chatMessage own">
              <p>Lorem isprjt dodlr sit rtg</p>
              <span>1 hour ago</span>
            </div>
          </div>
          <div className="bottom">
            <textarea name="" id=""></textarea>
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
