import React from 'react';
import { Users, DollarSign, TrendingUp, FileText, ArrowUp, ArrowDown } from 'lucide-react';
import { Lead, Deal, Invoice } from '../types';

interface DashboardProps {
  leads: Lead[];
  deals: Deal[];
  invoices: Invoice[];
}

export default function Dashboard({ leads, deals, invoices }: DashboardProps) {
  const totalRevenue = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pendingRevenue = deals
    .filter(deal => deal.stage !== 'closed-lost')
    .reduce((sum, deal) => sum + deal.value, 0);

  const conversionRate = leads.length > 0 
    ? (leads.filter(lead => lead.status === 'converted').length / leads.length) * 100 
    : 0;

  const recentLeads = leads
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const upcomingDeals = deals
    .filter(deal => deal.stage !== 'closed-won' && deal.stage !== 'closed-lost')
    .sort((a, b) => new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime())
    .slice(0, 5);

  const stats = [
    {
      name: 'Total Leads',
      value: leads.length,
      icon: Users,
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'Revenue This Month',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+23%',
      changeType: 'positive'
    },
    {
      name: 'Pipeline Value',
      value: `$${pendingRevenue.toLocaleString()}`,
      icon: TrendingUp,
      change: '+8%',
      changeType: 'positive'
    },
    {
      name: 'Conversion Rate',
      value: `${conversionRate.toFixed(1)}%`,
      icon: FileText,
      change: '-2%',
      changeType: 'negative'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {stat.changeType === 'positive' ? (
                  <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <p className="text-sm text-gray-500">{lead.businessType}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      lead.segment === 'interested-website' 
                        ? 'bg-green-100 text-green-800'
                        : lead.segment === 'domain-only'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {lead.segment.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Deals */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Deals</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingDeals.map((deal) => (
                <div key={deal.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{deal.leadName}</p>
                    <p className="text-sm text-gray-500">
                      Close: {new Date(deal.closeDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${deal.value.toLocaleString()}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      deal.stage === 'negotiation' 
                        ? 'bg-orange-100 text-orange-800'
                        : deal.stage === 'quote-sent'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {deal.stage.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}