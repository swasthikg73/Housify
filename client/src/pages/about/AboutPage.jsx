import "./AboutPage.scss";
import { assets } from "../../assets/assets.js";

const AboutPage = () => {
  return (
    <div className="about">
      <div className="about-wrapper">
        <div className="profileImage">
          <img src={assets.image} alt="profile" />
        </div>
        <div className="personal-details">
          <h1 className="title">Developed by,</h1>
          <div className="name">
            <h1>Swasthik G</h1>
            <span>Web Developer</span>
            <p className="description">
              Hi, I’m Swasthik G — a junior software developer working with MERN
              and Angular. I love building responsive, user-friendly web apps
              and continuously improving my skills by learning, building and
              experimenting.
            </p>
          </div>
          {/* <div className="technologies">
            <span>ReactJs, Angular, NodeJs, ExpressJs, MondoDB, Postgress</span>
          </div> */}

          <div className="connection-links">
            <a href="mailto:swasthig32@gmail.com" aria-label="Send email">
              <img src={assets.gmail} alt="gmail" />
            </a>
            <a
              href="https://www.linkedin.com/in/swasthik-g-510840266?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noreferrer"
              aria-label="Open LinkedIn profile"
            >
              <img src={assets.linkedin} alt="linkedin" />
            </a>

            <a
              href="https://github.com/swasthikg73"
              target="_blank"
              rel="noreferrer"
              aria-label="Open GitHub profile"
            >
              <img src={assets.github} alt="github" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
