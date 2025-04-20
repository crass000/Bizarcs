import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag, Clock } from "lucide-react";
import { useEffect, useState } from "react";

// Sample blog data - in a real app this would come from an API
const blogData = [
  {
    id: "1",
    title: "How EOR Services Simplify Global Expansion",
    author: "Emma Thompson",
    date: "April 15, 2025",
    readTime: "8 min read",
    category: "Global HR",
    heroImage: "https://images.pexels.com/photos/3184466/pexels-photo-3184466.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: `
      <p class="text-lg mb-4">Expanding your business globally has never been more accessible than it is today. With the rise of remote work and digital transformation, companies of all sizes can tap into international markets and talent pools.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">What is an Employer of Record?</h2>
      <p class="mb-4">An Employer of Record (EOR) is a third-party organization that takes on the legal and administrative responsibilities of employing workers on behalf of another company. This arrangement allows businesses to hire employees in countries where they don't have a legal entity.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Key Benefits of Using an EOR</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Rapid market entry without establishing a legal entity</li>
        <li>Compliance with local labor laws and regulations</li>
        <li>Simplified payroll and tax management</li>
        <li>Reduced administrative burden</li>
        <li>Minimized legal risks</li>
      </ul>
      
      <p class="mb-4">With an EOR like Bizarcs, you can focus on your core business operations while we handle the complexities of international employment.</p>
    `
  },
  {
    id: "2",
    title: "Top 5 HR Challenges and How to Solve Them",
    author: "Michael Chen",
    date: "April 8, 2025",
    readTime: "6 min read",
    category: "HR Strategy",
    heroImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: `
      <p class="text-lg mb-4">Human Resources departments face evolving challenges in today's rapidly changing work environment. From remote work management to talent retention, HR professionals must continuously adapt their strategies.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">1. Remote Work Management</h2>
      <p class="mb-4">As remote work becomes more prevalent, HR teams must develop effective policies and tools to manage distributed teams while maintaining company culture and productivity.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">2. Talent Acquisition and Retention</h2>
      <p class="mb-4">In a competitive job market, attracting and retaining top talent requires innovative approaches to employer branding, benefits packages, and career development opportunities.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">3. Compliance with International Regulations</h2>
      <p class="mb-4">For global companies, staying compliant with various labor laws and regulations across different jurisdictions can be overwhelming without proper expertise and systems in place.</p>
    `
  },
  {
    id: "3",
    title: "Payroll Compliance Tips for Startups",
    author: "Sophia Rodriguez",
    date: "March 29, 2025",
    readTime: "5 min read",
    category: "Payroll",
    heroImage: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800",
    content: `
      <p class="text-lg mb-4">For startups, managing payroll compliance can be a significant challenge. Limited resources, rapid growth, and changing regulations create a complex landscape that young companies must navigate carefully.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Understand Your Tax Obligations</h2>
      <p class="mb-4">Every country and often regions within countries have different tax requirements. Ensure you understand income tax withholding, social security contributions, and other mandatory deductions in each location where you have employees.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Document Everything</h2>
      <p class="mb-4">Maintain detailed records of all payroll processes, payments, and tax filings. Good documentation is essential for audits and helps ensure consistency in your payroll operations.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Stay Updated on Regulatory Changes</h2>
      <p class="mb-4">Tax laws and employment regulations change frequently. Establish a system to stay informed about updates in all relevant jurisdictions and adjust your payroll processes accordingly.</p>
    `
  }
];

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    const fetchBlog = setTimeout(() => {
      const foundBlog = blogData.find(blog => blog.id === id);
      setBlog(foundBlog || null);
      
      // Get related posts (excluding current)
      if (foundBlog) {
        setRelatedPosts(blogData.filter(post => post.id !== id).slice(0, 2));
      }
      
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(fetchBlog);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Blog not found</h2>
        <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with parallax effect */}
      <div className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${blog.heroImage})`,
            transform: 'translateZ(0)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 mix-blend-multiply"></div>
        </div>
        
        <div className="absolute inset-x-0 bottom-0 p-8 text-white z-10 max-w-4xl mx-auto left-0 right-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-medium mb-4">
              {blog.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{blog.title}</h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-200">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-10 transition group"
          >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to all posts
          </Link>
          
          <article className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </article>
          
          {/* Share buttons */}
          <div className="border-t border-gray-200 mt-12 pt-8">
            <h3 className="text-lg font-semibold mb-4">Share this article</h3>
            <div className="flex gap-3">
              {["Twitter", "Facebook", "LinkedIn", "Email"].map((platform) => (
                <button 
                  key={platform}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-gray-700"
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
          
          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedPosts.map((post) => (
                  <Link key={post.id} to={`/blog-details/${post.id}`} className="group">
                    <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={post.heroImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <span className="text-sm text-blue-600 font-medium">{post.category}</span>
                        <h4 className="text-xl font-semibold mt-2 group-hover:text-blue-600 transition">
                          {post.title}
                        </h4>
                        <div className="flex items-center mt-4 text-sm text-gray-500">
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}