import type { Category } from "../../domain/interfaces/Category";
import { Link } from "react-router";
import { DynamicIcon } from "../Main/DynamicIcon";

interface CardCategoryProps {
  category: Category;
  quantity?: number;
  bgColor?: string;
}

export const CardCategory = (props: CardCategoryProps) => {
  const { title, icon } = props.category;

  return (
    <Link
      to={`/donationSearch?search=&category=${title.toLowerCase()}&distance=100`}
    >
      <div className="group relative flex flex-col items-center w-48 md:w-56 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-green-400 transition-all duration-300 ease-in-out hover:scale-[1.04] cursor-pointer">
        
        {/* Decorative subtle background ring */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Icon container */}
        <div
          className={`relative z-10 w-20 h-20 flex items-center justify-center rounded-xl mb-4 p-4 ${props.bgColor} text-white shadow-md transition-transform duration-300 group-hover:rotate-3`}
        >
          <DynamicIcon name={icon} size={40} />
        </div>
        
        {/* Card body */}
        <div className="relative z-10 text-center">
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
            {title}
          </h2>
          <p className="mt-1 text-gray-500 text-sm">{props.quantity} Items</p>
        </div>
      </div>
    </Link>
  );
};
