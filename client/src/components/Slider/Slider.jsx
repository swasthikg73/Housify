import "./Slider.scss";

const Slider = ({ images }) => {
  return (
    <div className="slider">
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
