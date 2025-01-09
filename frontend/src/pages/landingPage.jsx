import React from 'react';
import { ArrowRight, Smartphone, Shield, Timer, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleExploreClick = () => {
    if (token) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-gray-100 to-gray-200">
          {/* Decorative Elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(30deg,#f0f0f0_12%,transparent_12.5%,transparent_87%,#f0f0f0_87.5%,#f0f0f0)] bg-[length:20px_20px]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="pt-20 pb-24">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">The Future of</span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-900">
                    Mobile Technology
                  </span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Discover the next generation of smartphones. Experience innovation at your fingertips.
                </p>
                <div className="mt-10">
                  <button 
                    className="inline-flex items-center px-8 py-4 border-2 border-gray-900 text-base font-medium rounded-full text-gray-900 bg-transparent hover:bg-gray-900 hover:text-white transition-all duration-300"
                    onClick={handleExploreClick}
                  >
                    {token ? 'View Collection' : 'Explore Collection'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Premium Experience
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Elevating your mobile experience with cutting-edge technology
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {/* Feature 1 */}
              <div className="group">
                <div className="flex flex-col items-center p-8 bg-gray-50 rounded-2xl hover:bg-gradient-to-b hover:from-white hover:to-gray-50 transition-all duration-300 border border-gray-100">
                  <div className="p-4 bg-white rounded-xl shadow-lg">
                    <Smartphone className="h-8 w-8 text-gray-900" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900">Premium Devices</h3>
                  <p className="mt-2 text-base text-gray-500 text-center">
                    Authentic products from authorized brands
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group">
                <div className="flex flex-col items-center p-8 bg-gray-50 rounded-2xl hover:bg-gradient-to-b hover:from-white hover:to-gray-50 transition-all duration-300 border border-gray-100">
                  <div className="p-4 bg-white rounded-xl shadow-lg">
                    <Shield className="h-8 w-8 text-gray-900" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900">Official Warranty</h3>
                  <p className="mt-2 text-base text-gray-500 text-center">
                    Complete with official distributor warranty
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group">
                <div className="flex flex-col items-center p-8 bg-gray-50 rounded-2xl hover:bg-gradient-to-b hover:from-white hover:to-gray-50 transition-all duration-300 border border-gray-100">
                  <div className="p-4 bg-white rounded-xl shadow-lg">
                    <Timer className="h-8 w-8 text-gray-900" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900">Fast Delivery</h3>
                  <p className="mt-2 text-base text-gray-500 text-center">
                    Swift nationwide shipping service
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="group">
                <div className="flex flex-col items-center p-8 bg-gray-50 rounded-2xl hover:bg-gradient-to-b hover:from-white hover:to-gray-50 transition-all duration-300 border border-gray-100">
                  <div className="p-4 bg-white rounded-xl shadow-lg">
                    <Trophy className="h-8 w-8 text-gray-900" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900">Chatbot Service</h3>
                  <p className="mt-2 text-base text-gray-500 text-center">
                    Supported by chatbot customer service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-100 to-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">
            <div className="px-8 py-16 sm:px-16">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Stay Updated
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Subscribe to our newsletter for latest products and exclusive offers
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="inline-flex rounded-full shadow-sm">
                    <input
                      type="email"
                      className="px-6 py-4 w-64 rounded-l-full border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 focus:outline-none"
                      placeholder="Enter your email"
                    />
                    <button className="px-8 py-4 bg-gray-900 text-white font-medium rounded-r-full hover:bg-gray-800 transition-colors duration-300">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;