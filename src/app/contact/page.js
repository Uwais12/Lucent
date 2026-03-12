'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import {
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Lightbulb,
  HeadphonesIcon,
  ArrowRight
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          recipient: 'uwais_i@outlook.com'
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setStatus({
        submitted: true,
        success: true,
        message: 'Your message has been sent successfully! We\'ll get back to you soon.'
      });

      setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
    } catch (error) {
      setStatus({
        submitted: true,
        success: false,
        message: 'There was an error sending your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactTypes = [
    {
      icon: MessageSquare,
      title: 'General Inquiry',
      description: 'Questions about Lucent, our courses, or how things work.',
      value: 'general',
    },
    {
      icon: Lightbulb,
      title: 'Feature Request',
      description: 'Have an idea to make Lucent better? We\'d love to hear it.',
      value: 'feature',
    },
    {
      icon: HeadphonesIcon,
      title: 'Support',
      description: 'Having trouble with something? Let us help you out.',
      value: 'support',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pattern-bg">
      <Navbar />
      <div className="color-bar w-full fixed top-16 left-0" />

      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 mb-4">
              <Mail className="w-3.5 h-3.5" />
              <span className="text-sm font-medium">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Questions, feedback, or feature requests — we&apos;re here to help you get the most out of Lucent.
            </p>
          </div>

          {/* Contact type cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {contactTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = formData.type === type.value;
              return (
                <button
                  key={type.value}
                  onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                  className={`p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-violet-600 bg-violet-50 shadow-[0_0_20px_-5px_rgba(139,92,246,0.2)]'
                      : 'border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50/30'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                    isSelected ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`font-semibold mb-1 ${isSelected ? 'text-violet-900' : 'text-gray-900'}`}>
                    {type.title}
                  </h3>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </button>
              );
            })}
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            {status.submitted && (
              <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                status.success
                  ? 'bg-emerald-50 border border-emerald-200'
                  : 'bg-red-50 border border-red-200'
              }`}>
                {status.success ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                )}
                <div>
                  <p className={`font-medium ${status.success ? 'text-emerald-800' : 'text-red-800'}`}>
                    {status.success ? 'Message Sent!' : 'Something went wrong'}
                  </p>
                  <p className={`text-sm mt-0.5 ${status.success ? 'text-emerald-700' : 'text-red-700'}`}>
                    {status.message}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 resize-none transition-all"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-gray-500">
                  We typically respond within 24 hours.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-fuchsia-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
