import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { useAuth } from '../context/authContext';
import Navbar from '../components/NavBar';

const ChatbotPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const { token } = useAuth();

    // Initial welcome message
    useEffect(() => {
        const welcomeMessage = {
            type: 'bot',
            content: `Hello! I'm your smartphone shopping assistant.

I can help you with:
• Finding the perfect smartphone based on your needs and budget
• Comparing different models and their features
• Providing detailed information about specific phones
• Answering questions about specifications, pricing, and availability

Feel free to ask me anything about our smartphone collection! What would you like to know?`
        };
        setMessages([welcomeMessage]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const userMessage = inputMessage.trim();
        setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ message: userMessage })
            });

            if (!response.ok) {
                throw new Error('Failed to get response from chatbot');
            }

            const data = await response.json();
            setMessages(prev => [...prev, { type: 'bot', content: data.response }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                type: 'bot',
                content: 'Daily limit reached. You can only make 4 requests per day.',
                error: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            < Navbar />
            <div className="min-h-screen bg-gray-50 pt-16">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Product Assistant
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Ask me anything about our smartphones!
                        </p>
                    </div>

                    {/* Chat Container */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Messages Area */}
                        <div className="h-[600px] overflow-y-auto p-4 space-y-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'
                                        }`}
                                >
                                    <div
                                        className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                                            }`}
                                    >
                                        <div className="flex-shrink-0">
                                            {message.type === 'user' ? (
                                                <div className="bg-gray-200 rounded-full p-2">
                                                    <User className="h-4 w-4 text-gray-600" />
                                                </div>
                                            ) : (
                                                <div className="bg-blue-100 rounded-full p-2">
                                                    <Bot className="h-4 w-4 text-blue-600" />
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={`rounded-lg px-4 py-2 ${message.type === 'user'
                                                    ? 'bg-gray-900 text-white'
                                                    : message.error
                                                        ? 'bg-red-50 text-red-600'
                                                        : 'bg-gray-100 text-gray-900'
                                                }`}
                                        >
                                            <p className="whitespace-pre-wrap">{message.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    placeholder="Ask about our smartphones..."
                                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !inputMessage.trim()}
                                    className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    <Send className="h-5 w-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatbotPage;