export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessType: string;
  segment: 'interested-website' | 'domain-only' | 'cold-lead' | 'email-plans';
  source: 'facebook' | 'google' | 'referral' | 'website' | 'instagram';
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  createdAt: Date;
  lastContact: Date;
  notes: string;
  interactions: Interaction[];
}

export interface Interaction {
  id: string;
  type: 'call' | 'email' | 'whatsapp' | 'meeting';
  date: Date;
  subject: string;
  notes: string;
}

export interface Deal {
  id: string;
  leadId: string;
  leadName: string;
  stage: 'new-lead' | 'contacted' | 'quote-sent' | 'negotiation' | 'closed-won' | 'closed-lost';
  value: number;
  products: string[];
  probability: number;
  closeDate: Date;
  createdAt: Date;
  notes: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'website' | 'domain' | 'email' | 'hosting';
  price: number;
  description: string;
  features: string[];
  isActive: boolean;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  leadId: string;
  leadName: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: Date;
  createdAt: Date;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}