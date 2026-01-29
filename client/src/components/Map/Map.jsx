import "./Map.scss";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "../Pin/Pin";
import { ListData } from "../../assets/assets.js";

const Map = ({ items }) => {
  return (
    <div className="map">
      <MapContainer center={[51.505, -0.09]} zoom={7} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {items && <Pin item={items} />}

        {!items && ListData.map((item) => <Pin key={item.id} item={item} />)}
      </MapContainer>
    </div>
  );
};

export default Map;
