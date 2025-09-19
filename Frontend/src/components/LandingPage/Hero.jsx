import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {

    const navigate = useNavigate()

    return(
        <header className="relative pt-28 pb-32 px-6 text-center bg-gradient-to-r from-indigo-700 via-purple-800 to-blue-900 overflow-hidden">
    
    {/* Background accent circles */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-[600px] h-[600px] bg-yellow-400/20 rounded-full filter blur-3xl animate-blob"></div>
    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-400/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

    {/* Heading */}
    <motion.h1
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-indigo-200 mb-6 drop-shadow-lg leading-tight"
    >
      One Stop Personalized Career & Education Advisor
    </motion.h1>

    {/* Subtext */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 font-medium mb-10"
    >
      The ultimate platform to discover careers, pick the best educational pathways, and unlock future opportunities — all powered by smart recommendations & real experts.
    </motion.p>

    {/* Call-to-action buttons */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex justify-center gap-6 flex-wrap"
    >
      <a
        href="#cta"
        onClick={() => navigate("/home")}
        className="px-8 py-4 rounded-2xl font-bold text-xl bg-white text-indigo-700 shadow-xl hover:bg-yellow-100 transform hover:scale-105 transition duration-300"
      >
        Get Started
      </a>
      <a
        href="#features"
        className="px-8 py-4 rounded-2xl font-bold text-xl bg-transparent border-2 border-white text-white hover:bg-indigo-800 hover:border-indigo-300 transform hover:scale-105 transition duration-300"
      >
        Explore Features
      </a>
    </motion.div>
  </header>

    )
}

    
;

export default Hero;
