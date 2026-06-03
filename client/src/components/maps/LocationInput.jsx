import usePlacesAutocomplete from "use-places-autocomplete";

function LocationInput({
  placeholder,
  onSelect,
}) {
  const {
    value,
    setValue,
    suggestions: {
      status,
      data,
    },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = (
    address
  ) => {
    setValue(address, false);

    clearSuggestions();

    onSelect(address);
  };

  return (
    <div className="relative">

      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          setValue(
            e.target.value
          )
        }
        className="
          w-full
          bg-zinc-900
          border border-yellow-500/10
          rounded-2xl
          px-6 py-5
          text-white
          outline-none
          focus:border-yellow-400
        "
      />

      {status === "OK" && (
        <div
          className="
            absolute
            w-full
            bg-zinc-950
            border border-yellow-500/10
            rounded-2xl
            mt-2
            z-50
          "
        >

          {data.map(
            ({
              place_id,
              description,
            }) => (
              <div
                key={place_id}
                onClick={() =>
                  handleSelect(
                    description
                  )
                }
                className="
                  px-5
                  py-4
                  cursor-pointer
                  hover:bg-zinc-800
                "
              >
                {description}
              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default LocationInput;