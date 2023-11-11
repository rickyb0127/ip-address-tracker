import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

function MapView(props) {
  const {location} = props;

  function ChangeView({ location }) {
    const map = useMap();
    map.setView(location, map.getZoom());
    return null;
  };

  return (
    <MapContainer id="map" center={location} zoom={13} scrollWheelZoom={false}>
      <ChangeView location={location} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={location}>
        <Popup>
          You are here!
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapView;