export default async function handler(req, res) {
  const { lat, lng } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;

  if (!lat || !lng) {
    res.status(400).json({ error: "Invalid coordinates provided." });
    return;
  }

  try {
    // Fetch nearby food pantries using Google Places API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=food_pantry&key=${apiKey}`,
    );

    // Parse the JSON response
    const data = await response.json();

    // Add this line to log the raw response
    console.log("Places API response:", data);

    if (data.status !== "OK") {
      res.status(500).json({
        error: "Failed to fetch places. Check your API key and permissions.",
      });
      return;
    }

    // Map the results to the desired format
    const pantries = data.results.map((place) => ({
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      name: place.name,
    }));

    console.log("Pantries mapped:", pantries); // Log the processed data

    res.status(200).json(pantries);
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
