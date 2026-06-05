import { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import { submitRating } from "../../services/featureService";
import toast from "react-hot-toast";

export default function RatingModal({ booking, onClose, onDone }) {
  const [stars, setStars]   = useState(0);
  const [hover, setHover]   = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!stars) { toast.error("Please select a rating"); return; }
    try {
      setLoading(true);
      await submitRating({ bookingId: booking.id, rating: stars, comment });
      toast.success("Rating submitted! Thank you.");
      onDone?.();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit rating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center px-4">
      <div className="bg-zinc-950 border border-yellow-500/20 rounded-3xl p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-white"><FaTimes /></button>

        <div className="text-center mb-6">
          <p className="text-gray-400 text-sm mb-1">Rate your ride</p>
          <h2 className="text-2xl font-black">How was your experience?</h2>
          {booking?.driver && (
            <div className="flex items-center justify-center gap-3 mt-4">
              {booking.driver.profilePhoto ? (
                <img src={booking.driver.profilePhoto} className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black font-black">
                  {booking.driver.fullName?.charAt(0)}
                </div>
              )}
              <p className="font-bold">{booking.driver.fullName}</p>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {[1,2,3,4,5].map((s) => (
            <button
              key={s}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setStars(s)}
              className={`text-4xl transition-all ${s <= (hover || stars) ? "text-yellow-400 scale-110" : "text-gray-700"}`}
            >
              <FaStar />
            </button>
          ))}
        </div>

        <textarea
          rows={3}
          placeholder="Leave a comment (optional)..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-black border border-yellow-500/20 rounded-2xl px-4 py-3 text-white outline-none focus:border-yellow-400 resize-none text-sm mb-5"
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !stars}
          className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-black hover:scale-[1.02] transition-all disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Rating"}
        </button>
      </div>
    </div>
  );
}
