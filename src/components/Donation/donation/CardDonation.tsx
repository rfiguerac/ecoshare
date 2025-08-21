import { Link } from "react-router-dom";
import categories from "../../../data/categories.ts";
import type { Donation } from "../../../domain/interfaces/Donation.ts";

interface CardDonationProps {
  donation: Donation;
  quantity?: number;
  bgColor?: string;
}

export const CardDonation = (props: CardDonationProps) => {
  const { title, description, state } = props.donation;
  return (
    <div
      className="card border items-center text-center bg-gray-100 border-gray-200 rounded-lg flex flex-col w-48 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:cursor-pointer flex-shrink-0
            sm:w-60 md:w-64 lg:w-72">
      <figure className="relative w-full h-40 md:h-48">
        <div className="absolute top-2 left-2 badge badge-outline bg-orange-500 text-white border-0 font-semibold z-10 text-xs md:text-sm">
          {
            categories.find(
              (category) => category.idCategory === props.donation.idCategory
            )?.title
          }
        </div>
        <img
          src={props.donation.imageUrl}
          alt={props.donation.imageUrl}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </figure>
      <div className="card-body items-center text-center p-3 md:p-4 w-full">
        <h2 className="card-title text-base md:text-lg font-bold truncate w-full">
          {title}
        </h2>
        <p className="text-gray-600 text-sm md:text-base line-clamp-3">
          {description}
        </p>
        <div className="card-actions justify-center mt-2 w-full">
          <div className="badge badge-outline text-xs md:text-sm">{state}</div>
        </div>
        <Link to={`/donation/${props.donation.id}`} className="mt-4 w-full">
          <button className="btn w-full bg-[#03C755] text-white border-[#00b544] hover:bg-[#00b544] text-sm md:text-base">
            Claim Item
          </button>
        </Link>
      </div>
    </div>
  );
};
