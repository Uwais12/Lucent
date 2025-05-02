'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import {
  Mail,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general' // general, feature, support
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email to uwais_i@outlook.com
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recipient: 'uwais_i@outlook.com'
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      // Success
      setStatus({
        submitted: true,
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      });
    } catch (error) {
      setStatus({
        submitted: true,
        success: false,
        message: 'There was an error submitting your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 mb-4">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;d love to hear from you. Whether you have a question, feedback, or want to request a feature, our team is here to help.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto mb-16">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              {status.submitted && (
                <div className={`mb-6 p-4 rounded-lg ${status.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {status.success ? (
                      <CheckCircle className={`w-5 h-5 ${status.success ? 'text-green-600' : 'text-red-600'}`} />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                    <p className={`font-medium ${status.success ? 'text-green-800' : 'text-red-800'}`}>
                      {status.success ? 'Message Sent' : 'Error'}
                    </p>
                  </div>
                  <p className={status.success ? 'text-green-700' : 'text-red-700'}>
                    {status.message}
                  </p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Message Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="feature">Feature Request</option>
                    <option value="support">Support</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-fuchsia-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Feature Request Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Feature Requests</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We&apos;re constantly improving Lucent based on your feedback. Have an idea for a feature that would enhance your learning experience? Let us know!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 border border-gray-200 rounded-lg bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                  <span className="text-violet-600 font-bold">1</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Submit Your Idea</h3>
                <p className="text-gray-600">
                  Use the contact form to send us your feature request with as much detail as possible.
                </p>
              </div>
              
              <div className="p-5 border border-gray-200 rounded-lg bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                  <span className="text-violet-600 font-bold">2</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Review Process</h3>
                <p className="text-gray-600">
                  Our product team reviews all requests and evaluates them based on user need and feasibility.
                </p>
              </div>
              
              <div className="p-5 border border-gray-200 rounded-lg bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                  <span className="text-violet-600 font-bold">3</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Implementation</h3>
                <p className="text-gray-600">
                  If approved, your feature will be added to our development roadmap and you&apos;ll be notified when it launches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 