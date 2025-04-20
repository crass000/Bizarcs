import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";

const newsItems = [
  {
    title: "Bizarcs Expands into Europe",
    image: "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=800",
    summary: "Bizarcs has opened a new office in Berlin, continuing our global expansion strategy.",
    link: "https://www.bbc.com/news/business",
    author: "Sarah Johnson",
    date: "April 15, 2025",
    readTime: "4 min read",
    category: "Expansion"
  },
  {
    title: "EOR Trends in 2025",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=800",
    summary: "Discover the top Employer of Record trends and predictions shaping the HR world this year.",
    link: "https://edition.cnn.com/business",
    author: "David Chen",
    date: "April 10, 2025",
    readTime: "6 min read",
    category: "Trends"
  },
  {
    title: "Bizarcs Wins Best HR Tech Award",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=800",
    summary: "We're thrilled to announce Bizarcs was awarded the Best HR Tech Innovation award for 2025.",
    link: "https://www.reuters.com/business/",
    author: "Michelle Adams",
    date: "April 5, 2025",
    readTime: "3 min read",
    category: "Awards"
  },
];

export default function News() {
  const [isHovering, setIsHovering] = useState(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (containerRef.current) {
        const { left, top } = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - left,
          y: event.clientY - top
        });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section 
      className="py-24 px-4 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden" 
      id="news"
      ref={containerRef}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-200 mix-blend-multiply opacity-30 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-200 mix-blend-multiply opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-pink-200 mix-blend-multiply opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Spotlight effect */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-blue-100/20 to-transparent opacity-60 pointer-events-none" 
        style={{ 
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(191, 219, 254, 0.15), transparent 40%)` 
        }}
      ></div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="inline-block py-1 px-3 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">LATEST UPDATES</span>
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600 mb-6">Latest News</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"></div>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onHoverStart={() => setIsHovering(index)}
              onHoverEnd={() => setIsHovering(null)}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-20 group-hover:opacity-30"></div>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative z-10">
                <div className="relative h-52 overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: isHovering === index ? 1.1 : 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      <span>{item.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6">{item.summary}</p>
                  
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    Read Full Article 
                    <motion.span
                      initial={{ x: 0 }}
                      animate={{ x: isHovering === index ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight size={16} className="ml-1" />
                    </motion.span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <a 
            href="#news-archive" 
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full inline-flex items-center hover:shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300"
          >
            View All News
            <ArrowRight size={16} className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}