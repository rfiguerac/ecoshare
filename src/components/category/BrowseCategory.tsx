import type { Category } from "../../domain/interfaces/Category";
import { MainCard } from "../Main/MainCard";
import { CardCategory } from "./CardCategory";

const BrowseCategory = () => {
  const categories: Category[] = [
    { id: 1, title: "Food", icon: "Pizza" },
    { id: 2, title: "Clothes", icon: "Shirt" },
    { id: 3, title: "Furniture", icon: "Bed" },
    { id: 4, title: "Books", icon: "Book" },
    { id: 5, title: "Toys", icon: "Gamepad2" },
    { id: 6, title: "Electronics", icon: "Computer" },
  ];

  const colors = [
    "bg-green-400",
    "bg-orange-400",
    "bg-blue-400",
    "bg-purple-400",
    "bg-yellow-400",
    "bg-red-400",
  ];
  const category = categories.map((categoryItem, index) => {
    const color = colors[index % colors.length];
    return (
      <CardCategory
        category={categoryItem}
        quantity={1024}
        bgColor={color}
        key={categoryItem.id}
      />
    );
  });

  return (
    <MainCard
      title="Browse Categories"
      description="Find exactly what you need discover something unexpected. Every category helps reduce waste and build communities.">
      {category}
    </MainCard>
  );
};

export default BrowseCategory;
import type { Category } from "../../domain/interfaces/Category";
import {Link} from "react-router";

import { DynamicIcon } from "../Main/DynamicIcon";

interface CardCategoryProps {
  category: Category;
  quantity?: number;
  bgColor?: string;
}


// filter category based on category clicked
export const CardCategory = (props: CardCategoryProps) => {
  const { title, icon } = props.category;

  return (
    <Link to={`/donationSearch?query=${title.toLowerCase()}`}>
    <div className="card border border-gray-200 rounded-lg flex flex-col w-48 md:w-56 p-4 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:cursor-pointer flex-shrink-0">
      <div
        className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-1 p-1 ${props.bgColor}`}>
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
