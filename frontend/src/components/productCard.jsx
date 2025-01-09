import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleImageError = (e) => {
    e.target.src = '/api/placeholder/600/600'; // Fallback image
  };

  return (
    <div
      key={product.id}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group"
    >
      {/* Product Image */}
      <div
        className="w-full bg-white flex justify-center items-center"
        style={{ height: '200px', maxHeight: '200px' }} // Fixed image container height
      >
        <img
          src={product.image}
          alt={product.name}
          onError={handleImageError}
          className="h-full object-contain" // Ensures image fits inside the container
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col justify-between flex-grow relative">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.brand}</p>
        </div>
        <div className="mt-4">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
        </div>

        {/* View Details Button (Hidden by default, visible on hover) */}
        <button
          className="absolute bottom-4 right-4 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => navigate(`/product/${product.name}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
