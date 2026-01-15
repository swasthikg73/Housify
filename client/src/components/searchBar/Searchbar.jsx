import "./Searchbar.scss";
import { assets } from "../../assets/assets.js";
import { useState } from "react";

const types = ["Buy", "Rent"];

const Searchbar = () => {
  const [data, setData] = useState({
    type: "Buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (value) => {
    setData((prev) => ({ ...prev, type: value }));
    6;
  };

  return (
    <div className="search-container">
      <div className="type">
        {types.map((type) => (
          <button
            onClick={() => switchType(type)}
            key={type}
            className={data.type === type ? "active" : ""}>
            {type}
          </button>
        ))}
      </div>
      <form action="">
        <input type="text" name="location" placeholder="City Location" />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={1000000}
          placeholder="Min Price"
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={1000000}
          placeholder="Max Price"
        />
        <button type="submit">
          <img src={assets.search} alt="" />
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
