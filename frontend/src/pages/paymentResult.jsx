import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowLeft, RotateCcw } from 'lucide-react';

export const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentId = location.state?.paymentId;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-2)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Payment Successful!
            </h2>
            <p className="text-gray-500 text-center mb-6">
              Thank you for your purchase. Your payment has been processed successfully.
            </p>

            {paymentId && (
              <div className="bg-gray-50 rounded-lg p-4 w-full mb-6">
                <p className="text-sm text-gray-600">
                  Payment ID: <span className="font-mono">{paymentId}</span>
                </p>
              </div>
            )}

            <div className="space-y-4 w-full">
              <button
                onClick={() => navigate('/home')}
                className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Continue Shopping
              </button>

              <button
                onClick={() => navigate('/history')}
                className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                View Order Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PaymentExpiredPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-2)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 flex flex-col items-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <XCircle className="h-10 w-10 text-red-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Payment Time Expired
            </h2>
            <p className="text-gray-500 text-center mb-6">
              The payment session has expired. Please try again with a new payment session.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 w-full mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700">
                    Payments must be completed within 5 minutes of initiation for security purposes.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 w-full">
              <button
                onClick={() => navigate(-2)}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Try Again
              </button>

              <button
                onClick={() => navigate('/home')}
                className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
