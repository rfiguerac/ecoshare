import { useState, useRef, useEffect } from "react";
import { Search, Bell, User, Plus, LogOut, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { donations } from "../data/donations";
import CreateDonationForm from "./Donation/CreateDonationForm";
import CreateProfileForm from "./Profile/CreateProfileForm";
import LoginForm from "./Profile/LoginForm";
import { useAuthStore } from "../store/AuthStore";

// Sugerencias de búsqueda simuladas
const mockSuggestions = donations.map((donation) => donation.title);

interface Props {
  isOpenMenu: boolean;
  setIsOpenMenu: (isOpen: boolean) => void;
}

export const Navbar = ({ isOpenMenu, setIsOpenMenu }: Props) => {
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuthStore();

  const filteredSuggestions = mockSuggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (value: string) => {
    if (value.trim() !== "") {
      navigate(`/DonationSearch?query=${encodeURIComponent(value)}`);
      setIsOpen(false);
    }
  };

  const handleSelect = (value: string) => {
    setQuery(value);
    handleSearch(value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(query);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  function handleShowModal(): void {
    setIsModalOpen(!isModalOpen);
  }

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  function handleShowLoginModal(): void {
    setIsLoginModalOpen(!isLoginModalOpen);
  }

  const [isCreateProfileModalOpen, setIsCreateProfileModalOpen] =
    useState(false);
  function handleShowCreateProfileModal(): void {
    setIsCreateProfileModalOpen(!isCreateProfileModalOpen);
  }

  const handleRegisterShowModal = () => {
    handleShowLoginModal();
    handleShowCreateProfileModal();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="flex navbar left-0 fixed bg-white/70 backdrop-blur-sm shadow-sm lg:px-15 z-50 top-0 w-full">
        <div className="container mx-auto flex items-center justify-between">
          {/* SECCIÓN IZQUIERDA */}
          <div className="navbar-start w-auto flex items-center">
            {location.pathname.startsWith("/dashboard") && (
              <button
                className="lg:hidden btn btn-square btn-ghost mr-2"
                onClick={() => setIsOpenMenu(!isOpenMenu)}>
                <Menu size={24} />
              </button>
            )}

            <Link to="/">
              <div className="flex-none">
                <img
                  src="\src\assets\ecoshare-icon.png"
                  alt="EcoShare logo"
                  className="w-16 md:w-20 lg:w-20"
                />
              </div>
            </Link>
            <div className="flex-col items-start ml-4">
              <a className="text-sm md:text-base lg:text-lg font-bold hidden lg:flex">
                EcoShare
              </a>
              <p className="text-sm text-gray-500 mt-0.5 hidden lg:block">
                Reduce • Reuse • Share
              </p>
            </div>
          </div>

          {/* SECCIÓN CENTRAL */}
          <div className="navbar-center">
            <div className="mx-auto relative" ref={searchContainerRef}>
              <form
                onSubmit={handleFormSubmit}
                className="flex items-center bg-white border border-black rounded-3xl p-2 ">
                <input
                  type="text"
                  placeholder="Search for items, food, clothing..."
                  className="md:w-sm xl:min-w-md 2xl:min-w-3xl h-5 lg:h-10 px-4 text-sm md:text-base lg:text-lg text-gray-700 bg-transparent border-none focus:outline-none"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(e.target.value.length > 0);
                  }}
                  onFocus={() => {
                    if (query.length > 0) {
                      setIsOpen(true);
                    }
                  }}
                  onBlur={() => {
                    setTimeout(() => setIsOpen(false), 200);
                  }}
                />
                <button
                  type="submit"
                  className="flex-shrink-0 p-2 text-gray-500">
                  <Search size={16} />
                </button>
              </form>

              {/* Menú desplegable de sugerencias */}
              {isOpen && filteredSuggestions.length > 0 && (
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full mt-2 absolute top-full left-0 right-0">
                  {filteredSuggestions.map((item) => (
                    <li key={item}>
                      <button
                        onMouseDown={() => handleSelect(item)}
                        className="w-full text-left p-2 hover:bg-gray-100 transition-colors">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Mensaje si no hay resultados */}
              {isOpen &&
                filteredSuggestions.length === 0 &&
                query.length > 0 && (
                  <div className="p-4 mt-2 text-center text-gray-500 bg-base-100 rounded-box shadow absolute top-full left-0 right-0">
                    No results found
                  </div>
                )}
            </div>
          </div>

          {/* SECCIÓN DERECHA */}
          <div className="navbar-end w-auto flex items-center gap-2">
            {/* Menú hamburguesa SOLO en móviles */}
            <div className="dropdown dropdown-end sm:hidden">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                <Menu size={24} />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <button onClick={handleShowModal}>
                    <Plus /> New donation
                  </button>
                </li>
                <li>
                  <button>
                    <Bell size={18} /> Notifications
                  </button>
                </li>
                <li>
                  {isAuthenticated ? (
                    <button onClick={handleLogout}>
                      <LogOut size={18} /> LogOut
                    </button>
                  ) : (
                    <button onClick={handleShowLoginModal}>
                      <User size={18} /> Login
                    </button>
                  )}
                </li>
              </ul>
            </div>

            {/* Botones visibles en pantallas medianas y grandes */}
            <div className="hidden sm:flex gap-x-5">
              <button
                onClick={handleShowModal}
                className="btn btn-sm md:btn-md btn-primary hover:btn-secondary active:btn-accent">
                + New donation
              </button>
              <button className="btn btn-square btn-ghost">
                <Bell size={18} className="hidden lg:block" />
              </button>
              {isAuthenticated ? (
                <button
                  className="btn btn-square btn-ghost"
                  onClick={handleLogout}>
                  <LogOut size={18} />
                </button>
              ) : (
                <button
                  className="btn btn-square btn-ghost"
                  onClick={handleShowLoginModal}>
                  <User size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <CreateDonationForm handleShowModal={handleShowModal} />}
      {isLoginModalOpen && (
        <LoginForm
          handleShowModal={handleShowLoginModal}
          handleRegisterShowModal={handleRegisterShowModal}
        />
      )}
      {isCreateProfileModalOpen && (
        <CreateProfileForm handleShowModal={handleShowCreateProfileModal} />
      )}
    </>
  );
};
