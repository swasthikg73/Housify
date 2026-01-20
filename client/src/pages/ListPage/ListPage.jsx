import "./ListPage.scss";
import { ListData } from "../../assets/assets.js";
import Filter from "../../components/Filter/Filter.jsx";
import Card from "../../components/Card/Card.jsx";
import Map from "../../components/Map/Map.jsx";

const ListPage = () => {
  const data = ListData;

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="list-wrapper">
          <Filter />

          {data.map((item) => (
            <Card key={item.id} card={item} />
          ))}
        </div>
      </div>
      <div className="mapContainer">
        <Map />
      </div>
    </div>
  );
};

export default ListPage;
