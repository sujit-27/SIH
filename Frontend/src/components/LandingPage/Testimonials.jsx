import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "This platform helped me find my dream engineering college!",
    name: "Priya S., Student",
    color: "#818CF8", // Indigo-400
  },
  {
    quote: "The personalized guidance led me to land my first tech job.",
    name: "Ajay M., Graduate",
    color: "#A78BFA", // Purple-400
  },
];

const Testimonials = () => (
  <section id="testimonials" className="py-20 px-6 bg-white relative overflow-hidden">
    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-900">
      Success Stories
    </h2>

    <div className="flex flex-wrap gap-8 justify-center mt-10">
      {testimonials.map((t, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 + idx * 0.3 }}
          className="bg-indigo-50 rounded-3xl p-8 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-transform duration-300 max-w-sm"
          style={{ borderLeft: `4px solid ${t.color}` }}
        >
          <p className="text-gray-900 text-lg italic mb-4">“{t.quote}”</p>
          <span className="block font-semibold" style={{ color: t.color }}>
            {t.name}
          </span>
        </motion.div>
      ))}
    </div>

    {/* Optional background blobs for consistency */}
    <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-200/20 rounded-full filter blur-3xl animate-blob"></div>
    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-300/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
  </section>
);

export default Testimonials;
