import "./Filter.scss";
import { assets } from "../../assets/assets.js";

const Filter = () => {
  return (
    <div className="filter">
      <h1>
        Search results for <b>London</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter location"
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select id="type" name="type">
            <option value="">Any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select id="property" name="property">
            <option value="">Any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="Any"
          />
        </div>
        <div className="item">
          <label htmlFor="location">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            name="minPrice"
            placeholder="Any"
          />
        </div>

        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input type="number" id="bedroom" name="bedroom" placeholder="Any" />
        </div>
        <button>
          <img src={assets.search} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Filter;
