import "./Card.scss";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets.js";

const Card = ({ card }) => {
  return (
    <div className="card">
      <Link to={`/details/${card.id}`} className="image-container">
        <img src={card.images[0]} alt="" />
      </Link>

      <div className="text-container">
        <h2 className="title">
          <Link to={`/details/${card.id}`}>{card.title}</Link>
        </h2>
        <p className="address">
          <img src={assets.pin} alt="" />
          <span>{card.address}</span>
        </p>
        <p className="price">$ {card.price}</p>

        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src={assets.bed} alt="" />
              <span>{card.bedroom} bedrooms</span>
            </div>
            <div className="feature">
              <img src={assets.bath} alt="" />
              <span>{card.bathroom} bathrooms</span>
            </div>
          </div>
          {/* <div className="icons">
            <div className="icon">
              <img src={assets.save} alt="" />
            </div>
            <div className="icon">
              <img src={assets.chat} alt="" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
