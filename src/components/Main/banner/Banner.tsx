
import { BannerCard } from "./BannerCard";
import { Link } from "react-router-dom";



const Banner = () => {




    return (
        <BannerCard
            title="Ready to Make a Difference?"
            description="Join thousands of community members who are already making an impact. Start sharing, start caring, start changing the world."

            button1={
                <Link to="/createDonation">
                    <button className="px-6 py-3 text-sm md:text-md lg:text-xl font-semibold text-blue-600 bg-white rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:background-blue-600 hover:text-white hover:bg-blue-600">
                        Donate Your First Item
                    </button>
                </Link>
            }
            button2={
                <button className="px-6 py-3 text-sm md:text-md lg:text-xl font-semibold text-white bg-transparent border-2 border-white rounded-full transition-transform duration-300 hover:scale-105 hover:bg:white hover:text-blue-600 hover:border-blue-600">
                    How it works
                </button>
            }
        />

    )
}

export default Banner;