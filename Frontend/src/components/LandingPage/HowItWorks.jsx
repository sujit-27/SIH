import { motion } from "framer-motion";
import { FaRegLightbulb, FaRoad, FaHandsHelping } from "react-icons/fa";

const steps = [
  {
    step: "Step 1",
    title: "Tell Us Your Goals",
    description: "Share your interests and skills with our smart advisor.",
    icon: <FaRegLightbulb className="text-4xl text-yellow-400 mb-4" />,
  },
  {
    step: "Step 2",
    title: "Get Personalized Roadmaps",
    description: "See career and education pathways built for you.",
    icon: <FaRoad className="text-4xl text-indigo-500 mb-4" />,
  },
  {
    step: "Step 3",
    title: "Connect & Succeed",
    description: "Access resources and actionable guidance to achieve your dreams.",
    icon: <FaHandsHelping className="text-4xl text-purple-500 mb-4" />,
  },
];

const HowItWorks = () => (
  <section
    id="howitworks"
    className="py-20 px-6 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-100 relative overflow-hidden"
  >
    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-800 mb-12">
      How It Works
    </h2>

    <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
      {steps.map((s, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 + idx * 0.3 }}
          className="bg-white rounded-3xl p-8 shadow-lg border-t-4 border-indigo-300 hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300 flex-1 text-center"
        >
          {s.icon}
          <span className="text-indigo-700 font-bold text-lg mb-2 block">{s.step}</span>
          <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
          <p className="text-gray-700">{s.description}</p>
        </motion.div>
      ))}
    </div>

    {/* Background accent circles */}
    <div className="absolute -top-32 -left-32 w-96 h-96 bg-yellow-200/20 rounded-full filter blur-3xl animate-blob"></div>
    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-300/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
  </section>
);

export default HowItWorks;
