import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => (
  <footer className="relative py-12 bg-gradient-to-r from-indigo-800 via-purple-700 to-blue-900 text-center text-white">
    {/* Top accent line */}
    <div className="absolute top-0 left-1/2 w-24 h-1 bg-yellow-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

    <div className="flex justify-center gap-6 mb-4">
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition text-2xl">
        <FaGithub />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition text-2xl">
        <FaLinkedin />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition text-2xl">
        <FaTwitter />
      </a>
    </div>

    <p className="text-md font-medium">
      &copy; {new Date().getFullYear()} One Stop Advisor. All rights reserved.
    </p>
  </footer>
);

export default Footer;
