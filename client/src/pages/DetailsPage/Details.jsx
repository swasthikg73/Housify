import Slider from "../../components/Slider/Slider.jsx";
import "./Details.scss";
import { assets } from "../../assets/assets.js";
import Map from "../../components/Map/Map.jsx";
import { Link, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import apiRequest from "../../lib/apiRequest.js";
import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { format } from "timeago.js";

const Details = () => {
  const details = useLoaderData();
  let mapData = [details?.post];
  const [saved, setSaved] = useState(details?.isSaved);
  const { CurrentUser } = useContext(AuthContext);

  const [chat, setChat] = useState(null);
  const [openchat, setOpenChat] = useState(false);

  const bottomref = useRef(null);

  useEffect(() => {
    bottomref.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaved((prev) => true);
    try {
      const PostDetails = await apiRequest.post(
        `/user/save/` + details.post.id
      );

      if (!PostDetails?.data.success) {
        setSaved((prev) => !prev);
        toast.error("Something went Wrong...!");
      }
      if (PostDetails.data.message === "Post removed from Saved list") {
        toast.info(PostDetails.data.message);
      } else {
        toast.success(PostDetails.data.message);
      }
      setSaved;
    } catch (error) {
      toast.error("Something went Wrong...!");
    }
  };

  async function getChatByPostId(postId) {
    try {
      const res = await apiRequest.get("/chat/getChatbyPost/" + postId);
      return res.data.chat;
    } catch (error) {
      console.log(error.message);
    }
  }

  const openChat = async (e) => {
    e.preventDefault();
    let response;
    setOpenChat(true);
    response = await getChatByPostId(details?.post?.id);

    if (!response) {
      await apiRequest.post("/chat/create", {
        receiverId: details?.post?.userId,
        postId: details?.post?.id,
      });
      response = await getChatByPostId(details?.post?.id);
    }
    setChat(response);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const text = formdata.get("text");
    const res = await apiRequest.post("/chat/addMessage/" + chat.id, {
      text,
    });
    e.target.reset();

    setChat((prev) => ({
      ...prev,
      messages: [...(prev.messages || []), res.data.message],
    }));
  };

  return (
    <div className="details-container">
      <div className="details">
        <div className="wrappers">
          <Link to={"/list"} className="back-button">
            <img src={assets.back} alt="" />
          </Link>
          <Slider images={details?.post?.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{details?.post?.title}</h1>
                <div className="address">
                  <img src={assets.pin} alt="" />
                  <span>{details?.post?.address}</span>
                </div>
                <div className="price">₹ {details?.post?.price}</div>
              </div>
              <div className="user">
                <img src={details?.post?.user?.avatar} alt="" />
                <span>{details?.post?.user?.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(details?.post?.postDetail?.desc),
              }}></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrappers">
          <h2 className="title">General</h2>
          <div className="listVertical">
            <div className="feature">
              <img src={assets.utility} alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>{details?.post?.postDetail?.utilities}</p>
              </div>
            </div>
            <div className="feature">
              <img src={assets.pet} alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>{details?.post?.postDetail?.pet}</p>
              </div>
            </div>
            <div className="feature">
              <img src={assets.fee} alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{details?.post?.postDetail?.income}</p>
              </div>
            </div>
          </div>
          <h2 className="title">Room Sizes</h2>
          <div className="room-sizes">
            <div className="size">
              <img src={assets.size} alt="" />
              <span>{details?.post?.postDetail?.size}</span>
            </div>

            <div className="size">
              <img src={assets.bed} alt="" />
              <span>{details?.post?.bedroom} beds</span>
            </div>

            <div className="size">
              <img src={assets.bath} alt="" />
              <span>{details?.post?.bathroom} bathroom</span>
            </div>
          </div>

          <h2 className="title">Nearby Places</h2>
          <div className="listHorizontal">
            <div className="feature">
              <img src={assets.school} alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {details?.post?.postDetail?.school > 999
                    ? details?.post?.postDetail?.school / 1000 + "Km "
                    : details?.post?.postDetail?.school + "m "}
                  away
                </p>
              </div>
            </div>

            <div className="feature">
              <img src={assets.bus} alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>
                  {details?.post?.postDetail?.bus > 999
                    ? details?.post?.postDetail?.bus / 1000 + "Km "
                    : details?.post?.postDetail?.bus + "m "}
                  away
                </p>
              </div>
            </div>

            <div className="feature">
              <img src={assets.restaurant} alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>
                  {details?.post?.postDetail?.restaurant > 999
                    ? details?.post?.postDetail?.restaurant / 1000 + "Km "
                    : details?.post?.postDetail?.restaurant + "m "}
                  away
                </p>
              </div>
            </div>
          </div>
          <h2 className="title">Location</h2>
          <div className="mapContainer">
            <Map items={mapData} />
          </div>

          <div className="buttons">
            {details?.post?.userId !== CurrentUser.id && (
              <button onClick={openChat}>
                <img src={assets.chat} alt="" />
                Send a Message
              </button>
            )}

            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}>
              <img src={assets.save} alt="" />
              {saved ? "Saved" : "Save the Places"}
            </button>
          </div>

          {/* Message Container */}
          {openchat && (
            <div className="chatBox">
              <div className="top">
                <div className="user">
                  <img
                    src={details?.post?.user?.avatar || assets.user}
                    alt=""
                  />
                  <span>{details?.post?.user?.username}</span>
                </div>
                <span className="close" onClick={() => setOpenChat(false)}>
                  X
                </span>
              </div>

              <div className="center">
                {chat?.messages?.map((message, index) => (
                  <div
                    key={index}
                    className="chatMessage"
                    style={{
                      alignSelf:
                        message?.userId === CurrentUser?.id
                          ? "flex-end"
                          : "flex-start",
                      textAlign:
                        message?.userId === CurrentUser?.id ? "right" : "left",
                    }}>
                    <p>{message?.text}</p>
                    <span>{format(message?.createdAt)}</span>
                  </div>
                ))}

                <div ref={bottomref}></div>
              </div>
              <form className="bottom" onSubmit={sendMessage}>
                <textarea name="text" id="text"></textarea>
                <button>Send</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
