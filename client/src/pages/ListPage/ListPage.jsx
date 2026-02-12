import "./ListPage.scss";
import Filter from "../../components/Filter/Filter.jsx";
import Card from "../../components/Card/Card.jsx";
import Map from "../../components/Map/Map.jsx";
import { useLoaderData } from "react-router-dom";

const ListPage = () => {
  const datas = useLoaderData();
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="list-wrapper">
          <Filter />

          {datas.map((item) => (
            <Card key={item.id} card={item} />
          ))}

          {datas.length == 0 && <h1>Sorry.. No results found!</h1>}
        </div>
      </div>
      <div className="mapContainer">
        {datas.length > 0 && <Map items={datas} />}
      </div>
    </div>
  );
};

export default ListPage;
