import "./Searchbar.scss";
import { assets } from "../../assets/assets.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    console.log(query);

    const urlParams = new URLSearchParams(query).toString();
    navigate("/list/?" + urlParams);
  };

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}>
            {type}
          </button>
        ))}
      </div>
      <form>
        <input
          type="text"
          name="city"
          placeholder="Enter City"
          onChange={(e) =>
            setQuery((prev) => ({
              ...prev,
              city: e.target.value,
            }))
          }
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={(e) =>
            setQuery((prev) => ({ ...prev, minPrice: e.target.value }))
          }
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          onChange={(e) =>
            setQuery((prev) => ({ ...prev, maxPrice: e.target.value }))
          }
        />
        <button onClick={handleClick}>
          <img src={assets.search} alt="" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
