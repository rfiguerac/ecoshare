import { Search, Bell, User, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';



export const Navbar = () => {
  return <>
    <div className=" flex navbar left-0 fixed bg-white/70 backdrop-blur-sm shadow-sm lg:px-15 z-50 top-0 w-full">
      <div className="container mx-auto flex items-center justify-between">
        <div className="navbar-start w-[30%] sm:w-1/2">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li className='sm:hidden'><Link to="/CreateDonation">
                <Plus /> New donation
              </Link></li>
              <li><Link to="/Notifications"><Bell size={18} /> Notifications</Link></li>
              <li><Link to="/Login"><User size={18} />Profile</Link></li>
            </ul>
          </div>
          <Link to='/'>
            <div className="flex-none">
              <img
                src="src\assets\ecoshare-icon.png" alt="EcoShare logo" className='w-10 md:w-12 lg:w-16' />
            </div>
          </Link>
          <div className="flex-col items-start ml-4">
            <a className="text-sm md:text-base lg:text-lg font-bold hidden lg:flex">EcoShare</a>
            <p className="text-sm text-gray-500 mt-0.5 hidden lg:block">Reduce • Reuse • Share</p>
          </div>
        </div>
        <div className="navbar-center">

          <div className="mx-auto ">
            <form action="" method="get" className="flex items-center bg-white border border-black rounded-3xl p-2 ">
              <input
                type="text"
                placeholder="Search for items, food, clothing..."
                className=" md:w-sm xl:min-w-md 2xl:min-w-3xl h-5 lg:h-10 px-4 text-sm md:text-base lg:text-lg text-gray-700 bg-transparent border-none focus:outline-none "
              />

              <button type="submit" className="flex-shrink-0 p-2 text-gray-500">
                <Search size={16} />
              </button>
            </form>
          </div>
        </div>
        <div className="navbar-end gap-x-5 hidden sm:flex">
          <Link to="/CreateDonation" className="btn btn-sm md:btn-md bg-[#28A745] text-white hover:bg-[#218838]">
            + New donation
          </Link>
          <Bell size={18} className='hidden lg:block' />

          <Link to="/Login">
            <User size={18} className='hidden lg:block' />
          </Link>
        </div>
      </div>
    </div >
  </>
};
