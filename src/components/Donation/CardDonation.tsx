import { useCategoryStore } from "../../store/CategoryStore";
import type { Donation } from "../../domain/interfaces/Donation.ts";
import { Link } from "react-router-dom";

interface CardDonationProps {
  donation: Donation;
  quantity?: number;
  bgColor?: string;
}

export const CardDonation = (props: CardDonationProps) => {
  const { title, description } = props.donation;
  const { categories } = useCategoryStore();

  const url = "http://localhost:3002/public/uploads/donation";

  return (
    <Link to={`/donation/${props.donation.id}`}>
      <div className="group border border-gray-200 bg-white rounded-2xl flex flex-col w-48 h-96 md:w-56 lg:w-64 shadow-sm hover:shadow-lg hover:border-green-400 transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer flex-shrink-0">
        
        {/* Image + Category */}
        <figure className="relative w-full h-56 overflow-hidden rounded-t-2xl">
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            {
              categories.find(
                (category) => category.id === props.donation.categoryId
              )?.title
            }
          </div>
          {props.donation.images && props.donation.images.length > 0 && (
            <img
              src={`${url}/${props.donation.images[0].imageUrl}`}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
        </figure>

        {/* Body */}
        <div className="flex flex-col items-center text-center px-4 py-3 flex-1">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300 line-clamp-1">
            {title}
          </h2>
          <p className="text-gray-500 text-sm line-clamp-2 mt-1">
            {description}
          </p>

          {/* Status / Expiry */}
          <div className="mt-3">
            {props.donation.status === "Available" && props.donation.expiryDate ? (
              <div className="text-xs font-medium text-red-500 bg-red-100 px-3 py-1 rounded-full">
                Expires on {new Date(props.donation.expiryDate).toLocaleDateString()}
              </div>
            ) : (
              <div className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {props.donation.status}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <button className="mt-4 w-full py-2 rounded-full bg-green-500 text-white font-medium transition-colors duration-300 hover:bg-green-600">
            Claim
          </button>
        </div>
      </div>
    </Link>
  );
};
