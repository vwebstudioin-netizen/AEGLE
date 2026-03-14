'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

interface WhatsAppButtonProps {
  whatsapp?: string;
}

export default function WhatsAppButton({ whatsapp = '918050507755' }: WhatsAppButtonProps) {
  const [show, setShow] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 2000);
    const t2 = setTimeout(() => setTooltip(true), 3500);
    const t3 = setTimeout(() => setTooltip(false), 9000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {tooltip && (
        <div className="flex items-center gap-2 bg-white rounded-xl shadow-lg px-4 py-2 border border-pink-100 animate-fade-in">
          <p className="text-sm text-foreground whitespace-nowrap">
            Chat with us on WhatsApp! ✨
          </p>
          <button
            onClick={() => setTooltip(false)}
            className="text-muted-foreground hover:text-foreground ml-1"
          >
            <FiX size={14} />
          </button>
        </div>
      )}
      <a
        href={`https://wa.me/${whatsapp}?text=Hi! I'd like to book a consultation at AEGLE.`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:-translate-y-1 relative"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
      </a>
    </div>
  );
}
