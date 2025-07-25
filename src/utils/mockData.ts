import { Lead, Deal, Product, Invoice, InvoiceItem } from '../types';

export function generateMockData() {
  const leads: Lead[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1-555-0123',
      businessType: 'Restaurant',
      segment: 'interested-website',
      source: 'facebook',
      status: 'qualified',
      createdAt: new Date('2024-12-01'),
      lastContact: new Date('2024-12-15'),
      notes: 'Needs a modern website with online ordering system',
      interactions: []
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@techstartup.com',
      phone: '+1-555-0124',
      businessType: 'Tech Startup',
      segment: 'interested-website',
      source: 'google',
      status: 'contacted',
      createdAt: new Date('2024-12-10'),
      lastContact: new Date('2024-12-12'),
      notes: 'Looking for professional corporate website',
      interactions: []
    },
    {
      id: '3',
      name: 'Emma Wilson',
      email: 'emma@lawfirm.com',
      phone: '+1-555-0125',
      businessType: 'Law Firm',
      segment: 'domain-only',
      source: 'referral',
      status: 'new',
      createdAt: new Date('2024-12-18'),
      lastContact: new Date('2024-12-18'),
      notes: 'Just needs domain registration for now',
      interactions: []
    },
    {
      id: '4',
      name: 'David Rodriguez',
      email: 'david@ecommerce.com',
      phone: '+1-555-0126',
      businessType: 'E-commerce',
      segment: 'interested-website',
      source: 'instagram',
      status: 'converted',
      createdAt: new Date('2024-11-15'),
      lastContact: new Date('2024-12-01'),
      notes: 'Successfully launched online store',
      interactions: []
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      email: 'lisa@consulting.com',
      phone: '+1-555-0127',
      businessType: 'Consulting',
      segment: 'email-plans',
      source: 'website',
      status: 'qualified',
      createdAt: new Date('2024-12-05'),
      lastContact: new Date('2024-12-14'),
      notes: 'Interested in professional email setup',
      interactions: []
    }
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Basic Website Package',
      category: 'website',
      price: 1500,
      description: 'Professional 5-page website with modern design',
      features: [
        'Responsive Design',
        'SEO Optimized',
        'Contact Form',
        '1 Year Support',
        'SSL Certificate'
      ],
      isActive: true
    },
    {
      id: '2',
      name: 'E-commerce Website',
      category: 'website',
      price: 3500,
      description: 'Full-featured online store with payment integration',
      features: [
        'Product Catalog',
        'Shopping Cart',
        'Payment Gateway',
        'Inventory Management',
        'Order Tracking',
        'Admin Dashboard'
      ],
      isActive: true
    },
    {
      id: '3',
      name: 'Domain Registration',
      category: 'domain',
      price: 15,
      description: 'Annual domain registration (.com, .net, .org)',
      features: [
        '1 Year Registration',
        'DNS Management',
        'Email Forwarding',
        'Free Privacy Protection'
      ],
      isActive: true
    },
    {
      id: '4',
      name: 'Professional Email',
      category: 'email',
      price: 60,
      description: 'Business email hosting with 10GB storage',
      features: [
        '10GB Storage',
        'Custom Domain',
        'Mobile Sync',
        'Spam Protection',
        '24/7 Support'
      ],
      isActive: true
    },
    {
      id: '5',
      name: 'Web Hosting',
      category: 'hosting',
      price: 120,
      description: 'Reliable web hosting with 99.9% uptime',
      features: [
        '10GB SSD Storage',
        'Unlimited Bandwidth',
        'Free SSL',
        'Daily Backups',
        'cPanel Access'
      ],
      isActive: true
    }
  ];

  const deals: Deal[] = [
    {
      id: '1',
      leadId: '1',
      leadName: 'Sarah Johnson',
      stage: 'quote-sent',
      value: 2000,
      products: ['Basic Website Package', 'Professional Email'],
      probability: 75,
      closeDate: new Date('2024-12-30'),
      createdAt: new Date('2024-12-15'),
      notes: 'Quote sent for restaurant website with online ordering'
    },
    {
      id: '2',
      leadId: '2',
      leadName: 'Mike Chen',
      stage: 'contacted',
      value: 1500,
      products: ['Basic Website Package'],
      probability: 50,
      closeDate: new Date('2025-01-15'),
      createdAt: new Date('2024-12-10'),
      notes: 'Initial contact made, needs to review portfolio'
    },
    {
      id: '3',
      leadId: '4',
      leadName: 'David Rodriguez',
      stage: 'closed-won',
      value: 3620,
      products: ['E-commerce Website', 'Web Hosting'],
      probability: 100,
      closeDate: new Date('2024-12-01'),
      createdAt: new Date('2024-11-15'),
      notes: 'Successfully delivered e-commerce solution'
    },
    {
      id: '4',
      leadId: '5',
      leadName: 'Lisa Thompson',
      stage: 'negotiation',
      value: 180,
      products: ['Professional Email', 'Domain Registration'],
      probability: 80,
      closeDate: new Date('2024-12-25'),
      createdAt: new Date('2024-12-12'),
      notes: 'Negotiating email package details'
    }
  ];

  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-001',
      leadId: '4',
      leadName: 'David Rodriguez',
      amount: 3620,
      status: 'paid',
      dueDate: new Date('2024-12-15'),
      createdAt: new Date('2024-12-01'),
      items: [
        {
          id: '1',
          productId: '2',
          productName: 'E-commerce Website',
          quantity: 1,
          price: 3500,
          total: 3500
        },
        {
          id: '2',
          productId: '5',
          productName: 'Web Hosting',
          quantity: 1,
          price: 120,
          total: 120
        }
      ]
    },
    {
      id: '2',
      invoiceNumber: 'INV-002',
      leadId: '1',
      leadName: 'Sarah Johnson',
      amount: 2060,
      status: 'sent',
      dueDate: new Date('2025-01-05'),
      createdAt: new Date('2024-12-20'),
      items: [
        {
          id: '3',
          productId: '1',
          productName: 'Basic Website Package',
          quantity: 1,
          price: 1500,
          total: 1500
        },
        {
          id: '4',
          productId: '4',
          productName: 'Professional Email',
          quantity: 1,
          price: 60,
          total: 60
        }
      ]
    }
  ];

  return { leads, deals, products, invoices };
}