import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import { Calendar, ArrowRight, Eye, BookOpen } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "How EOR Services Simplify Global Expansion",
    description: "Discover how Employer of Record services can ease hiring and compliance for your international teams.",
    image: "https://images.pexels.com/photos/3184466/pexels-photo-3184466.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "April 15, 2025",
    readTime: "8 min read",
    category: "Global HR",
    featured: true
  },
  {
    id: 2,
    title: "Top 5 HR Challenges and How to Solve Them",
    description: "Explore the common HR challenges businesses face and strategies to overcome them effectively.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "April 8, 2025",
    readTime: "6 min read",
    category: "HR Strategy"
  },
  {
    id: 3,
    title: "Payroll Compliance Tips for Startups",
    description: "Stay ahead of legal troubles with our essential payroll compliance tips for growing startups.",
    image: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "March 29, 2025",
    readTime: "5 min read",
    category: "Payroll"
  },
  {
    id: 4,
    title: "Building a Remote-First Company Culture",
    description: "Learn how to foster connection, collaboration and productivity in distributed teams.",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "March 22, 2025",
    readTime: "7 min read",
    category: "Company Culture"
  },
];

// Filter blogs by category
const categories = ["All", "Global HR", "HR Strategy", "Payroll", "Company Culture"];

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const filteredPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);
  
  // Featured post is always the first one marked as featured
  const featuredPost = blogPosts.find(post => post.featured);
  // Regular posts exclude the featured one
  const regularPosts = filteredPosts.filter(post => !post.featured || activeCategory !== "All");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      id="blogs"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply opacity-20 animate-blob blur-3xl"></div>
        <div className="absolute top-10 right-48 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-2000 blur-3xl"></div>
        <div className="absolute bottom-12 right-20 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-4000 blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            INSIGHTS & ARTICLES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">From Our Blog</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Insights and updates on HR, EOR, and payroll best practices to help your business thrive in the global marketplace.
          </p>
        </motion.div>
        
        {/* Categories filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>
        
        {/* Featured post (only show when "All" category is selected) */}
        {activeCategory === "All" && featuredPost && (
          <motion.div
            className="mb-16" 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link 
              to={`/blog-details/${featuredPost.id}`}
              className="group"
              onMouseEnter={() => setHoveredId(featuredPost.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="grid md:grid-cols-5 gap-6 bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                <div className="md:col-span-3 h-64 md:h-auto overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 mix-blend-multiply z-10"></div>
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredId === featuredPost.id ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium z-20">
                    Featured
                  </div>
                </div>
                <div className="md:col-span-2 p-8 flex flex-col justify-center">
                  <span className="text-blue-600 font-medium text-sm mb-2">{featuredPost.category}</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{featuredPost.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-2" />
                      <span>{featuredPost.date}</span>
                      <span className="mx-2">•</span>
                      <BookOpen size={16} className="mr-1" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <div className="text-blue-600 font-medium flex items-center group-hover:translate-x-1 transition-transform">
                      Read More <ArrowRight size={16} className="ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
        
        {/* Regular posts */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {regularPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={item}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <Link 
                to={`/blog-details/${post.id}`}
                className="group"
                onMouseEnter={() => setHoveredId(post.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="h-52 overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredId === post.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Eye size={14} className="mr-1" />
                      <span>{Math.floor(Math.random() * 500) + 100}</span>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      <Calendar size={14} className="inline mr-1" /> {post.date}
                    </div>
                    <span className="text-blue-600 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform">
                      Read More <ArrowRight size={14} className="ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View all button */}
        <div className="text-center mt-12">
          <motion.button
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="inline-flex items-center bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            View All Articles
            <ArrowRight size={18} className="ml-2" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}