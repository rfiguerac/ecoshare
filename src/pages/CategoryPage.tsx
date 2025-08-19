
// Update the import path if the file is named 'BrowseCategory.tsx' or 'BrowseCategory.jsx' and check casing
import BrowseCategory from "../components/category/BrowseCategory.tsx";



export const CategoryPage = () => {
    return (
        <div className="bg-gray-100 py-12 min-h-screen">
                <BrowseCategory />
        </div>
    );
};

export default CategoryPage;