import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center z-50">
      <div className="relative">
        {/* Background circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-full bg-blue-100 blur-xl opacity-60"
          style={{ width: "300px", height: "300px", top: "-75px", left: "-75px" }}
        />

        <motion.div className="relative z-10">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-blue-600 mb-2">Bizarcs</div>
            <div className="text-gray-600 mb-6">Global HR Solutions</div>
          </motion.div>

          <div className="flex justify-center">
            <div className="w-full max-w-xs bg-white rounded-lg p-1 shadow-md">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;