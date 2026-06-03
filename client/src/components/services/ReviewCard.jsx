import { FaStar } from "react-icons/fa";

function ReviewCard({
  name,
  rating,
  review,
}) {
  return (
    <div
      className="
        bg-zinc-950

        border border-yellow-500/10

        rounded-3xl

        p-8
      "
    >

      <div
        className="
          flex
          items-center
          gap-2

          mb-4
        "
      >
        {[...Array(rating)].map(
          (_, index) => (
            <FaStar
              key={index}
              className="text-yellow-400"
            />
          )
        )}
      </div>

      <p className="text-gray-300 mb-5">
        "{review}"
      </p>

      <h3 className="font-bold">
        {name}
      </h3>

    </div>
  );
}

export default ReviewCard;