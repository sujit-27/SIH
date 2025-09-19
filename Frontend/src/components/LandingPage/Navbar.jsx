import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <nav className="w-full sticky top-0 z-50 bg-gradient-to-r from-indigo-700 via-purple-800 to-blue-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center py-5">
        {/* Logo */}
        <div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-white to-indigo-200 select-none">
          One Stop Advisor
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <a href="#features" className="text-white hover:text-yellow-200 font-medium transition duration-300">
            Features
          </a>
          <a href="#howitworks" className="text-white hover:text-yellow-200 font-medium transition duration-300">
            How It Works
          </a>
          <a href="#testimonials" className="text-white hover:text-yellow-200 font-medium transition duration-300">
            Testimonials
          </a>
          <a
            href="#cta"
            onClick={() => navigate("/home")}
            className="px-6 py-2 rounded-xl font-bold bg-white text-indigo-700 shadow-lg hover:bg-yellow-100 transition duration-300"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none text-3xl"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-indigo-700 via-purple-800 to-blue-900 px-6 py-4 flex flex-col gap-4 animate-fadeIn">
          <a href="#features" className="text-white font-medium hover:text-yellow-200 transition duration-300">
            Features
          </a>
          <a href="#howitworks" className="text-white font-medium hover:text-yellow-200 transition duration-300">
            How It Works
          </a>
          <a href="#testimonials" className="text-white font-medium hover:text-yellow-200 transition duration-300">
            Testimonials
          </a>
          <a
            href="#cta"
            className="px-6 py-2 rounded-xl font-bold bg-white text-indigo-700 shadow-lg hover:bg-yellow-100 transition duration-300"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
