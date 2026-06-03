import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

import {
  useEffect,
  useState,
} from "react";

function BookingMap({
  pickup,
  drop,
}) {
  const [directions, setDirections] =
    useState(null);

  const center = {
    lat: 28.6139,
    lng: 77.209,
  };

  useEffect(() => {
    if (!pickup || !drop) {
      setDirections(null);
      return;
    }

    const directionsService =
      new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: pickup,
        destination: drop,

        travelMode:
          window.google.maps.TravelMode.DRIVING,
      },

      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        }
      }
    );
  }, [pickup, drop]);

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "500px",
      }}
      center={center}
      zoom={12}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {/* ROUTE */}

      {directions && (
        <DirectionsRenderer
          directions={directions}
        />
      )}

      {/* DEFAULT CENTER MARKER */}

      {!directions && (
        <Marker position={center} />
      )}
    </GoogleMap>
  );
}

export default BookingMap;