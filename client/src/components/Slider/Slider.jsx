import { useState } from "react";
import { assets } from "../../assets/assets";
import "./Slider.scss";

const Slider = ({ images }) => {
  // images.slice(1).map((image, i) => {
  //   console.log(image);
  // });

  const [imageIndex, setImageIndex] = useState(null);

  const changeSlider = (direction) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };

  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow">
            <img
              src={assets.arrow}
              alt=""
              onClick={() => changeSlider("left")}
            />
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]} alt="" />
          </div>
          <div className="arrow">
            <img
              src={assets.arrow}
              className="right"
              alt=""
              onClick={() => changeSlider("right")}
            />
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}
      <div className="bigImage">
        <img src={images[0]} alt="" onClick={() => setImageIndex(0)} />
      </div>
      <div className="smallImages">
        {images.slice(1).map((images, index) => (
          <img
            src={images}
            key={index}
            alt=""
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
