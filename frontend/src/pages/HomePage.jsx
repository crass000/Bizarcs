import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Services from "../components/Services";
import Blogs from "../components/Blogs";
import News from "../components/News";
import ClientForm from "../components/ClientForm";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

// Background Sphere component for hero section
const AnimatedSphere = () => {
  return (
    <Sphere args={[1, 64, 64]}>
      <MeshDistortMaterial
        color="#4f46e5"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  );
};

// Section transition variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    }
  }
};

// Custom section component with animations
const AnimatedSection = ({ id, children, className }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  return (
    <section id={id} className={className}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = [
        "home",
        "about",
        "services",
        "blogs",
        "news",
        "contact",
        "testimonials",
      ];
      
      const currentScrollY = window.scrollY + 200;
      
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        
        if (
          el &&
          el.offsetTop <= currentScrollY &&
          el.offsetTop + el.offsetHeight > currentScrollY
        ) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax effect for hero section
  const parallaxOffset = -scrollY * 0.2;

  return (
    <div className="font-sans text-gray-800 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <Navbar activeSection={activeSection} />

      {/* Hero Section with 3D Background */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* 3D Background Canvas */}
        <div className="absolute inset-0 opacity-40">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            <AnimatedSphere />
          </Canvas>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute w-full h-full">
          <motion.div 
            className="absolute w-64 h-64 rounded-full bg-blue-200 blur-3xl opacity-20"
            animate={{ 
              x: [0, 30, 0], 
              y: [0, -30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 15, 
              ease: "easeInOut" 
            }}
            style={{ top: '20%', left: '10%' }}
          />
          <motion.div 
            className="absolute w-96 h-96 rounded-full bg-indigo-300 blur-3xl opacity-20"
            animate={{ 
              x: [0, -40, 0], 
              y: [0, 40, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 18, 
              ease: "easeInOut" 
            }}
            style={{ bottom: '10%', right: '15%' }}
          />
        </div>

        {/* Content */}
        <div className="relative max-w-5xl mx-auto text-center px-6 z-10">
          <motion.div
            style={{ y: parallaxOffset }}
            className="relative"
          >
            <motion.span 
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-9xl font-black text-blue-50 opacity-50 select-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              BIZARCS
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-blue-800 drop-shadow-sm relative"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Empowering Global HR
              </span>
              <br />
              <span className="text-gray-800">with Bizarcs</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            >
              Streamline your hiring, payroll, and compliance with our expert EOR
              and HR consultancy solutions.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <a
                href="#contact"
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-lg font-medium"
              >
                Get Started
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2, 
            ease: "easeInOut" 
          }}
        >
          <div className="w-8 h-12 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* About Us Section */}
      <AnimatedSection id="about" className="py-24">
        <AboutUs />
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection id="services" className="py-24">
        <Services />
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection id="testimonials" className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <Testimonials />
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection id="contact" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h3 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Get in Touch
              </span>
            </motion.h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fill out the form below to reach out to us. We'd love to hear from
              you.
            </p>
          </div>
          <motion.div 
            className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ClientForm />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Blogs Section */}
      <AnimatedSection id="blogs" className="py-24">
        <Blogs />
      </AnimatedSection>


      {/* News Section */}
      <AnimatedSection id="news" className="py-24">
        <News />
      </AnimatedSection>

      <Footer />
    </div>
  );
}