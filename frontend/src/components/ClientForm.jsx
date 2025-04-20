import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { 
  Mail, 
  User, 
  Building2, 
  Globe, 
  FileText, 
  ListChecks, 
  Send, 
  Sparkles
} from "lucide-react";

export default function ClientForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [activeField, setActiveField] = useState(null); 
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      countryCode: "",
      companyName: "",
      country: "",
      service: "",
      description: "",
    },
    mode: "onChange"
  });

  // Fix for phone number - ensure proper initialization and watch behavior
  const phoneValue = watch("phoneNumber");

  useEffect(() => {
    // Initialize the phone with empty value to prevent random values
    setValue("phoneNumber", "");
    
    // Animation for form appearance
    const timer = setTimeout(() => {
      setIsFormVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [setValue]);

  // Handle successful form submission effect
  useEffect(() => {
    if (isSubmitSuccessful) {
      // Reset form after successful submission
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/clients/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          companyName: data.companyName,
          country: data.country,
          service: data.service,
          description: data.description,
        }),
      });

      if (response.ok) {
        toast.success("Thanks! Your request has been submitted ✅", {
          duration: 5000,
        });
        reset();
      } else {
        toast.error("Something went wrong. Please try again ❌");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Server error. Please try again later ⚠️");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  // Function to get field animation class
  const getFieldAnimClass = (fieldName) => {
    return activeField === fieldName ? "scale-105" : "";
  };

  return (
    <div className="w-11/12 max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 rounded-2xl shadow-xl mt-8 border border-blue-100 relative overflow-hidden">
        {/* Enhanced decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400 rounded-full filter blur-xl opacity-20 -mr-24 -mt-24 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400 rounded-full filter blur-xl opacity-20 -ml-24 -mb-24 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-purple-400 rounded-full filter blur-xl opacity-10 animate-pulse"></div>
        
        {/* Mesh gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-indigo-50/40 to-purple-50/40 z-0"></div>
        
        <div className="relative z-10">
          <div className={`flex items-center justify-center mb-2 transition-all duration-700 ${isFormVisible ? 'opacity-100' : 'opacity-0 transform translate-y-4'}`}>
            <Sparkles className="text-blue-500 mr-2 animate-pulse" size={24} />
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
          </div>
          
          <p className={`text-center text-gray-600 mb-6 max-w-lg mx-auto text-sm transition-all duration-700 delay-100 ${isFormVisible ? 'opacity-100' : 'opacity-0 transform translate-y-4'}`}>
            Fill out this form and our team will get back to you within 24 hours to discuss how we can help your business grow.
          </p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div 
                className={`relative group transition-all duration-300 ${getFieldAnimClass('firstName')}`}
                onFocus={() => handleFocus('firstName')}
                onBlur={handleBlur}
              >
                <User className="absolute left-3 top-3 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  {...register("firstName", { required: "First name is required" })}
                  placeholder="First Name *"
                  className={`w-full pl-10 py-2.5 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all text-sm ${isFormVisible ? 'animate-formFieldFadeIn' : 'opacity-0'}`}
                  style={{animationDelay: '100ms'}}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1 animate-errorShake">{errors.firstName.message}</p>
                )}
              </div>
              
              <div 
                className={`relative group transition-all duration-300 ${getFieldAnimClass('lastName')}`}
                onFocus={() => handleFocus('lastName')}
                onBlur={handleBlur}
              >
                <User className="absolute left-3 top-3 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  {...register("lastName")}
                  placeholder="Last Name"
                  className={`w-full pl-10 py-2.5 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all text-sm ${isFormVisible ? 'animate-formFieldFadeIn' : 'opacity-0'}`}
                  style={{animationDelay: '200ms'}}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div 
                className={`relative group transition-all duration-300 ${getFieldAnimClass('email')}`}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
              >
                <Mail className="absolute left-3 top-3 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  type="email"
                  placeholder="Email Address *"
                  className={`w-full pl-10 py-2.5 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all text-sm ${isFormVisible ? 'animate-formFieldFadeIn' : 'opacity-0'}`}
                  style={{animationDelay: '300ms'}}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 animate-errorShake">{errors.email.message}</p>
                )}
              </div>
              
              <div 
                className={`relative group transition-all duration-300 ${getFieldAnimClass('companyName')}`}
                onFocus={() => handleFocus('companyName')}
                onBlur={handleBlur}
              >
                <Building2 className="absolute left-3 top-3 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  {...register("companyName", { required: "Company name is required" })}
                  placeholder="Company Name *"
                  className={`w-full pl-10 py-2.5 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all text-sm ${isFormVisible ? 'animate-formFieldFadeIn' : 'opacity-0'}`}
                  style={{animationDelay: '400ms'}}
                />
                {errors.companyName && (
                  <p className="text-xs text-red-500 mt-1 animate-errorShake">{errors.companyName.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div 
                className={`relative z-30 group transition-all duration-300 ${getFieldAnimClass('phone')}`}
                onFocus={() => handleFocus('phone')}
                onBlur={handleBlur}
              >
                <div className={`phone-input-container ${isFormVisible ? 'animate-formFieldFadeIn' : 'opacity-0'}`} style={{animationDelay: '500ms'}}>
                  <PhoneInput
                    country={"in"}
                    value={phoneValue}
                    onChange={(value, country) => {
                      setValue("phoneNumber", value);
                      setValue("countryCode", country.dialCode);
                    }}
                    inputProps={{
                      name: "phoneNumber",
                      required: true,
                      className: "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all phone-input text-sm",
                      onFocus: () => handleFocus('phone'),
                      onBlur: handleBlur
                    }}
                    inputStyle={{
                      width: "100%",
                      height: "42px",
                      borderRadius: "0.5rem",
                      fontSize: "14px",
                      paddingLeft: "48px",
                      border: "1px solid #bfdbfe",  // blue-200
                    }}
                    buttonStyle={{
                      borderTopLeftRadius: "0.5rem",
                      borderBottomLeftRadius: "0.5rem",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    containerStyle={{
                      width: "100%",
                    }}
                    dropdownStyle={{
                      width: "260px", // More compact dropdown
                      maxHeight: "250px", // Limit height
                      zIndex: 99, // Ensure high z-index
                    }}
                    enableSearch={true}
                    searchPlaceholder="Search countries..."
                  />
                </div>
              </div>
              
              <div 
                className={`relative group transition-all duration-300 ${getFieldAnimClass('country')}`}
                onFocus={() => handleFocus('country')}
                onBlur={handleBlur}
              >
                <Globe className="absolute left-3 top-3 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  {...register("country")}
                  placeholder="Country (Optional)"
                  className={`w-full pl-10 py-2.5 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all text-sm ${isFormVisible ? 'animate-formFieldFadeIn' : 'opacity-0'}`}
                  style={{animationDelay: '600ms'}}
                />
              </div>
            </div>

            <div 
              className={`relative group transition-all duration-300 ${getFieldAnimClass('service')}`}
              onFocus={() => handleFocus('service')}
              onBlur={handleBlur}
            >
              <ListChecks className="absolute left-3 top-3 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <select
                {...register("service", { required: "Please select a service" })}
                className={`w-full pl-10 py-2.5 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all appearance-none text-sm ${isFormVisible ? 'animate-formFieldFadeIn' : 'opacity-0'}`}
                style={{animationDelay: '700ms'}}
              >
                <option value="">Select a Service *</option>
                <option value="EOR">EOR Services</option>
                <option value="HR">HR Consultancy & Payroll</option>
              </select>
              {errors.service && (
                <p className="text-xs text-red-500 mt-1 animate-errorShake">{errors.service.message}</p>
              )}
            </div>
            
            <div 
              className={`relative group transition-all duration-300 ${getFieldAnimClass('description')}`}
              onFocus={() => handleFocus('description')}
              onBlur={handleBlur}
            >
              <FileText className="absolute left-3 top-3 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <textarea
                {...register("description")}
                placeholder="Tell us more about your requirements (Optional)"
                rows="3"
                className={`w-full pl-10 py-2.5 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all resize-none text-sm ${isFormVisible ? 'animate-formFieldFadeIn' : 'opacity-0'}`}
                style={{animationDelay: '800ms'}}
              />
            </div>
            
            <div className={`flex justify-center pt-2 ${isFormVisible ? 'animate-formFieldFadeIn' : 'opacity-0'}`} style={{animationDelay: '900ms'}}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-2.5 rounded-lg font-medium flex items-center transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-lg text-sm"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Your Request <Send className="ml-2" size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Add a global style for animations and fixes */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes formFieldFadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes errorShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.6); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        
        .animate-formFieldFadeIn {
          animation: formFieldFadeIn 0.5s ease-out forwards;
        }
        
        .animate-errorShake {
          animation: errorShake 0.4s ease-in-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        /* Fix for phone input and country flag */
        .phone-input-container {
          position: relative;
          z-index: 40;
        }
        
        .phone-input-container .react-tel-input {
          font-family: inherit;
        }
        
        .phone-input-container .react-tel-input .flag-dropdown {
          border: none;
          background-color: transparent;
        }
        
        .phone-input-container .react-tel-input .selected-flag {
          padding-left: 11px;
          background-color: transparent;
        }
        
        /* Ensure dropdown is visible */
        .phone-input-container .react-tel-input .country-list {
          z-index: 999;
          margin: 0;
          padding: 0;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          border-radius: 0.5rem;
          margin-top: 8px;
          max-height: 250px;
          overflow-y: auto;
          width: min(260px, 80vw);
          border: 1px solid #e5e7eb;
          background-color: white;
        }
        
        /* Style the country options */
        .phone-input-container .react-tel-input .country-list .country {
          padding: 6px 8px;
          display: flex;
          align-items: center;
          font-size: 14px;
        }
        
        .phone-input-container .react-tel-input .country-list .country.highlight {
          background-color: #EFF6FF;  /* blue-50 */
        }
        
        .phone-input-container .react-tel-input .country-list .country:hover {
          background-color: #DBEAFE;  /* blue-100 */
        }
        
        /* Style search box */
        .phone-input-container .react-tel-input .search-box {
          margin: 6px;
          padding: 6px;
          border-radius: 6px;
          border: 1px solid #bfdbfe;
          outline: none;
          font-size: 14px;
        }
        
        .phone-input-container .react-tel-input .search-box:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
        
        /* Custom styles for select dropdown */
        select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-position: right 0.75rem center;
          background-repeat: no-repeat;
          background-size: 1rem;
        }
      `}</style>
    </div>
  );
}


