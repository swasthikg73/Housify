import { assets } from "../../assets/assets";
import "./Slider.scss";

const Slider = ({ images }) => {
  return (
    <div className="slider">
      <div className="fullSlider">
        <div className="arrow">
          <img src={assets.arrow} alt="" />
        </div>
        <div className="imgContainer">
          <img src={images[0]} alt="" />
        </div>
        <div className="arrow">
          <img src={assets.arrow} className="right" alt="" />
        </div>
        <div className="close">X</div>
      </div>
      <div className="bigImage">
        <img src={images[0]} alt="" />
      </div>
      <div className="smallImages">
        {images.slice(1).map((images, index) => (
          <img src={images} key={index} alt="" />
        ))}
      </div>
    </div>
  );
};

export default Slider;
