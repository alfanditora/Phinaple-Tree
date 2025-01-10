import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/authContext';

const ProductDetailsPage = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://phonestore-chatbot-production.up.railway.app/api/products/${productName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productName, token]);

  const handlePayment = () => {
    navigate('/payment', {
      state: {
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          brand: product.brand
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading product details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  const specifications = [
    { label: 'Display', value: product.display },
    { label: 'Chipset', value: product.chipset },
    { label: 'RAM', value: product.ram },
    { label: 'Storage', value: product.storage },
    { label: 'Camera', value: product.camera },
    { label: 'Video', value: product.video },
    { label: 'Battery', value: product.battery },
    { label: 'Operating System', value: product.OS }
  ];

  // Handle image loading error by showing a fallback image
  const handleImageError = (e) => {
    e.target.src = '/api/placeholder/600/600'; // Fallback image
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:flex-shrink-0 md:w-1/2">
              <div className="aspect-w-1 aspect-h-1 bg-white">
                <img
                  src={product.image} // Menggunakan path gambar dari database
                  alt={product.name}
                  onError={handleImageError} // Fallback jika gambar tidak tersedia
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8 md:w-1/2">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-xl text-gray-600 mb-4">{product.brand}</p>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Technical Specifications
                </h2>
                <div className="grid gap-4">
                  {specifications.map((spec) => (
                    <div
                      key={spec.label}
                      className="border-b border-gray-200 pb-4 last:border-0"
                    >
                      <div className="text-sm text-gray-500">{spec.label}</div>
                      <div className="mt-1 text-gray-900">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buy Now Button */}
              <div className="mt-6">
                <button
                  onClick={handlePayment}
                  className="flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;