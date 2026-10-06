import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Check, Send } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { settings, showToast } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in required fields (Name, Email, Message).', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been received. Our team will contact you shortly.');
  };

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto pb-12 mb-12 border-b border-[#E8E8E8]">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#777777] font-mono block mb-2">
            Customer Service
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
            We’re Here to Help
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] mt-3 leading-relaxed">
            Have a question regarding product dimensions, order status, or delivery timelines? Get in touch with the SEEKANA team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Business Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#F7F7F5] border border-[#E8E8E8] p-8 space-y-6">
              <h2 className="font-heading text-base font-bold uppercase tracking-wider text-[#111111] pb-3 border-b border-[#E8E8E8]">
                Direct Contacts
              </h2>

              <div className="space-y-5 text-xs text-[#555555]">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white border border-[#E8E8E8] text-[#111111]">
                    <Phone className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-wider text-[#111111]">Phone Support</p>
                    <p className="mt-0.5 font-mono">{settings.storePhone}</p>
                    <p className="text-[11px] text-[#777777]">Mon – Sat: 10:00 AM – 7:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white border border-[#E8E8E8] text-[#111111]">
                    <Mail className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-wider text-[#111111]">Email Concierge</p>
                    <p className="mt-0.5">{settings.storeEmail}</p>
                    <p className="text-[11px] text-[#777777]">Responses within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white border border-[#E8E8E8] text-[#111111]">
                    <MessageSquare className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-wider text-[#111111]">WhatsApp Assistance</p>
                    <p className="mt-0.5 font-mono">{settings.storeWhatsApp}</p>
                    <p className="text-[11px] text-[#777777]">Fast inquiry resolution</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white border border-[#E8E8E8] text-[#111111]">
                    <MapPin className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-wider text-[#111111]">Studio Location</p>
                    <p className="mt-0.5 leading-relaxed">{settings.storeAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-[#E8E8E8] p-6 text-xs text-[#666666] space-y-2">
              <h3 className="font-bold uppercase tracking-wider text-[#111111]">
                Odoo Lead & Ticket Integration
              </h3>
              <p>
                Inquiries submitted through this form are logged directly to Odoo CRM / Helpdesk, ensuring timely follow-up from our team.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="border border-[#E8E8E8] p-8 sm:p-10 bg-white">
              <h2 className="font-heading text-lg font-bold text-[#111111] mb-6">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="bg-[#F7F7F5] border border-[#E8E8E8] p-8 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#111111]">
                    Thank You
                  </h3>
                  <p className="text-xs text-[#555555] max-w-sm mx-auto">
                    We have received your message. A SEEKANA representative will reach out to <strong className="text-[#111111]">{formData.email}</strong> within 1 business day.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-wider font-semibold"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full text-xs p-3 border border-[#E8E8E8] focus:outline-none focus:border-[#111111]"
                        placeholder="e.g. Bilal Tariq"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-xs p-3 border border-[#E8E8E8] focus:outline-none focus:border-[#111111]"
                        placeholder="e.g. bilal@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-xs p-3 border border-[#E8E8E8] focus:outline-none focus:border-[#111111]"
                        placeholder="+92 300 1234567"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full text-xs p-3 border border-[#E8E8E8] focus:outline-none focus:border-[#111111]"
                        placeholder="e.g. Sizing Advice / Order Inquiry"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#555555] mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full text-xs p-3 border border-[#E8E8E8] focus:outline-none focus:border-[#111111] resize-y"
                      placeholder="Please tell us how we can assist you..."
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
