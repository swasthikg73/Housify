import Slider from "../../components/Slider/Slider.jsx";
import "./Details.scss";
import { assets, singlePostData, userData } from "../../assets/assets.js";

const Details = () => {
  return (
    <div className="details-container">
      <div className="details">
        <div className="wrappers">
          <Slider images={singlePostData.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <div className="address">
                  <img src={assets.pin} alt="" />
                  <span>{singlePostData.address}</span>
                </div>
                <div className="price">$ {singlePostData.price}</div>
              </div>
              <div className="user">
                <img src={userData.img} alt="" />
                <span>{userData.name}</span>
              </div>
            </div>
            <div className="bottom">{singlePostData.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrappers"></div>
      </div>
    </div>
  );
};

export default Details;
