import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star, CheckCircle2 } from "lucide-react";

// Enhanced testimonials with more detailed information
const testimonials = [
  {
    name: "John Doe",
    role: "CEO, Acme Inc.",
    text: "Bizarcs transformed our global hiring process. Their seamless approach to onboarding international talent saved us countless hours and legal headaches. The team's responsiveness and attention to detail exceeded our expectations at every turn.",
    image: "https://i.pravatar.cc/100?img=1",
    rating: 5,
    company: "Technology",
    highlight: "Saved 40% on global compliance costs"
  },
  {
    name: "Sarah Lee",
    role: "HR Manager, ZenCorp",
    text: "Their EOR services saved us weeks of hassle when expanding into European markets. The compliance expertise and localized knowledge were invaluable. What impressed me most was how they handled the complex tax regulations with such precision.",
    image: "https://i.pravatar.cc/100?img=2",
    rating: 5,
    company: "Healthcare",
    highlight: "Expanded to 3 new markets in under a month"
  },
  {
    name: "Amit Patel",
    role: "Founder, StartX",
    text: "Fantastic experience from start to finish! As a startup expanding internationally for the first time, we needed guidance every step of the way. The team provided personalized support that made a complicated process feel manageable and straightforward.",
    image: "https://i.pravatar.cc/100?img=3",
    rating: 5,
    company: "E-commerce",
    highlight: "Reduced onboarding time by 70%"
  },
];

// Company logos with actual image placeholders
const companyLogos = [
  {
    name: "Company 1",
    logo: "https://i.pravatar.cc/150?img=11", // Using placeholder images
    alt: "Company 1 logo"
  },
  {
    name: "Company 2",
    logo: "https://i.pravatar.cc/150?img=12",
    alt: "Company 2 logo"
  },
  {
    name: "Company 3",
    logo: "https://i.pravatar.cc/150?img=13",
    alt: "Company 3 logo"
  },
  {
    name: "Company 4",
    logo: "https://i.pravatar.cc/150?img=14",
    alt: "Company 4 logo"
  },
  {
    name: "Company 5",
    logo: "https://i.pravatar.cc/150?img=15",
    alt: "Company 5 logo"
  },
];

