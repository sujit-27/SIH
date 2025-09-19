import { motion } from "framer-motion";

const features = [
  {
    title: "AI-Powered Career Guidance",
    description: "Tailored recommendations for your ideal career path.",
    icon: "💡",
  },
  {
    title: "Personalized Education Roadmaps",
    description: "Step-by-step learning plans for any goal.",
    icon: "🛣️",
  },
  {
    title: "Real-Time Industry Insights",
    description: "Up-to-date market trends & in-demand roles.",
    icon: "📈",
  },
  {
    title: "Expert Support & Live Guidance",
    description: "Mentor sessions, interview prep, resume help.",
    icon: "🤝",
  },
];

const Features = () => (
  <section id="features" className="py-20 px-6 bg-white/90 rounded-t-4xl shadow-xl -mt-10 relative overflow-hidden">
    <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-900 mb-12 text-center">
      Why Choose Us?
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
      {features.map((f, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 + idx * 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-lg border-b-4 border-indigo-200 hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300 cursor-pointer"
        >
          <div className="text-6xl mb-6 animate-bounce">{f.icon}</div>
          <h3 className="text-xl font-bold text-indigo-800 mb-3">{f.title}</h3>
          <p className="text-gray-700">{f.description}</p>
        </motion.div>
      ))}
    </div>

    {/* Background soft gradient circles for style */}
    <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-200/20 rounded-full filter blur-3xl animate-blob"></div>
    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-300/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
  </section>
);

export default Features;
