import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, Clock, DollarSign, Briefcase } from "lucide-react";
import { useState, useRef } from "react";

export default function Careers() {
  const [hoveredJob, setHoveredJob] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const jobsData = [
    {
      title: "Frontend Developer",
      description: "Build modern, interactive, and responsive web interfaces using React and Tailwind.",
      location: "Remote",
      type: "Full-time",
      salary: "$80K - $120K",
      technologies: ["React", "Tailwind CSS", "JavaScript", "UI/UX", "TypeScript"],
    },
    {
      title: "HR Business Partner",
      description: "Act as a strategic HR advisor to clients managing remote teams across the globe.",
      location: "Remote",
      type: "Full-time",
      salary: "$75K - $100K",
      technologies: ["HR Management", "Talent Acquisition", "Employment Law", "Leadership", "Onboarding"],
    },
    {
      title: "Global Payroll Specialist",
      description: "Handle international payroll operations and ensure compliance with global regulations.",
      location: "Remote",
      type: "Full-time",
      salary: "$70K - $95K",
      technologies: ["International Tax", "Compliance", "Financial Analysis", "Data Management", "HR Systems"],
    }
  ];

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const backgroundY = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="min-h-screen font-sans text-gray-800 bg-gradient-to-b from-white to-blue-50">
      {/* Navbar */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="group relative">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Bizarcs
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <div className="space-x-8 text-base font-medium text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span className="text-blue-600 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600">Careers</span>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with 3D Parallax Effect */}
      <header className="relative overflow-hidden py-32 px-6">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 to-indigo-100/80 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c')] bg-cover opacity-10"></div>
          
          {/* 3D Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(1000px)_rotateX(60deg)]"></div>
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 leading-tight mb-6">
              Shape the Future with Bizarcs
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Join our global team of innovators building the next generation of HR and payroll solutions.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-12"
          >
            <a 
              href="#openings" 
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-lg font-medium shadow-lg hover:shadow-blue-500/30 hover:translate-y-1 transition-all duration-300"
            >
              View Open Positions
            </a>
          </motion.div>
        </div>
      </header>

      {/* Job Listings Section */}
      <div id="openings" className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          style={{ opacity }}
          className="text-center mb-16"
        >
          <span className="px-4 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
            Join Our Team
          </span>
          <h2 className="text-4xl font-bold text-gray-800 mt-4 mb-6">Current Openings</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're looking for passionate individuals to join our team and help shape the future of work.
            Explore our open positions below.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {jobsData.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              onMouseEnter={() => setHoveredJob(index)}
              onMouseLeave={() => setHoveredJob(null)}
              className="group relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl"
            >
              {/* Background gradient that appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* 3D hover effect */}
              <motion.div 
                animate={{ 
                  rotateX: hoveredJob === index ? 2 : 0,
                  rotateY: hoveredJob === index ? 2 : 0,
                  z: hoveredJob === index ? 10 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-10 p-8"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-700 mb-2 group-hover:text-blue-800 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0.5, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.2 }}
                    className="p-2 bg-blue-100 rounded-full text-blue-700"
                  >
                    <Briefcase size={20} />
                  </motion.div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {job.description}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1 text-blue-600" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1 text-blue-600" />
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <DollarSign size={16} className="mr-1 text-blue-600" />
                    {job.salary}
                  </div>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium flex justify-center items-center group"
                >
                  <span>Apply Now</span>
                  <ArrowUpRight size={18} className="ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-b from-blue-50 to-indigo-50"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-800 mb-6">Life at Bizarcs</h2>
            <p className="text-lg text-blue-700 max-w-3xl mx-auto">
              We're a global team that values creativity, growth, and work-life balance.
              Here's what you can expect when you join us:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Remote-First Culture",
                description: "Work from anywhere in the world with flexible hours designed to fit your lifestyle.",
                icon: "🌎",
              },
              {
                title: "Continuous Growth",
                description: "Access to learning resources, conferences, and mentorship to help you develop your skills.",
                icon: "📈",
              },
              {
                title: "Competitive Benefits",
                description: "Health insurance, paid time off, home office stipend, and other perks to support your wellbeing.",
                icon: "🏆",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">Ready to Join Our Team?</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
              We're always looking for talented individuals passionate about creating innovative solutions.
              Check out our open positions or send us your resume.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#openings" 
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-lg font-medium shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                View Openings
              </a>
              <a 
                href="mailto:careers@bizarcs.com" 
                className="px-8 py-3 bg-white border border-blue-600 text-blue-600 rounded-xl text-lg font-medium shadow hover:bg-blue-50 transition-all"
              >
                Contact Recruiting
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}