import { Search, Bell, User, Plus, } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Navbar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialQuery = searchParams.get('query') || ('');
    const [inputValue, setInputValue] = useState(initialQuery);
    const navigate = useNavigate();

    useEffect(() => {
        if (inputValue) {
            navigate(`/DonationSearch?query=${inputValue}`);
        } else {
            navigate('/');
        }
    }, [inputValue, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setInputValue(newQuery);

        if (newQuery) {
            setSearchParams({ query: newQuery });
        } else {
            setSearchParams({});
        }
    };

    return (
        <div className="flex navbar left-0 fixed bg-white/70 backdrop-blur-sm shadow-sm lg:px-15 z-50 top-0 w-full">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex-none">
                    <Link to='/'>
                        <img
                            src="src\assets\ecoshare-icon.png" alt="EcoShare logo" className='w-10 md:w-12 lg:w-16' />
                    </Link>
                </div>

                {/* Search Bar - grows to take available space */}
                <div className="flex-1 px-2">
                    <form onSubmit={(e) => e.preventDefault()} action="" method="get" className="flex items-center bg-white border border-black rounded-3xl p-2 w-full">
                        <input
                            type="text"
                            placeholder="Search for items, food, clothing..."
                            value={inputValue}
                            onChange={handleInputChange}
                            className="w-full h-5 lg:h-10 px-4 text-sm md:text-base lg:text-lg text-gray-700 bg-transparent border-none focus:outline-none"
                        />
                        <button type="submit" className="flex-shrink-0 p-2 text-gray-500">
                            <Search size={16} />
                        </button>
                    </form>
                </div>
                
                {/* Right-side Icons & Buttons */}
                <div className="flex-none flex items-center gap-x-2 lg:gap-x-5">
                    {/* Menu button visible on mobile */}
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow right-0">
                            <li><Link to="/CreateDonation">
                                <Plus /> New donation
                            </Link></li>
                            <li><Link to="/Notifications"><Bell size={18} /> Notifications</Link></li>
                            <li><Link to="/Login"><User size={18} />Profile</Link></li>
                        </ul>
                    </div>
                    {/* Desktop buttons, hidden on mobile */}
                    <Link to="/CreateDonation" className="btn btn-sm md:btn-md bg-[#28A745] text-white hover:bg-[#218838] hidden lg:flex">
                        + New donation
                    </Link>
                    <Bell size={18} className='hidden lg:block' />
                    <Link to="/Login">
                        <User size={18} className='hidden lg:block' />
                    </Link>
                </div>
            </div>
        </div >
    );
};