import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';

export default function ContactButtons() {
  const phoneNumber = '+593987654321';
  const emailAddress = 'contact@guillermorogelm.com';
  const whatsAppMessage = 'Hello there';

  const whatsappURL = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(whatsAppMessage)}`;

  return (
    <div className="flex space-x-2">
      <a
        href={`tel:${phoneNumber}`}
        className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        <Phone className="w-4 h-4" />
        <span>Call</span>
      </a>
      <a
        href={`mailto:${emailAddress}`}
        className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        <Mail className="w-4 h-4" />
        <span>Email</span>
      </a>
      <a
        href={whatsappURL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        <span>Message</span>
      </a>
    </div>
  );
}
