import "./Map.scss";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "../Pin/Pin";
import { ListData } from "../../assets/assets.js";

const Map = ({ items }) => {
  // console.log("----------------------------------------------------");
  // console.log("items :", items);

  // console.log(items.length);

  // console.log("----------------------------------------------------");

  return (
    <div className="map">
      <MapContainer
        center={
          items ? [items[0]?.latitude, items[0]?.longitude] : [12.9629, 77.5775]
        }
        zoom={8}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {items?.length === 1 && <Pin item={items[0]} />}

        {items?.length > 1 &&
          items?.map((item) => <Pin key={item?.id} item={item} />)}
      </MapContainer>
    </div>
  );
};

export default Map;
