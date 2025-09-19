import { motion } from "framer-motion";

const CTA = () => (
  <section
    id="cta"
    className="relative py-20 px-6 bg-gradient-to-r from-indigo-800 via-purple-700 to-blue-800 text-center overflow-hidden"
  >
    {/* Background accent circles */}
    <div className="absolute top-0 left-1/2 w-72 h-72 bg-yellow-400/20 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
    <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-purple-400/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-3xl md:text-4xl font-extrabold text-white mb-8"
    >
      Ready to craft your future?
    </motion.h2>

    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href="#start"
      className="inline-block px-12 py-6 rounded-full font-bold text-2xl bg-yellow-300 hover:bg-yellow-400 text-indigo-900 shadow-2xl transition"
    >
      Get Your Personalized Roadmap
    </motion.a>
  </section>
);

export default CTA;
