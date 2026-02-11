import Slider from "../../components/Slider/Slider.jsx";
import "./Details.scss";
import { assets } from "../../assets/assets.js";
import Map from "../../components/Map/Map.jsx";
import { useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import apiRequest from "../../lib/apiRequest.js";
import { useState } from "react";

const Details = () => {
  const details = useLoaderData();
  let mapData = [details.post];
  const [saved, setSaved] = useState(details.isSaved);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaved((prev) => !prev);
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

  return (
    <div className="details-container">
      <div className="details">
        <div className="wrappers">
          <Slider images={details?.post?.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{details?.post?.title}</h1>
                <div className="address">
                  <img src={assets.pin} alt="" />
                  <span>{details?.post?.address}</span>
                </div>
                <div className="price">$ {details?.post?.price}</div>
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
            <button>
              <img src={assets.chat} alt="" />
              Send a Message
            </button>

            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}>
              <img src={assets.save} alt="" />
              {saved ? "Saved" : "Save the Places"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
