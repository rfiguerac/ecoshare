import { useCategoryStore } from "../../store/CategoryStore"

interface FilterProps {
    handleCategoryChange: (categoryId: React.ChangeEvent<HTMLSelectElement>) => void,
    selectedCategory: number | undefined,
    handleDistanceChange: (distance: React.ChangeEvent<HTMLInputElement>) => void,
    selectDistance: number | undefined
}


export const Filter = ({ handleCategoryChange, selectedCategory, handleDistanceChange, selectDistance }: FilterProps) => {
    const { categories } = useCategoryStore()

    return (
        <div className="flex flex-col md:flex-row justify-center gap-6 p-6 mb-8 w-full bg-base-100 rounded-2xl shadow-xl">
            <div className="form-control w-full md:w-1/2">
                <label className="label">
                    <span className="label-text font-semibold text-lg">Category</span>
                </label>
                <select
                    className="select select-bordered w-full rounded-xl focus:outline-none"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="Todas">Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* Filtro por distancia */}
            <div className="form-control flex flex-col w-full md:w-1/2">
                <label className="label">
                    <span className="label-text font-semibold text-lg">Distance (max. {50} km)</span>
                </label>
                <input
                    type="range"
                    min="5"
                    max="50"
                    value={selectDistance}
                    onChange={handleDistanceChange}
                    className="range range-primary rounded-full mt-2 w-full"
                />
                <div className="w-full flex justify-between text-xs px-2 mt-1">
                    <span>5 km</span>
                    <span>25 km</span>
                    <span>50 km</span>
                </div>
            </div>
        </div>
    )
}