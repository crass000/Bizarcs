import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomePage from "./pages/HomePage";
import Careers from "./components/Careers";
import BlogDetails from "./components/BlogDetails";
import Testimonials from "./components/Testimonials";
import { Toaster } from "sonner";
import LoadingScreen from "./components/LoadingScreen";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/globals.css"; // You'll need to create this file for global styles

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="app-container"
          >
            <Router>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/blog-details/:id" element={<BlogDetails />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                </Routes>
              </AnimatePresence>
            </Router>
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster
        position="top-center"
        richColors
        expand
        toastOptions={{
          classNames: {
            toast: "rounded-xl shadow-lg border border-gray-100",
          },
          style: {
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(8px)",
          },
        }}
      />
    </>
  );
}

export default App;