import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhatsAppButton: React.FC = () => {
  const { settings } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messageText, setMessageText] = useState('Hello SEEKANA, I have an inquiry regarding your products.');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = settings.storeWhatsApp.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(messageText);
    const url = `https://wa.me/${cleanNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* WhatsApp Chat Popover */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white border border-[#E8E8E8] shadow-xl p-4 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0F0EE]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <div>
                <p className="text-xs font-bold text-[#111111]">SEEKANA Concierge</p>
                <p className="text-[10px] text-[#777777]">Direct WhatsApp Support</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#777777] hover:text-[#111111] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3">
            <p className="text-xs text-[#555555] bg-[#F7F7F5] p-3 rounded-none border border-[#E8E8E8]">
              👋 Need assistance with sizing, delivery times, or styling recommendations? We’re here to help.
            </p>
          </div>

          <form onSubmit={handleSend} className="space-y-2">
            <textarea
              rows={2}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full text-xs p-2.5 border border-[#E8E8E8] focus:outline-none focus:border-[#111111] resize-none"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="w-full py-2 bg-[#25D366] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-[#20bd5a] transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat</span>
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact SEEKANA on WhatsApp"
        className="w-12 h-12 rounded-full bg-[#111111] text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 border border-neutral-700 hover:bg-[#25D366] hover:border-[#25D366]"
        title="WhatsApp Support"
      >
        <MessageCircle className="w-6 h-6 stroke-[1.75]" />
      </button>
    </div>
  );
};
