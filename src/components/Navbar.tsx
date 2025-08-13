import { Search, Bell, User, MapPin, Funnel } from 'lucide-react';
export const Navbar = () => {
  return <>
    <div className="navbar bg-base-100 shadow-sm lg:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a><Bell size={18}/> Notifications</a></li>
            <li><a><User size={18}/>Profile</a></li>
            <li><a>Saved</a></li>
          </ul>
        </div>
        <div className="flex-none">
          <img src="src\assets\ecoshare-icon.png" width={50} alt="EcoShare logo"  className='w-8 md:w-12 lg:w-16'/>
        </div>
        <div className="flex-col items-start ml-4">
          <a className="text-sm md:text-base lg:text-lg font-bold">EcoShare</a>
          <p className="text-sm text-gray-500 mt-0.5 hidden lg:block">Reduce • Reuse • Share</p>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">

        <div className=" w-full max-w-4xl mx-auto">
          <form action="" method="get" className="flex items-center w-full bg-white rounded-3xl shadow-lg p-2">

            <div className="flex-shrink-0 p-2 text-gray-500">
              <Search size={24} />
            </div>

            <input
              type="text"
              placeholder="Search for items, food, clothing..."
              className="w-full h-10 px-4 text-gray-700 bg-transparent border-none focus:outline-none"
            />

            <div className="flex items-center p-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-full transition-colors">
              <MapPin strokeWidth={1.5} size={20} />
              <span className="ml-1 text-sm font-medium hidden md:inline">Near me</span>
            </div>

            <div className="flex items-center p-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-full transition-colors">
              <Funnel strokeWidth={1.5} size={20} />
              <span className="ml-1 text-sm font-medium hidden md:inline">Filters</span>
            </div>

            <input
              type="submit"
              value="Search"
              className="btn ml-2 bg-[#28A745] text-white hover:bg-[#218838] rounded-full min-w-[100px] font-bold"
            />
          </form>
        </div>
       
      </div>
      <div className="navbar-end gap-x-5">
        <Bell size={18} className='hidden lg:block'/>
        <a className="btn btn-sm md:btn-md bg-[#28A745] text-white hover:bg-[#218838]"> + New donation</a>
        <User size={18} className='hidden lg:block'/>
      </div>
    </div >
  </>
};
