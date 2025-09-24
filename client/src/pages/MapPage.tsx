import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  MapContainerProps,
  TileLayerProps,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import L from "leaflet";
import SplitText from "../components/ui/SplitText";

// Fix default marker icon
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Inline HeatmapLayer component using leaflet.heat
const HeatmapLayer = ({ points }: { points: [number, number, number][] }) => {
  const map = useMap();

  useState(() => {
    if (!map || points.length === 0) return;

    const layer = (L as any).heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    }).addTo(map);

    return () => {
      map.removeLayer(layer);
    };
  });

  return null;
};

const MapPage = () => {
  const [selectedType, setSelectedType] = useState<
    "OCEAN_DEBRIS" | "TSUNAMI_WARNING"
  >("OCEAN_DEBRIS");

  // Dummy points for testing
  const dummyHeatmapPoints: [number, number, number][] = [
    [20.5937, 78.9629, 1], // India
    [37.7749, -122.4194, 1], // San Francisco
    [51.5074, -0.1278, 1], // London
  ];

  const dummyMarkers = [
    {
      id: 1,
      lat: 20.5937,
      lng: 78.9629,
      type: "TSUNAMI_WARNING",
      description: "Dummy warning in India",
    },
    {
      id: 2,
      lat: 37.7749,
      lng: -122.4194,
      type: "TSUNAMI_WARNING",
      description: "Dummy warning in San Francisco",
    },
  ];

  const mapCenter: LatLngExpression = [20, 80];
  const mapProps: MapContainerProps = {
    center: mapCenter,
    zoom: 3,
    className: "h-[500px] w-full",
  };

  const tileLayerProps: TileLayerProps = {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>',
  };

  return (
    <div className="pt-24 p-8 max-w-6xl mx-auto bg-dark-bg min-h-screen">
      <SplitText
        text="Crisis Map"
        className="text-4xl md:text-5xl font-bold text-royal-gold mb-8"
        delay={80}
        duration={0.6}
        tag="h1"
        textAlign="center"
      />

      {/* Selection Buttons */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <label className="text-foreground font-medium">
          Select Data Layer:
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedType("OCEAN_DEBRIS")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover-elevate ${
              selectedType === "OCEAN_DEBRIS"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            Pollution Hotspots
          </button>
          <button
            onClick={() => setSelectedType("TSUNAMI_WARNING")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover-elevate ${
              selectedType === "TSUNAMI_WARNING"
                ? "bg-destructive text-destructive-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            Live Crisis Events
          </button>
        </div>
      </div>

      {/* Leaflet Map */}
      <div className="bg-card/50 border border-card-border rounded-lg overflow-hidden">
        <MapContainer {...mapProps}>
          <TileLayer {...tileLayerProps} />

          {selectedType === "OCEAN_DEBRIS" && dummyHeatmapPoints.length > 0 && (
            <HeatmapLayer points={dummyHeatmapPoints} />
          )}

          {selectedType === "TSUNAMI_WARNING" &&
            dummyMarkers.map((point) => (
              <Marker key={point.id} position={[point.lat, point.lng]}>
                <Popup>
                  <strong>{point.type.replace("_", " ")}</strong>
                  <br />
                  {point.description}
                  <br />
                  Lat: {point.lat.toFixed(4)}, Lng: {point.lng.toFixed(4)}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPage;
