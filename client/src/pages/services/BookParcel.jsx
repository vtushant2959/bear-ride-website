import DashboardLayout from "../../components/dashboard/layout/DashboardLayout";
import {
  FaBox,
  FaTruck,
  FaMapMarkerAlt,
  FaShieldAlt,
} from "react-icons/fa";

function BookParcel() {
  return (
    <DashboardLayout>
      <div>
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-5xl font-black mb-3">
            Send Parcel
          </h1>

          <p className="text-gray-400 text-lg">
            Fast, secure and affordable parcel delivery across India.
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">
          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <FaBox className="text-4xl text-yellow-400 mb-4" />
            <h3 className="text-4xl font-black">12K+</h3>
            <p className="text-gray-400 mt-2">
              Deliveries Completed
            </p>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <FaTruck className="text-4xl text-green-400 mb-4" />
            <h3 className="text-4xl font-black">850+</h3>
            <p className="text-gray-400 mt-2">
              Delivery Partners
            </p>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <FaMapMarkerAlt className="text-4xl text-blue-400 mb-4" />
            <h3 className="text-4xl font-black">300+</h3>
            <p className="text-gray-400 mt-2">
              Cities Covered
            </p>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <FaShieldAlt className="text-4xl text-purple-400 mb-4" />
            <h3 className="text-4xl font-black">99.8%</h3>
            <p className="text-gray-400 mt-2">
              Safe Deliveries
            </p>
          </div>
        </div>

        {/* BOOKING FORM */}
        <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10 mb-10">
          <h2 className="text-3xl font-black mb-8">
            Parcel Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              placeholder="Pickup Address"
              className="p-5 rounded-2xl bg-black border border-yellow-500/10 outline-none"
            />

            <input
              placeholder="Delivery Address"
              className="p-5 rounded-2xl bg-black border border-yellow-500/10 outline-none"
            />

            <input
              placeholder="Sender Name"
              className="p-5 rounded-2xl bg-black border border-yellow-500/10 outline-none"
            />

            <input
              placeholder="Sender Phone"
              className="p-5 rounded-2xl bg-black border border-yellow-500/10 outline-none"
            />

            <input
              placeholder="Receiver Name"
              className="p-5 rounded-2xl bg-black border border-yellow-500/10 outline-none"
            />

            <input
              placeholder="Receiver Phone"
              className="p-5 rounded-2xl bg-black border border-yellow-500/10 outline-none"
            />
          </div>

          <textarea
            rows="5"
            placeholder="Parcel Description"
            className="
              w-full
              mt-6
              p-5
              rounded-2xl
              bg-black
              border border-yellow-500/10
              outline-none
            "
          />
        </div>

        {/* PACKAGE TYPE */}
        <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10 mb-10">
          <h2 className="text-3xl font-black mb-6">
            Package Type
          </h2>

          <div className="grid md:grid-cols-4 gap-5">
            <button className="bg-yellow-400 text-black p-5 rounded-2xl font-bold">
              Documents
            </button>

            <button className="bg-black p-5 rounded-2xl">
              Electronics
            </button>

            <button className="bg-black p-5 rounded-2xl">
              Clothing
            </button>

            <button className="bg-black p-5 rounded-2xl">
              Other
            </button>
          </div>
        </div>

        {/* WEIGHT + DELIVERY SPEED */}
        <div className="grid xl:grid-cols-2 gap-10 mb-10">
          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <h2 className="text-2xl font-black mb-6">
              Package Weight
            </h2>

            <select className="w-full p-5 rounded-2xl bg-black">
              <option>Below 1 Kg</option>
              <option>1 - 5 Kg</option>
              <option>5 - 10 Kg</option>
              <option>10 - 20 Kg</option>
              <option>20+ Kg</option>
            </select>
          </div>

          <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10">
            <h2 className="text-2xl font-black mb-6">
              Delivery Speed
            </h2>

            <select className="w-full p-5 rounded-2xl bg-black">
              <option>Express (Same Day)</option>
              <option>Standard (1-2 Days)</option>
              <option>Economy (3-5 Days)</option>
            </select>
          </div>
        </div>

        {/* PRICE SUMMARY */}
        <div className="bg-zinc-950 p-8 rounded-3xl border border-yellow-500/10 mb-10">
          <h2 className="text-3xl font-black mb-6">
            Delivery Summary
          </h2>

          <div className="space-y-4 text-lg">
            <div className="flex justify-between">
              <span>Distance</span>
              <span>12 Km</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span>₹120</span>
            </div>

            <div className="flex justify-between">
              <span>Insurance</span>
              <span>₹20</span>
            </div>

            <div className="flex justify-between text-yellow-400 text-2xl font-black pt-4 border-t border-yellow-500/10">
              <span>Total</span>
              <span>₹140</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-5">
          <button
            className="
              bg-yellow-400
              text-black
              px-10
              py-5
              rounded-2xl
              font-black
              text-lg
            "
          >
            Book Parcel Delivery
          </button>

          <button
            className="
              bg-zinc-950
              border border-yellow-500/10
              px-10
              py-5
              rounded-2xl
              font-bold
            "
          >
            Calculate Fare
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default BookParcel;