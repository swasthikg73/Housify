import "./Home.scss";
import { assets } from "../../assets/assets.js";
import Searchbar from "../../components/searchBar/Searchbar.jsx";

const Home = () => {
  return (
    <div className="home-container">
      <div className="text-container">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p className="description">
            Housify makes real estate simple — discover properties, list your
            own, and communicate directly with property owners in one seamless
            platform.
          </p>
          <Searchbar />

          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>

            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>

            <div className="box">
              <h1>1200+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Image contents */}
      <div className="img-container">
        <img src={assets.bg} alt="" />
      </div>
    </div>
  );
};

export default Home;
