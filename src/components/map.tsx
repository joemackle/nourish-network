import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const defaultMapContainerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "15px 0px 0px 15px",
};

const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "roadmap",
};

const MapComponent = ({ zip }: { zip: string }) => {
  const [center, setCenter] = useState({ lat: 29.6111, lng: -82.3722 }); // Center to Gainesville, FL (32608 region)
  const [error, setError] = useState<string | null>(null);
  const zoomLevel = 12;

  // Hardcoded markers in the 32608 region
  const hardcodedMarkers = [
    { lat: 29.6185, lng: -82.3771, name: "Gainesville Community Pantry" },
    { lat: 29.6059, lng: -82.3556, name: "Bread of the Mighty Food Bank" },
    { lat: 29.6197, lng: -82.3412, name: "St. Francis House" },
    { lat: 29.6334, lng: -82.3729, name: "Grace Marketplace" },
    { lat: 29.6024, lng: -82.3806, name: "Catholic Charities Bureau" },
  ];

  useEffect(() => {
    if (zip.match(/^\d{5}$/)) {
      setError(null);
      // In this example, we are hardcoding the map center to 32608 area
      setCenter({ lat: 29.6111, lng: -82.3722 });
    } else if (zip.length > 0) {
      setError("Please enter a valid 5-digit ZIP code.");
    }
  }, [zip]);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}>
        <GoogleMap
          mapContainerStyle={defaultMapContainerStyle}
          center={center}
          zoom={zoomLevel}
          options={defaultMapOptions}
        >
          {/* Render hardcoded markers */}
          {hardcodedMarkers.map((pantry, index) => (
            <Marker
              key={index}
              position={{ lat: pantry.lat, lng: pantry.lng }}
              title={pantry.name}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-pushpin.png",
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export { MapComponent };
