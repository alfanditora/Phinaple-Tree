import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, WalletCards, Copy, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/authContext';
import { QRCodeSVG } from 'qrcode.react';


const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [selectedCurrency, setSelectedCurrency] = useState('SOL');
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [copied, setCopied] = useState(false);

  const product = location.state?.product;

  useEffect(() => {
    if (!product) {
      navigate('/products');
    }
  }, [product, navigate]);

  // Countdown timer effect
  useEffect(() => {
    if (paymentData && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/payment/expired');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [paymentData, timeLeft, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const createPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          productID: product.id,
          currency: selectedCurrency,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create payment');
      }

      const data = await response.json();
      setPaymentData(data.data);
      startPaymentCheck(data.data.id);
      setTimeLeft(300); // Reset timer to 5 minutes

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async (paymentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/payment/check/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setPaymentStatus(data.data);
      return data.data.isPaid;

    } catch (err) {
      console.error('Error checking payment:', err);
      return false;
    }
  };

  const startPaymentCheck = async (paymentId) => {
    setCheckingPayment(true);
    let isPaid = false;
    let attempts = 0;
    const maxAttempts = 60;

    while (!isPaid && attempts < maxAttempts) {
      isPaid = await checkPaymentStatus(paymentId);
      if (isPaid) {
        navigate('/payment/success', { state: { paymentId } });
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;
    }
    setCheckingPayment(false);
  };

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Product
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-900 to-gray-800">
            <h2 className="text-xl font-semibold text-white">Complete Your Purchase</h2>
            <p className="mt-1 text-sm text-gray-300">
              Pay with cryptocurrency for {product.name}
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Product Details Card */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700">Product Details</h3>
              <div className="mt-2">
                <p className="font-semibold text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <p className="mt-1 text-lg font-bold text-gray-900">${product.price}</p>
              </div>
            </div>

            {/* Currency Selection */}
            {!paymentData && (
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Payment Currency
                </label>
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                >
                  <option value="SOL">Solana (SOL)</option>
                  <option value="USDT">USDT</option>
                </select>
              </div>
            )}

            {/* Payment Details with QR Code */}
            {paymentData && (
              <div className="space-y-6">
                {/* Timer */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    Time Remaining: {formatTime(timeLeft)}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Payment will expire after 5 minutes
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* QR Code */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Scan QR Code</h3>
                    <QRCodeSVG 
                      value={paymentData.walletAddress}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  </div>

                  {/* Payment Details */}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Payment Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500">Amount</label>
                        <p className="text-lg font-bold">{paymentData.amount} {paymentData.currency}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Wallet Address</label>
                        <div className="mt-1 flex items-center">
                          <input
                            type="text"
                            value={paymentData.walletAddress}
                            readOnly
                            className="block w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md"
                          />
                          <button
                            onClick={() => copyToClipboard(paymentData.walletAddress)}
                            className="ml-2 p-2 text-gray-500 hover:text-gray-700"
                          >
                            {copied ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {checkingPayment && (
                  <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    <p className="text-sm text-blue-700">Checking payment status...</p>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>

          {!paymentData && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={createPayment}
                disabled={loading}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <WalletCards className="h-5 w-5 mr-2" />
                    Proceed to Payment
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;