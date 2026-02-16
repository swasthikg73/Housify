import "./Map.scss";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "../Pin/Pin";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map = ({ items }) => {
  return (
    <div className="map">
      <MapContainer
        center={
          items ? [items[0]?.latitude, items[0]?.longitude] : [12.9629, 77.5775]
        }
        zoom={7}
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
