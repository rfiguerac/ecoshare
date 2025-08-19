import { Heart, Share2, MapPin, MessageCircle, Star } from "lucide-react";
import type { Donation } from "../../domain/interfaces/Donation";

interface DonationInfoProps {
  donation: Donation;
}

export const DonationInfo = ({ donation }: DonationInfoProps) => {
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
              className="text-gray-500 cursor-pointer rounded-lg transition duration-200 hover:text-black"
            />
            <Share2
              size={16}
              className="text-gray-500 cursor-pointer hover:text-black"
            />
          </div>
          <h2 className="card-title mt-4">{donation.title}</h2>
          <p className="text-[#d9fa1]">{donation.description}</p>
          <p className="flex gap-1 items-center text-xs text-[#d9fa1] mt-4">
            <MapPin size={16} />{" "}
          </p>
          <p className="font-bold mt-4">Donated by</p>
          <div className="flex gap-2">
            <img
              src="src\assets\user-icono.png"
              alt="user icon"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-bold">Maria Gonzáles</p>
              <div className="flex">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          </div>
          <div className="flex mt-4 gap-3">
            <button className="btn bg-[#28A745] text-white hover:bg-[#218838] px-10">
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
