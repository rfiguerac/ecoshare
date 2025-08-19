import { MainCard } from "../components/Main/MainCard";
import BrowseCategory from "../components/Main/BrowseCategory";
import { CardCategory } from "../components/Main/CardCategory";
import categories from "../data/categories";


export const CategoryPage = () => {
    return (
        <div className="bg-gray-100 py-12 min-h-screen">
                <BrowseCategory />
        </div>
    );
};

export default CategoryPage;