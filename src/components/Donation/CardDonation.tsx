import type { Donation } from "../../domain/interfaces/Donation.ts";
import { Link } from "react-router-dom";

import categories from "../../data/categories.ts";

interface CardDonationProps {
  donation: Donation;
  quantity?: number;
  bgColor?: string;
}

export const CardDonation = (props: CardDonationProps) => {
  const { title, description } = props.donation;


  const url = "http://localhost:3002/public/uploads/donation";
  return (
    <Link to={`/donation/${props.donation.id}`}>
      <div className="card border items-center text-center bg-gray-100 border-gray-200 rounded-lg flex flex-col w-48 h-96 md:w-56 lg:w-64 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:cursor-pointer flex-shrink-0">
        <figure className="relative w-full h-64">
          <div className="absolute top-2 left-2 badge badge-outline bg-orange-500 text-white border-0 font-semibold">
            {
              categories.find(
                (category) => category.id === props.donation.categoryId
              )?.title
            }
          </div>
          {props.donation.images && props.donation.images.length > 0 && (

            <img
              src={`${url}/${props.donation.images[0].imageUrl}`}
              alt={props.donation.title}
              className="w-full h-full object-cover rounded-t-lg"
            />
          )}
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p className="text-gray-600 line-clamp-1">{description}</p>
          <div className="card-actions justify-end">
            {props.donation.status === "Available" && props.donation.expiryDate ? (
              <div className="badge badge-outline text-red-500">
                Expires on {new Date(props.donation.expiryDate).toLocaleDateString()}
              </div>
            ) : (
              <div className="badge badge-outline">
                {props.donation.status}
              </div>
            )}
          </div>
          <button className="btn  bg-green-500 text-white">
            Claim
          </button>
        </div>
      </div>
    </Link>
  );
};
