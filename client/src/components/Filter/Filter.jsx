import "./Filter.scss";
import { assets } from "../../assets/assets.js";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest.js";
import { Link, useSearchParams } from "react-router-dom";

const Filter = () => {
  const [params, setParams] = useSearchParams();

  const [query, setQuery] = useState({
    city: params.get("city") || "",
    type: params.get("type") || "",
    property: params.get("property") || "",
    minPrice: params.get("minPrice") || "",
    maxPrice: params.get("maxPrice") || "",
    bedroom: params.get("bedroom") || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
    //Brackets only needed for dynamic keys, Use [] when key comes from a variable.
    // console.log(query.city);  works ;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Here query is an Object
    // Params must be String only
    // need to convert Object into String
    // const query2 = new URLSearchParams(query).toString(); or we can use below Axios method

    const res = await apiRequest.get("/post/?", { params: query });
  };

  return (
    <div className="filter">
      {query?.city && (
        <p className="location-title">
          Search results for <b>{query.city}</b>
        </p>
      )}

      <div className="top">
        <div className="item">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter City"
            onChange={handleChange}
            value={query.city}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            onChange={handleChange}
            value={query.type}>
            <option value="">Any</option>
            <option value="buy" name="buy">
              Buy
            </option>
            <option value="rent" name="rent">
              Rent
            </option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select
            id="property"
            name="property"
            onChange={handleChange}
            value={query.property}>
            <option value="">Any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="Any"
            onChange={handleChange}
            value={query.minPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="location">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="Any"
            onChange={handleChange}
            value={query.maxPrice}
          />
        </div>

        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            type="number"
            id="bedroom"
            name="bedroom"
            placeholder="Any"
            onChange={handleChange}
            value={query.bedroom}
          />
        </div>
        <Link
          to={`/list/?city=${query.city}&type=${query.type}&property=${query.property}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&bedroom=${query.bedroom}`}>
          <button>
            <img src={assets.search} alt="" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Filter;
