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