// Animated 3D-like background element
const FloatingElement = ({ size, color, x, y, duration, delay }) => {
  return (
    <motion.div
      className="absolute rounded-full mix-blend-multiply opacity-60 blur-3xl"
      style={{
        background: color,
        width: size,
        height: size,
      }}
      initial={{ x, y, scale: 0.8 }}
      animate={{
        x: [x, x + 20, x - 20, x],
        y: [y, y - 20, y + 30, y],
        scale: [0.8, 1.1, 0.9, 0.8],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    />
  );
};

// Particle effect component
const ParticleEffect = ({ count = 20 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(count)].map((_, index) => {
        const size = Math.random() * 6 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        return (
          <motion.div
            key={index}
            className="absolute rounded-full bg-blue-400"
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              top: `${y}%`,
              opacity: 0.2,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
};

// Star rating component with animation
const RatingStars = ({ rating }) => {
  return (
    <div className="flex space-x-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
        >
          <Star 
            size={18}
            className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        </motion.div>
      ))}
    </div>
  );
};

// 3D Card component with perspective effect
const TestimonialCard = ({ testimonial, direction }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((event.clientX - centerX) / 5);
    y.set((event.clientY - centerY) / 5);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  const slideVariants = {
    hidden: (direction) => ({
      x: direction === "right" ? 500 : -500,
      opacity: 0,
      scale: 0.8,
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        damping: 25,
        stiffness: 300,
      }
    },
    exit: (direction) => ({
      x: direction === "right" ? -500 : 500,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      }
    })
  };
  
  return (
    <motion.div 
      custom={direction}
      variants={slideVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute inset-0 p-6 md:p-10 flex flex-col justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/50 relative overflow-hidden transition-all duration-300"
      >
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full opacity-50" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-50 rounded-full opacity-50" />
        
        <div className="relative">
          {/* Top section */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-white shadow-md"
                >
                  {testimonial.company.charAt(0)}
                </motion.div>
              </div>
              <div>
                <h4 className="font-bold text-xl text-gray-800">{testimonial.name}</h4>
                <p className="text-blue-600 font-medium">{testimonial.role}</p>
                <div className="text-xs text-gray-500 mt-1">{testimonial.company} Sector</div>
              </div>
            </div>
            <Quote className="text-blue-400 hidden md:block opacity-40" size={48} />
          </div>
          
          {/* Rating and highlight */}
          <div className="mb-6">
            <RatingStars rating={testimonial.rating} />
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center space-x-2 text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full w-fit"
            >
              <CheckCircle2 size={16} />
              <span>{testimonial.highlight}</span>
            </motion.div>
          </div>
          
          {/* Testimonial text - Fixed to show full comment with proper height and scroll */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-700 leading-relaxed italic relative z-10 max-h-32 md:max-h-40 overflow-y-auto testimonial-scroll pr-2"
          >
            <p>"{testimonial.text}"</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Logo marquee animation with enhanced styling
const LogoMarquee = ({ logos }) => {
  return (
    <div className="relative w-full overflow-hidden h-20 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm">
      <motion.div
        className="flex space-x-12 absolute whitespace-nowrap items-center h-full px-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }
        }}
      >
        {[...logos, ...logos].map((logo, idx) => (
          <div key={idx} className="flex items-center justify-center">
            <div className="h-10 w-24 rounded-md overflow-hidden bg-white shadow-sm flex items-center justify-center">
              <img src={logo.logo} alt={logo.alt} className="h-8 w-8 object-cover rounded-full" />
              <span className="ml-2 text-xs font-medium text-gray-700">{logo.name}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const autoplayRef = useRef(null);
  
  const nextTestimonial = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Setup autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      nextTestimonial();
    }, 7000);
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, []);

  // Reset interval on manual navigation
  const handleManualNav = (callback) => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    callback();
    autoplayRef.current = setInterval(() => {
      nextTestimonial();
    }, 7000);
  };

  // Add custom scrollbar styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .testimonial-scroll::-webkit-scrollbar {
        width: 4px;
      }
      .testimonial-scroll::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }
      .testimonial-scroll::-webkit-scrollbar-thumb {
        background: #d1d5db;
        border-radius: 10px;
      }
      .testimonial-scroll::-webkit-scrollbar-thumb:hover {
        background: #6366f1;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-blue-pattern opacity-5" />
      <ParticleEffect count={30} />
      <FloatingElement size="400px" color="rgba(99, 102, 241, 0.15)" x={-100} y={100} duration={20} delay={0} />
      <FloatingElement size="300px" color="rgba(59, 130, 246, 0.1)" x={500} y={200} duration={25} delay={2} />
      <FloatingElement size="350px" color="rgba(139, 92, 246, 0.08)" x={200} y={-50} duration={18} delay={5} />
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4"
          >
            Client Stories
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-6"
          />
          
          <p className="max-w-xl mx-auto text-gray-600 text-lg">
            Discover why leading businesses trust us for their global HR and payroll needs
          </p>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto mb-20">
          {/* Testimonial carousel - Increased height to fit full comments */}
          <div className="relative h-[500px] md:h-[400px] overflow-hidden rounded-2xl">
            <div className="absolute left-0 top-0 w-full h-full bg-white/20 backdrop-blur-sm rounded-2xl" />
            
            <AnimatePresence mode="wait" custom={direction}>
              <TestimonialCard 
                key={currentIndex} 
                testimonial={testimonials[currentIndex]} 
                direction={direction} 
              />
            </AnimatePresence>
          </div>
          
          {/* Navigation and progress */}
          <div className="mt-10 flex flex-col md:flex-row md:items-center justify-between">
            {/* Progress indicator */}
            <div className="flex items-center space-x-3 mb-6 md:mb-0 justify-center md:justify-start">
              {testimonials.map((_, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative h-3 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "bg-blue-600 w-10" : "bg-gray-300 w-3"
                  }`}
                  onClick={() => {
                    setDirection(idx > currentIndex ? "right" : "left");
                    setCurrentIndex(idx);
                    if (autoplayRef.current) {
                      clearInterval(autoplayRef.current);
                      autoplayRef.current = setInterval(nextTestimonial, 7000);
                    }
                  }}
                  aria-label={`Go to testimonial ${idx + 1}`}
                >
                  {idx === currentIndex && (
                    <motion.div
                      className="absolute inset-0 bg-blue-400 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 7, ease: "linear" }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "#EEF2FF" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleManualNav(prevTestimonial)}
                className="bg-white text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={22} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "#EEF2FF" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleManualNav(nextTestimonial)}
                className="bg-white text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight size={22} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Company logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <h3 className="text-center text-gray-500 font-medium mb-6">Trusted by top companies worldwide</h3>
          <LogoMarquee logos={companyLogos} />
        </motion.div>
      </div>
    </section>
  );
}