
import { CardCategory } from "./CardCategory";
import { MainCard } from "./MainCard";


import categories  from "../../data/categories";


const BrowseCategory = () => {



    const colors = ["bg-green-400", "bg-orange-400", "bg-blue-400", "bg-purple-400", "bg-yellow-400", "bg-red-400"]
    const category = categories.map((category, index) => {
        const color = colors[index % colors.length];
        return (
            <CardCategory category={category} quantity={1024} bgColor={color} key={category.id} />
        )
    });
    return (

        <MainCard title="Browse Categories"  description="Find exactly what you need discover something unexpected. Every category helps reduce waste and build communities." >
            {category}
        </MainCard>

    )
}

export default BrowseCategory;