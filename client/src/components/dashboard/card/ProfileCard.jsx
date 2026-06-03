import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCrown,
} from "react-icons/fa";

function ProfileCard() {

  return (
    <div
      className="
        bg-zinc-950
        border border-yellow-500/10

        rounded-3xl

        p-8
      "
    >

      {/* PROFILE */}
      <div className="flex items-center gap-5 mb-8">

        {/* AVATAR */}
        <div
          className="
            w-24 h-24

            rounded-full

            bg-yellow-400

            flex
            items-center
            justify-center

            text-black

            text-4xl
            font-black
          "
        >
          T
        </div>

        {/* DETAILS */}
        <div>

          <h2 className="text-3xl font-black">
            Tushant Verma
          </h2>

          <div
            className="
              inline-flex
              items-center
              gap-2

              bg-yellow-400/20
              text-yellow-400

              px-4 py-2

              rounded-full

              mt-3

              text-sm
              font-bold
            "
          >

            <FaCrown />

            Gold Member

          </div>

        </div>

      </div>

      {/* CONTACT */}
      <div className="space-y-5">

        <div className="flex items-center gap-4">

          <FaPhoneAlt className="text-yellow-400" />

          <span className="text-gray-300">
            +91 78190 92959
          </span>

        </div>

        <div className="flex items-center gap-4">

          <FaEnvelope className="text-yellow-400" />

          <span className="text-gray-300">
            tushant@example.com
          </span>

        </div>

        <div className="flex items-center gap-4">

          <FaMapMarkerAlt className="text-yellow-400" />

          <span className="text-gray-300">
            Mumbai, India
          </span>

        </div>

      </div>

    </div>
  );
}

export default ProfileCard;