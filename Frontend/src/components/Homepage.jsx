
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Search, ChevronRight, BookOpen, Users, MapPin } from "lucide-react";
// import { Link } from "react-router-dom"; // <-- Import Link

// const DATA_API_URL = "https://api.data.gov.in/resource/1d08a062-5a2e-4cb7-9261-10382095c9d7?api-key=YOUR_API_KEY";

// export default function HomePage() {
//   const [query, setQuery] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [schools, setSchools] = useState([]);
//   const [error, setError] = useState(null);

//   async function searchSchools(q) {
//     setLoading(true);
//     setError(null);
//     try {
//       const url = `${DATA_API_URL}&filters[state]=${encodeURIComponent(q || "")}&limit=10`;
//       const res = await fetch(url);
//       if (!res.ok) throw new Error("Failed to fetch");
//       const json = await res.json();
//       const records = json.records || json.data || json.result || json;
//       setSchools(Array.isArray(records) ? records : []);
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function handleSubmit(e) {
//     e && e.preventDefault();
//     searchSchools(query.trim());
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 text-slate-900">
//       <header className="bg-white shadow-sm">
//         <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-500 rounded-lg flex items-center justify-center text-white font-bold">CA</div>
//             <div>
//               <h1 className="text-lg font-semibold">Career Advisor</h1>
//               <p className="text-xs text-slate-500">One‑Stop Personalized Career & Education Advisor</p>
//             </div>
//           </div>
//           <nav className="flex items-center gap-4 text-sm text-slate-600">
//             <a className="hover:text-indigo-600" href="#features">Features</a>
//             <a className="hover:text-indigo-600" href="#search">Find Schools</a>
//             <Link className="hover:text-indigo-600" to="/quiz">Career Test</Link> {/* <-- React Router Link */}
//             <button className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm">Sign In</button>
//           </nav>
//         </div>
//       </header>

//       <main className="max-w-6xl mx-auto px-6 py-10">
//         <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//           <div>
//             <motion.h2
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-3xl md:text-4xl font-extrabold leading-tight"
//             >
//               Find the right college, course and career — <span className="text-indigo-600">guided by data</span>
//             </motion.h2>
//             <p className="mt-4 text-slate-600">Personalized recommendations using national school datasets (UDISE+), career quizzes and curated roadmaps for every student.</p>

//             <div className="mt-6 flex gap-3">
//               <Link to="/quiz" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium">
//                 Start Career Test <ChevronRight size={16} />
//               </Link>
//               <a href="#search" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200">Explore Govt Schools</a>
//             </div>

//             <div className="mt-8 grid grid-cols-3 gap-4">
//               <StatCard title="Govt Schools" value="1.2M+" icon={<MapPin size={18} />} />
//               <StatCard title="Courses indexed" value="8k+" icon={<BookOpen size={18} />} />
//               <StatCard title="Students covered" value="50M+" icon={<Users size={18} />} />
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow-md">
//             <h3 className="font-semibold">Quick school search</h3>
//             <p className="text-sm text-slate-500 mt-1">Search by state/district or paste a UDISE code to get school details (demo calls use data.gov.in endpoints).</p>

//             <form id="search" onSubmit={handleSubmit} className="mt-4">
//               <div className="flex gap-2">
//                 <label className="relative flex-1">
//                   <input
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     placeholder="Enter state / district / UDISE code"
//                     className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
//                   />
//                   <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60">
//                     <Search size={16} />
//                   </div>
//                 </label>
//                 <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Search</button>
//               </div>
//             </form>

//             <div className="mt-4">
//               {loading && <div className="text-sm text-slate-500">Loading...</div>}
//               {error && <div className="text-sm text-red-500">{error}</div>}

//               {schools.length > 0 && (
//                 <ul className="mt-3 space-y-2 max-h-56 overflow-auto">
//                   {schools.map((s, i) => (
//                     <li key={s.udise || i} className="p-3 border rounded-md flex justify-between items-start">
//                       <div>
//                         <div className="font-medium">{s.school_name || s['School_Name'] || s['school_name_eng'] || 'School name'}</div>
//                         <div className="text-xs text-slate-500">{s.district_name || s['district']} • UDISE: {s.udise || s['udise'] || 'N/A'}</div>
//                       </div>
//                       <a className="text-sm text-indigo-600" href="#">View</a>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//         </section>

//         <section id="features" className="mt-12">
//           <h3 className="text-xl font-semibold">How it helps students</h3>
//           <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//             <FeatureCard title="Personalized Recommendations" desc="AI + dataset driven matches for students based on interests and local school offerings." />
//             <FeatureCard title="Government College Finder" desc="Locate government colleges and programs near you with filters for seats, facilities and more." />
//             <FeatureCard title="Career Roadmaps" desc="Step-by-step plans: which exams to prepare for, timelines, and resource links." />
//           </div>
//         </section>

//         <section className="mt-12 pb-12">
//           <h5 className="text-sm text-slate-500">Demo data sources</h5>
//           <div className="mt-3 text-xs text-slate-600">We use UDISE+ / data.gov.in datasets for government school metadata. Replace <code>DATA_API_URL</code> in the code with your registered API key and endpoint.</div>
//         </section>
//       </main>

//       <footer className="bg-white border-t mt-10">
//         <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-slate-600">
//           <div>© {new Date().getFullYear()} Career Advisor • Made for Smart India Hackathon</div>
//           <div>Built with ❤️ • UDISE+ / data.gov.in</div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// function StatCard({ title, value, icon }) {
//   return (
//     <div className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-3">
//       <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">{icon}</div>
//       <div>
//         <div className="text-xs text-slate-500">{title}</div>
//         <div className="font-semibold">{value}</div>
//       </div>
//     </div>
//   );
// }

// function FeatureCard({ title, desc }) {
//   return (
//     <div className="bg-white border rounded-xl p-5">
//       <div className="font-semibold">{title}</div>
//       <div className="mt-2 text-sm text-slate-600">{desc}</div>
//       <div className="mt-4 text-xs text-indigo-600">Learn more →</div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronRight, BookOpen, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom"; // <-- Import Link

const DATA_API_URL =
  "https://api.data.gov.in/resource/1d08a062-5a2e-4cb7-9261-10382095c9d7?format=json&api-key=YOUR_API_KEY";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState(null);

  async function searchSchools() {
    setLoading(true);
    setError(null);
    try {
      // Force state filter to Jammu & Kashmir
      const url = `${DATA_API_URL}&filters[state]=Jammu%20and%20Kashmir&limit=20`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      const records = json.records || json.data || json.result || json;
      setSchools(Array.isArray(records) ? records : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-extrabold leading-tight"
            >
              Find the right college, course and career —{" "}
              <span className="text-indigo-600">guided by data</span>
            </motion.h2>
            <p className="mt-4 text-slate-600">
              Personalized recommendations using national school datasets
              (UDISE+), career quizzes and curated roadmaps for every student.
            </p>

            <div className="mt-6 flex gap-3">
              <Link
                to="/quiz"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium"
              >
                Start Career Test <ChevronRight size={16} />
              </Link>
              <a
                href="#search"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200"
              >
                Explore Govt Schools
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <StatCard
                title="Govt Schools"
                value="1.2M+"
                icon={<MapPin size={18} />}
              />
              <StatCard
                title="Courses indexed"
                value="8k+"
                icon={<BookOpen size={18} />}
              />
              <StatCard
                title="Students covered"
                value="50M+"
                icon={<Users size={18} />}
              />
            </div>
          </div>

          {/* Quick School Search (J&K only) */}
          <div className="bg-white rounded-2xl p-6 shadow-md" id="search">
            <h3 className="font-semibold">Jammu & Kashmir Govt Schools</h3>
            <p className="text-sm text-slate-500 mt-1">
              Get the list of government schools in Jammu & Kashmir (from UDISE+
              data).
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                searchSchools();
              }}
              className="mt-4"
            >
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Show J&K Schools
              </button>
            </form>

            <div className="mt-4">
              {loading && (
                <div className="text-sm text-slate-500">Loading...</div>
              )}
              {error && <div className="text-sm text-red-500">{error}</div>}

              {schools.length > 0 && (
                <ul className="mt-3 space-y-2 max-h-56 overflow-auto">
                  {schools.map((s, i) => (
                    <li
                      key={s.udise || i}
                      className="p-3 border rounded-md flex justify-between items-start"
                    >
                      <div>
                        <div className="font-medium">
                          {s.school_name ||
                            s["School_Name"] ||
                            s["school_name_eng"] ||
                            "School name"}
                        </div>
                        <div className="text-xs text-slate-500">
                          {s.district_name || s["district"]} • UDISE:{" "}
                          {s.udise || s["udise"] || "N/A"}
                        </div>
                      </div>
                      <a className="text-sm text-indigo-600" href="#">
                        View
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mt-12">
          <h3 className="text-xl font-semibold">How it helps students</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              title="Personalized Recommendations"
              desc="AI + dataset driven matches for students based on interests and local school offerings."
            />
            <FeatureCard
              title="Government College Finder"
              desc="Locate government colleges and programs near you with filters for seats, facilities and more."
            />
            <FeatureCard
              title="Career Roadmaps"
              desc="Step-by-step plans: which exams to prepare for, timelines, and resource links."
            />
          </div>
        </section>

        {/* Footer Info */}
        <section className="mt-12 pb-12">
          <h5 className="text-sm text-slate-500">Demo data sources</h5>
          <div className="mt-3 text-xs text-slate-600">
            We use UDISE+ / data.gov.in datasets for government school metadata.
            Replace <code>DATA_API_URL</code> in the code with your registered
            API key and endpoint.
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-slate-600">
          <div>
            © {new Date().getFullYear()} Career Advisor • Made for Smart India
            Hackathon
          </div>
          <div>Built with ❤️ • UDISE+ / data.gov.in</div>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-3">
      <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-xs text-slate-500">{title}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <div className="font-semibold">{title}</div>
      <div className="mt-2 text-sm text-slate-600">{desc}</div>
      <div className="mt-4 text-xs text-indigo-600">Learn more →</div>
    </div>
  );
}
