import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { ImLocation } from "react-icons/im";
import {
  FaBath,
  FaBed,
  FaCar,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [copied, setCopied] = useState(false);
  const params = useParams();

  //console.log(listing);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);

        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center mt-20 my-7 text-2xl">Something Went Wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className="">
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[300px] sm:h-[550px]"
                  style={{
                    background: `url(${url}) 
                    center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-6 sm:w-12 h-6 sm:h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500 text-xs sm:text-base"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2 text-xs sm:text-base">
              Link copied!
            </p>
          )}

          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-base sm:text-2xl font-semibold ">
              {listing.name} - Rs.{' '}
              {listing.offer
                ? listing.discountedPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>

            <div className="flex items-center mt-6 gap-2 text-slate-600 text-xs sm:text-base">
              <FaMapMarkerAlt className="text-green-700" />
              <p className="">{listing.address}</p>
            </div>

            <div className="flex gap-4">
              <p
                className="bg-red-900 w-full max-w-[200px] 
              text-white text-center p-2 rounded-md "
              >
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p
                  className="bg-green-900 w-full max-w-[200px] 
                  text-white text-center p-2 rounded-md"
                >
                  Rs.{(+listing.regularPrice - +listing.discountedPrice).toLocaleString("en-US")} OFF
                </p>
              )}
            </div>

            <p className="text-slate-800 my-4 text-xs sm:text-base">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>

            <ul className="text-green-900 font-semibold text-xs sm:text-base flex flex-wrap item-center gap-4 sm:gap-8">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg " />
                {listing.bedrooms}
                {listing.bedrooms > 1 ? " bedrooms" : " bedroom"}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg " />
                {listing.bathrooms}
                {listing.bathrooms > 1 ? " bathrooms" : " bathroom"}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaCar className="text-lg " />
                {listing.parking ? "Parking Spot" : "No Parking"}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg " />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 mt-2"
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}

            {currentUser && listing.userRef === currentUser._id && (
              // <Link to={`/update-listing/${listing._id}`}>
              <button 
              onClick={() => navigate(`/update-listing/${listing._id}`)}
              className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 mt-2">Edit Listing</button>
              // </Link>
            )}

          </div>
        </div>
      )}
    </main>
  );
}
