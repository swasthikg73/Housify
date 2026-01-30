import "./AboutPage.scss";
import { userData, assets } from "../../assets/assets.js";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="about">
      <div className="about-wrapper">
        <div className="profileImage">
          <img src={userData.img} alt="profile" />
        </div>
        <div className="personal-details">
          <h1 className="title">Developed by,</h1>
          <div className="name">
            <h1>Swasthik G</h1>
            <span>Web Developer</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              sunt dolor ea laudantium ex incidunt corporis, at aut quod dolores
            </p>
          </div>

          {/* <div className="technologies">
            <span>ReactJs, Angular, NodeJs, ExpressJs, MondoDB, Postgress</span>
          </div> */}

          <div className="connection-links">
            <Link to="mailto:swasthig32@gmail.com">
              <img src={assets.gmail} alt="gmail" />
            </Link>
            <Link to="https://www.linkedin.com/in/swasthik-g-510840266?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
              <img src={assets.linkedin} alt="linkedin" />
            </Link>

            <Link to="https://github.com/swasthikg73">
              <img src={assets.github} alt="github" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
