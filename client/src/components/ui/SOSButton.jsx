import { useState } from "react";
import { FaExclamationTriangle, FaTimes, FaPhone, FaMapMarkerAlt, FaShare } from "react-icons/fa";
import toast from "react-hot-toast";

export default function SOSButton() {
  const [open, setOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    setLocating(true);
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      () => { toast.error("Location access denied"); setLocating(false); }
    );
  };

  const shareLocation = () => {
    if (!location) { getLocation(); return; }
    const url = `https://maps.google.com/?q=${location.lat},${location.lng}`;
    if (navigator.share) {
      navigator.share({ title: "🚨 BearRide SOS", text: "I need help! My location:", url });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Location link copied!");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[150] w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:scale-110 transition-all animate-pulse"
        title="Emergency SOS"
      >
        <FaExclamationTriangle className="text-xl" />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center px-4">
          <div className="bg-zinc-950 border border-red-500/40 rounded-3xl p-8 w-full max-w-sm relative">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><FaTimes /></button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaExclamationTriangle className="text-3xl text-red-400" />
              </div>
              <h2 className="text-2xl font-black text-red-400">Emergency SOS</h2>
              <p className="text-gray-400 text-sm mt-2">Get help immediately</p>
            </div>

            <div className="space-y-3">
              <a
                href="tel:112"
                className="flex items-center gap-4 bg-red-500 text-white px-6 py-4 rounded-2xl font-black hover:bg-red-400 transition-all"
              >
                <FaPhone /> Call 112 — Emergency
              </a>

              <a
                href="tel:100"
                className="flex items-center gap-4 bg-red-500/20 text-red-400 border border-red-500/30 px-6 py-4 rounded-2xl font-bold hover:bg-red-500/30 transition-all"
              >
                <FaPhone /> Call 100 — Police
              </a>

              <button
                onClick={shareLocation}
                disabled={locating}
                className="flex items-center gap-4 w-full bg-yellow-400/10 text-yellow-400 border border-yellow-500/20 px-6 py-4 rounded-2xl font-bold hover:bg-yellow-400/20 transition-all"
              >
                <FaMapMarkerAlt /> {locating ? "Getting location..." : "Share My Location"}
              </button>
            </div>

            {location && (
              <p className="text-green-400 text-xs text-center mt-4">
                📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
