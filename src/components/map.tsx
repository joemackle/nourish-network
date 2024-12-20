import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface MarkerData {
  lat: number;
  lng: number;
  name: string;
}

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
  const [center, setCenter] = useState({ lat: 35.8799866, lng: 76.5048004 });
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  //const [markers, setMarkers] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const zoomLevel = 12;

  useEffect(() => {
    const fetchCoordinatesAndPantries = async () => {
      if (!zip.match(/^\d{5}$/)) {
        setError("Please enter a valid 5-digit ZIP code.");
        return;
      }

      setError(null); // Reset error message
      try {
        // Fetch geocoding data
        const geoResponse = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`,
        );
        const geoData = await geoResponse.json();

        if (geoData.results && geoData.results.length > 0) {
          const location = geoData.results[0].geometry.location;
          setCenter(location); // Update map center with the ZIP code's location

          // Fetch nearby pantries
          const pantriesResponse = await fetch(
            `/api/pantries?lat=${location.lat}&lng=${location.lng}`,
          );
          const pantries = await pantriesResponse.json();

          // Update markers state
          setMarkers(pantries);

          if (pantries.length === 0) {
            setError("No food pantries found near this ZIP code.");
          }
        } else {
          setError("Invalid ZIP code. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("");
      }
    };

    fetchCoordinatesAndPantries();
  }, [zip]);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {process.env.NEXT_PUBLIC_GOOGLE_MAP_API ? (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API}>
          <GoogleMap
            mapContainerStyle={defaultMapContainerStyle}
            center={center}
            zoom={zoomLevel}
            options={defaultMapOptions}
          >
            {/* Render markers */}
            {markers.map((pantry: MarkerData, index) => (
              <Marker
                key={index}
                position={{ lat: pantry.lat, lng: pantry.lng }}
                title={pantry.name}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      ) : (
        <p className="text-red-500">Google Maps API key is missing.</p>
      )}
    </div>
  );
};

export { MapComponent };
