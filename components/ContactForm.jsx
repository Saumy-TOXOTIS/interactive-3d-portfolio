import React, { useState } from 'react';
import { Send } from 'lucide-react';
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a backend service
    setIsSubmitted(true);
    // Reset form after a delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 3000);
  };
  if (isSubmitted) {
    return <div className="text-center p-8 bg-gray-800/50 backdrop-blur-md rounded-lg border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white">Thank You!</h3>
                <p className="text-gray-300 mt-2">Your message has been sent successfully.</p>
            </div>;
  }
  return <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-8 bg-gray-800/50 backdrop-blur-md rounded-lg border border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="form-input" placeholder="John Doe" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="form-input" placeholder="john.doe@example.com" />
                </div>
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea name="message" id="message" required rows={5} value={formData.message} onChange={handleChange} className="form-input" placeholder="Your message here..."></textarea>
            </div>
            <div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold text-lg px-8 py-3 rounded-full hover:bg-indigo-500 transition-colors duration-300 shadow-lg shadow-indigo-600/30 focus:outline-none focus:ring-4 focus:ring-indigo-500/50">
                    Send Message <Send size={20} />
                </button>
            </div>
        </form>;
};
export default ContactForm;