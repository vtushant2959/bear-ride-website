import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#1a1a2e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a2e" }] },
  { elementType: "labels.text.fill",   stylers: [{ color: "#9ca3af" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#27272a" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#374151" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#facc15" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f172a" }] },
];

function BookingMap({ pickup, drop }) {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const mapsLoaded = !!(window.google?.maps);

  const center = { lat: 28.6139, lng: 77.209 };

  useEffect(() => {
    if (!pickup || !drop || !mapsLoaded) { setDirections(null); return; }

    const svc = new window.google.maps.DirectionsService();
    svc.route(
      { origin: pickup, destination: drop, travelMode: window.google.maps.TravelMode.DRIVING },
      (result, status) => {
        if (status === "OK") { setDirections(result); setError(null); }
        else { setError("Could not find route between these locations."); }
      }
    );
  }, [pickup, drop, mapsLoaded]);

  /* ── No API key / Maps not loaded ── */
  if (!mapsLoaded) {
    return (
      <div className="h-[420px] bg-zinc-900 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80"
            alt="Map"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-zinc-900/50" />
        </div>
        <div className="relative z-10 text-center">
          <div className="text-yellow-400 text-5xl mb-4">🗺️</div>
          {pickup && drop ? (
            <>
              <p className="text-white font-black text-xl mb-2">Route Preview</p>
              <div className="flex flex-col gap-2 text-sm text-gray-300 bg-black/50 rounded-2xl px-6 py-4 border border-yellow-500/20">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-400 rounded-full" />
                  <span>{pickup}</span>
                </div>
                <div className="h-5 border-l-2 border-dashed border-yellow-500/30 ml-1.5" />
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-red-400" />
                  <span>{drop}</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-4">Live map requires Google Maps API key</p>
            </>
          ) : (
            <>
              <p className="text-white font-bold text-lg">Interactive Map</p>
              <p className="text-gray-400 text-sm mt-2">Enter pickup & destination to see your route</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "420px" }}
        center={center}
        zoom={12}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: MAP_STYLES,
        }}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        {!directions && <Marker position={center} />}
      </GoogleMap>
      {error && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 border border-red-500/20 text-red-400 text-sm px-5 py-3 rounded-xl">
          {error}
        </div>
      )}
    </div>
  );
}

export default BookingMap;
