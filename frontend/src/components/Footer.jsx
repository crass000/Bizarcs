import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const footerVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const socialVariants = {
    hover: { scale: 1.15, rotate: 5, transition: { duration: 0.2 } }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    // Optional: Add toast or success message
  };

  return (
    <motion.footer 
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={footerVariants}
      className="relative overflow-hidden"
    >
      {/* 3D Grid Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-20 pb-12 px-6 bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Bizarcs</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 mt-2"></div>
            </div>
            <p className="text-gray-400 text-base mb-6 leading-relaxed">
              Empowering global businesses with expert EOR, HR, and payroll solutions. Streamline your operations with our award-winning services.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Linkedin, href: "https://www.linkedin.com/company/bizarcs", color: "text-blue-400 hover:text-blue-300" },
                { Icon: Twitter, href: "https://twitter.com/bizarcs", color: "text-blue-400 hover:text-blue-300" },
                { Icon: Facebook, href: "https://www.facebook.com/bizarcs", color: "text-blue-400 hover:text-blue-300" },
                { Icon: Instagram, href: "https://www.instagram.com/bizarcs", color: "text-blue-400 hover:text-blue-300" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors ${social.color}`}
                  whileHover="hover"
                  variants={socialVariants}
                >
                  <social.Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "#about" },
                { name: "Services", href: "#services" },
                { name: "Blog", href: "#blogs" },
                { name: "News", href: "#news" },
                { name: "Careers", href: "/careers" },
                { name: "Contact", href: "#contact" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <ChevronRight size={16} className="mr-2 text-blue-400 transform group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-blue-400 mr-3 mt-1" size={18} />
                <span className="text-gray-400">123 Global Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-blue-400 mr-3" size={18} />
                <a href="tel:+12345678901" className="text-gray-400 hover:text-white transition-colors">
                  +1 (234) 567-8901
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="text-blue-400 mr-3" size={18} />
                <a href="mailto:contact@bizarcs.com" className="text-gray-400 hover:text-white transition-colors">
                  contact@bizarcs.com
                </a>
              </li>
              <li className="flex items-center">
                <Clock className="text-blue-400 mr-3" size={18} />
                <span className="text-gray-400">Mon - Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates on global HR trends and company news.
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-md transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Bizarcs. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <motion.div 
        className="absolute top-0 left-0 w-full"
        animate={{ y: isHovered ? -5 : 0 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 90" className="fill-gray-900 w-full">
          <path d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,61.3C1200,48,1320,32,1380,24L1440,16L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
        </svg>
      </motion.div>
    </motion.footer>
  );
}
