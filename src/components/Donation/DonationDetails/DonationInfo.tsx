import { Heart, Share2, MapPin, MessageCircle, Star } from "lucide-react";
import type { Donation } from "../../../domain/interfaces/Donation";

interface DonationInfoProps {
  donation: Donation;
  donationSaved: boolean,
  setDonationSaved: (x: boolean) => void,
  copyUrl: () => void,
  direction: string
}

export const DonationInfo = ({ donation, donationSaved, setDonationSaved, copyUrl, direction }: DonationInfoProps) => {

  const user = {
    id: "u123",
    name: "Carlos Ramírez",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.7,
    donations: 85,
    joined: "March 2023",
  };


  return (
    <>
      <div className="card bg-base-100 w-90 shadow-sm md:min-w-2xl">
        <figure>
          <img src={donation.imageUrl} alt={`Image of ${donation.title}`} />
        </figure>
        <div className="card-body">
          <div className=" card-actions justify-end gap-5">
            <Heart
              size={16}
              className={`cursor-pointer rounded-lg transition duration-200 
              ${donationSaved ? "text-red-500 hover:text-red-600" : "text-gray hover:text-black"}`}
              fill={donationSaved ? "currentColor" : "none"}
              onClick={() => setDonationSaved(!donationSaved)}
            />
            <Share2
              size={16}
              className="text-gray cursor-pointer hover:text-black"
              onClick={() => copyUrl()}
            />
          </div>
          <h2 className="card-title mt-4">{donation.title}</h2>
          <p>{donation.description}</p>
          <p className="flex gap-1 items-center text-xs text-[#d9fa1] mt-4">
            <MapPin size={16} />
            {direction}
          </p>
          <p className="font-bold mt-4">Donated by</p>
          <div className="flex gap-2">
            <img
              src="src\assets\user-icono.png"
              alt="user icon"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-bold">{user.name}</p>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.round(user.rating) ? "star fill-yellow-400" : "star"}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex mt-4 gap-3">
            <button className="btn btn-primary hover:btn-secondary active:btn-accent px-10">
              {" "}
              <MessageCircle size={15} />
              Contact Dono
            </button>
            <button className="btn"> View on Map</button>
          </div>
        </div>
      </div>
    </>
  );
};
