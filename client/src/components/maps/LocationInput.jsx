import usePlacesAutocomplete from "use-places-autocomplete";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";

function LocationInput({ placeholder, onSelect, icon, value: externalValue }) {
  const mapsLoaded = !!(window.google?.maps?.places);

  const {
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  const handleSelect = (address) => {
    setValue(address, false);
    clearSuggestions();
    onSelect(address);
  };

  const handleClear = () => {
    setValue("");
    clearSuggestions();
    onSelect("");
  };

  /* ── Plain text input when Maps API not loaded ── */
  if (!mapsLoaded) {
    return (
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400">
          {icon || <FaMapMarkerAlt />}
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={externalValue || ""}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full bg-zinc-900 border border-yellow-500/10 rounded-2xl pl-12 pr-5 py-4 text-white outline-none focus:border-yellow-400 transition-all"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400 z-10">
        {icon || <FaMapMarkerAlt />}
      </div>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-zinc-900 border border-yellow-500/10 rounded-2xl pl-12 pr-10 py-4 text-white outline-none focus:border-yellow-400 transition-all"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-all"
        >
          <FaTimes />
        </button>
      )}

      {status === "OK" && (
        <div className="absolute w-full bg-zinc-900 border border-yellow-500/20 rounded-2xl mt-2 z-50 overflow-hidden shadow-xl">
          {data.map(({ place_id, description }) => (
            <div
              key={place_id}
              onClick={() => handleSelect(description)}
              className="flex items-start gap-3 px-5 py-4 cursor-pointer hover:bg-zinc-800 transition-all border-b border-yellow-500/5 last:border-0"
            >
              <FaMapMarkerAlt className="text-yellow-400 mt-0.5 flex-shrink-0 text-sm" />
              <span className="text-gray-300 text-sm leading-6">{description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationInput;
