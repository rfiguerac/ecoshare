import type { Donation } from "../../domain/interfaces/Donation";
import { useCategoryStore } from "../../store/CategoryStore";
import { MainCard } from "../Main/MainCard";
import { CardCategory } from "./CardCategory";
import { useDonationStore } from "../../store/DonationStore";

const BrowseCategory = () => {
  const { categories } = useCategoryStore();
  const { donationPagination } = useDonationStore();



  const colors = [
    "bg-green-400",
    "bg-orange-400",
    "bg-blue-400",
    "bg-purple-400",
    "bg-yellow-400",
    "bg-red-400",
    "bg-pink-400",
    "bg-teal-400",
    "bg-indigo-400",
    "bg-lime-400",
    "bg-amber-400",
    "bg-cyan-400",
    "bg-fuchsia-400",
    "bg-rose-400",
    "bg-sky-400",
    "bg-emerald-400",
    "bg-violet-400",
  ];

  // We need to ensure donations is an array before we use reduce
  const donationCounts = (donationPagination.data || []).reduce((acc, donation: Donation) => {
    acc[donation.categoryId] = (acc[donation.categoryId] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);



  
  
  const category = categories.map((categoryItem, index) => {
    const color = colors[index % colors.length];
    const totalInCategory = donationPagination.data.filter(d => d.categoryId === categoryItem.id).length;
    return (
      <CardCategory
        category={categoryItem}
        quantity={totalInCategory}
        bgColor={color}
        key={categoryItem.id}
      />
    );
  });

  return (
    <MainCard
      title="Browse Categories"
      layout ="flex"
      description="Find exactly what you need discover something unexpected. Every category helps reduce waste and build communities.">
      {category}
    </MainCard>
  );
};

export default BrowseCategory;
