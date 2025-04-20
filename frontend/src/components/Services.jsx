import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Users, Wallet, Check, Globe, Shield } from "lucide-react";
import { useRef, useState } from "react";

// Services data
const services = [
  {
    title: "EOR Services",
    icon: <Briefcase size={40} />,
    description: "Global hiring, onboarding, and compliance made easy with our Employer of Record solutions.",
    features: [
      "Legal entity establishment in 150+ countries",
      "Compliant employment contracts",
      "Risk mitigation and local law expertise",
      "Seamless onboarding experience"
    ],
    color: "blue"
  },
  {
    title: "HR Consultancy",
    icon: <Users size={40} />,
    description: "Personalized HR strategies, employee support, and organizational development for any team size.",
    features: [
      "Talent acquisition and retention",
      "Performance management systems",
      "Employee engagement programs",
      "Workplace culture development"
    ],
    color: "indigo"
  },
  {
    title: "Payroll Solutions",
    icon: <Wallet size={40} />,
    description: "Accurate, timely, and fully compliant international payroll services.",
    features: [
      "Multi-currency payment processing",
      "Tax calculation and withholding",
      "Benefits administration",
      "Real-time reporting dashboard"
    ],
    color: "purple"
  },
  {
    title: "Global Mobility",
    icon: <Globe size={40} />,
    description: "Seamless relocation and immigration services for your international workforce.",
    features: [
      "Visa and immigration support",
      "Relocation assistance",
      "Cultural integration programs",
      "Global mobility policy development"
    ],
    color: "sky"
  },
  {
    title: "Compliance Management",
    icon: <Shield size={40} />,
    description: "Stay ahead of regulatory changes with our comprehensive compliance solutions.",
    features: [
      "Regular compliance audits",
      "Policy updates and implementation",
      "Risk assessment and mitigation",
      "Compliance training and education"
    ],
    color: "emerald"
  }
];

const colorMappings = {
  blue: "from-blue-500 to-blue-600",
  indigo: "from-indigo-500 to-indigo-600",
  purple: "from-purple-500 to-purple-600",
  sky: "from-sky-500 to-sky-600",
  emerald: "from-emerald-500 to-emerald-600"
};

const bgColorMappings = {
  blue: "bg-blue-50",
  indigo: "bg-indigo-50",
  purple: "bg-purple-50",
  sky: "bg-sky-50",
  emerald: "bg-emerald-50"
};

const borderColorMappings = {
  blue: "border-blue-200",
  indigo: "border-indigo-200",
  purple: "border-purple-200",
  sky: "border-sky-200",
  emerald: "border-emerald-200"
};

export default function Services() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="py-24 relative overflow-hidden" id="services" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50 z-0"></div>
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute right-0 top-0 h-full w-1/2 transform translate-x-1/3 text-blue-50 opacity-40" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,0 100,0 50,100 0,100" />
        </svg>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-blue-200 mix-blend-multiply opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-purple-200 mix-blend-multiply opacity-10"></div>
      </div>

      <motion.div 
        className="max-w-6xl mx-auto px-4 relative z-10"
        style={{ opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">OUR EXPERTISE</span>
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600 mb-6">World-Class Solutions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Empowering your global workforce with innovative solutions designed for the modern business landscape.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-6"></div>
        </motion.div>

        {/* Service Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {services.map((service, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-2 px-5 rounded-full font-medium text-sm transition-all duration-300 ${
                activeTab === idx 
                  ? `bg-gradient-to-r ${colorMappings[service.color]} text-white shadow-lg shadow-${service.color}-500/30` 
                  : `bg-white text-gray-700 border border-gray-200 hover:border-${service.color}-300`
              }`}
              onClick={() => setActiveTab(idx)}
            >
              {service.title}
            </motion.button>
          ))}
        </div>

        {/* Active Service Details */}
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center"
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left: Service Details */}
          <div>
            <div className={`p-4 inline-block rounded-2xl mb-6 ${bgColorMappings[services[activeTab].color]}`}>
              <div className={`text-${services[activeTab].color}-600`}>
                {services[activeTab].icon}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">{services[activeTab].title}</h3>
            <p className="text-gray-600 text-lg mb-6">{services[activeTab].description}</p>
            <ul className="space-y-3">
              {services[activeTab].features.map((feature, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="flex items-start"
                >
                  <div className={`p-1 rounded-full mr-3 text-${services[activeTab].color}-600 bg-${services[activeTab].color}-100`}>
                    <Check size={16} />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </motion.li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-8 py-3 px-8 rounded-full bg-gradient-to-r ${colorMappings[services[activeTab].color]} text-white font-medium shadow-lg shadow-${services[activeTab].color}-500/30 flex items-center`}
            >
              Learn More
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </div>

          {/* Right: Stylized Info Box */}
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${colorMappings[services[activeTab].color]} opacity-10 rounded-2xl transform rotate-3`}></div>
            <div className={`border ${borderColorMappings[services[activeTab].color]} rounded-2xl bg-white p-8 shadow-xl relative z-10`}>
              <h4 className={`text-xl font-semibold text-${services[activeTab].color}-700 mb-4`}>
                Why Choose {services[activeTab].title}?
              </h4>
              <p className="text-gray-600">
                Discover how our solution enhances productivity, simplifies compliance, and boosts global team performance.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {services[activeTab].features.map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full bg-${services[activeTab].color}-100 text-${services[activeTab].color}-600`}>
                      <Check size={18} />
                    </div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
