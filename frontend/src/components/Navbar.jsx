import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";

const Navbar = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", href: "#home", id: "home", isRoute: false },
    { title: "About", href: "#about", id: "about", isRoute: false },
    { title: "Services", href: "#services", id: "services", isRoute: false },
    { title: "Contact", href: "#contact", id: "contact", isRoute: false },
    // { title: "Testimonials", href: "#testimonials", id: "testimonials", isRoute: false },
    { title: "Blogs", href: "#blogs", id: "blogs", isRoute: false },
    { title: "News", href: "#news", id: "news", isRoute: false },
    { title: "Careers", href: "/careers", id: "careers", isRoute: true },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center z-50">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">B</span>
              </div>
              <span className={`ml-2 text-2xl font-bold ${scrolled ? 'text-blue-700' : 'text-blue-700'}`}>
                Bizarcs
              </span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                {link.isRoute ? (
                  <Link
                    to={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                      activeSection === link.id
                        ? "text-blue-700"
                        : "text-gray-600 hover:text-blue-700"
                    }`}
                  >
                    {link.title}
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                      activeSection === link.id
                        ? "text-blue-700"
                        : "text-gray-600 hover:text-blue-700"
                    }`}
                  >
                    {link.title}
                    {activeSection === link.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact Button */}
        <div className="hidden md:block">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className={`px-5 py-2 rounded-lg text-white font-medium transition-all ${
              scrolled
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                : "bg-blue-600/90 hover:bg-blue-700"
            }`}
          >
            Contact Us
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="w-6 flex flex-col space-y-1">
              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 8 : 0,
                }}
                className={`block h-0.5 w-6 rounded transition-all ${
                  scrolled || isOpen ? "bg-blue-700" : "bg-blue-700"
                }`}
              ></motion.span>
              <motion.span
                animate={{
                  opacity: isOpen ? 0 : 1,
                }}
                className={`block h-0.5 w-6 rounded transition-all ${
                  scrolled || isOpen ? "bg-blue-700" : "bg-blue-700"
                }`}
              ></motion.span>
              <motion.span
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -8 : 0,
                }}
                className={`block h-0.5 w-6 rounded transition-all ${
                  scrolled || isOpen ? "bg-blue-700" : "bg-blue-700"
                }`}
              ></motion.span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 bg-white/95 backdrop-blur-lg md:hidden"
          >
            <div className="h-full flex flex-col items-center justify-center">
              <ul className="flex flex-col items-center space-y-6 py-8">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        className={`text-xl font-medium ${
                          activeSection === link.id
                            ? "text-blue-700"
                            : "text-gray-700"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.title}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className={`text-xl font-medium ${
                          activeSection === link.id
                            ? "text-blue-700"
                            : "text-gray-700"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.title}
                      </a>
                    )}
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-8"
              >
                <a
                  href="#contact"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
