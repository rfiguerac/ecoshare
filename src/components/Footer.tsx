import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="text-gray-800 py-12 px-4 md:px-8 lg:px-16 mt-10 shadow-inner">
      {/* Default to 1 column, then 2 columns on small, then 3 on medium */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
        {/* Left Column: Logo and Description */}
        {/* This column spans 2 columns on small screens, pushing the others to the next row */}
        <div className="flex flex-col space-y-4 sm:col-span-2 md:col-span-1">
          <div className="flex items-center space-x-2">
            <div className="flex-none">
              <img
                src="src\assets\ecoshare-icon.png"
                alt="EcoShare logo"
                className="w-10 md:w-12 lg:w-16"
              />
            </div>
            <span className="text-2xl font-bold">EcoShare</span>
          </div>
          <p className="text-gray-600 text-sm max-w-sm">
            Building a sustainable community through sharing and reducing waste.
          </p>
        </div>

        {/* Middle Column: Quick Links */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/how-it-works"
                className="hover:text-blue-600 transition-colors">
                How It Works
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="hover:text-blue-600 transition-colors">
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="/our-impact"
                className="hover:text-blue-600 transition-colors">
                Our Impact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Column: Support */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-lg font-semibold">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/help-center"
                className="hover:text-blue-600 transition-colors">
                Help Center
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className="hover:text-blue-600 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/feedback"
                className="hover:text-blue-600 transition-colors">
                Feedback
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
