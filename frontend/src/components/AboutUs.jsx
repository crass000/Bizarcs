import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function AboutUs() {
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const textInView = useInView(textRef, { once: true, amount: 0.3 });
  const imageInView = useInView(imageRef, { once: true, amount: 0.3 });

  return (
    <section id="about" className="py-24 px-4 bg-gradient-to-br from-white to-blue-50 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, rotateY: 15, scale: 0.9 }}
          animate={imageInView ? { opacity: 1, rotateY: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-3xl blur-lg opacity-30 animate-pulse"></div>
          <div className="relative perspective-1000">
            <img
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
              alt="About Bizarcs"
              className="rounded-3xl shadow-2xl w-full object-cover z-10 relative"
              style={{ 
                transformStyle: "preserve-3d", 
                transform: "rotateX(2deg) rotateY(2deg)" 
              }}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-600/20 to-transparent rounded-3xl"></div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-blue-300/30 rounded-full blur-3xl"></div>
          <div className="absolute -z-10 -bottom-10 -right-10 w-56 h-56 bg-indigo-400/20 rounded-full blur-3xl"></div>
        </motion.div>
        
        <motion.div
          ref={textRef}
          initial={{ opacity: 0, x: 30 }}
          animate={textInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-blue-100 text-blue-800 text-sm font-medium tracking-wider">
            ABOUT US
          </div>
          <h3 className="text-4xl font-bold text-blue-800 mb-6 leading-tight">We're Redefining Global Employment</h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            At Bizarcs, we specialize in helping businesses scale globally by simplifying HR, payroll,
            and legal compliance. With a passion for empowering talent across borders,
            we partner with companies to manage everything from employment to regulations,
            so you can focus on growth.
          </p>
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span className="text-blue-700 text-xl font-bold">15+</span>
              </div>
              <p className="text-gray-700">Countries Supported</p>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span className="text-blue-700 text-xl font-bold">5k+</span>
              </div>
              <p className="text-gray-700">Employees Managed</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}