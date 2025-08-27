import type { Category } from "../../domain/interfaces/Category";
import {Link} from "react-router";

import { DynamicIcon } from "../Main/DynamicIcon";

interface CardCategoryProps {
  category: Category;
  quantity?: number;
  bgColor?: string;
}



export const CardCategory = (props: CardCategoryProps) => {
  const { title, icon } = props.category;

  return (
    <Link to={`/donationSearch?query=${title.toLowerCase()}`}>
      <div className="card border border-gray-200 rounded-lg flex flex-col w-48 md:w-56 p-5 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:cursor-pointer flex-shrink-0">
        <div
          className={`w-24 h-24 mx-auto rounded-xl flex items-center justify-center mb-1 p-1 ${props.bgColor}`}>
          <DynamicIcon name={icon} size={32} />
        </div>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-base">{title}</h2>
          <p className="text-gray-600 text-sm">{props.quantity} Items</p>
        </div>
      </div>
    </Link>
  );
};
