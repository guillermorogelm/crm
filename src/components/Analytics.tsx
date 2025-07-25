import React from 'react';
import { TrendingUp, Users, DollarSign, Target, ArrowUp, ArrowDown } from 'lucide-react';
import { Lead, Deal, Invoice } from '../types';

interface AnalyticsProps {
  leads: Lead[];
  deals: Deal[];
  invoices: Invoice[];
}

export default function Analytics({ leads, deals, invoices }: AnalyticsProps) {
  // Lead analytics
  const totalLeads = leads.length;
  const convertedLeads = leads.filter(lead => lead.status === 'converted').length;
  const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;

  // Revenue analytics
  const totalRevenue = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);
  
  const pipelineValue = deals
    .filter(deal => deal.stage !== 'closed-lost')
    .reduce((sum, deal) => sum + deal.value, 0);

  // Lead sources
  const leadSources = leads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Deal stages
  const dealStages = deals.reduce((acc, deal) => {
    acc[deal.stage] = (acc[deal.stage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Monthly trends (simplified)
  const thisMonth = new Date().getMonth();
  const thisMonthLeads = leads.filter(lead => 
    new Date(lead.createdAt).getMonth() === thisMonth
  ).length;
  
  const thisMonthRevenue = invoices
    .filter(inv => 
      inv.status === 'paid' && 
      new Date(inv.createdAt).getMonth() === thisMonth
    )
    .reduce((sum, inv) => sum + inv.amount, 0);

  const stats = [
    {
      name: 'Total Leads',
      value: totalLeads,
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      name: 'Conversion Rate',
      value: `${conversionRate.toFixed(1)}%`,
      change: '+5%',
      changeType: 'positive' as const,
      icon: Target
    },
    {
      name: 'Pipeline Value',
      value: `$${pipelineValue.toLocaleString()}`,
      change: '+18%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      name: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: '+23%',
      changeType: 'positive' as const,
      icon: DollarSign
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-600">Track your business performance and growth</p>
      </div>

      {/* Key Metrics */}
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

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Sources */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Lead Sources</h2>
          <div className="space-y-3">
            {Object.entries(leadSources).map(([source, count]) => {
              const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
              return (
                <div key={source} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {source}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{count} leads</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sales Pipeline */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales Pipeline</h2>
          <div className="space-y-3">
            {Object.entries(dealStages).map(([stage, count]) => {
              const stageValue = deals
                .filter(deal => deal.stage === stage)
                .reduce((sum, deal) => sum + deal.value, 0);
              
              return (
                <div key={stage} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      stage === 'closed-won' ? 'bg-green-500' :
                      stage === 'closed-lost' ? 'bg-red-500' :
                      stage === 'negotiation' ? 'bg-orange-500' :
                      'bg-blue-500'
                    }`}></div>
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {stage.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      ${stageValue.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">{count} deals</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">This Month's Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{thisMonthLeads}</div>
            <div className="text-sm text-gray-600">New Leads</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              ${thisMonthRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {deals.filter(d => d.stage === 'closed-won').length}
            </div>
            <div className="text-sm text-gray-600">Deals Closed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {deals.filter(d => d.stage !== 'closed-won' && d.stage !== 'closed-lost').length}
            </div>
            <div className="text-sm text-gray-600">Active Deals</div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">📊 Business Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">🎯 Top Performing Source</h3>
            <p className="text-sm text-gray-600">
              {Object.entries(leadSources).length > 0 && 
                Object.entries(leadSources).sort(([,a], [,b]) => b - a)[0][0]
              } is your best lead source. Consider investing more in this channel.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">💰 Revenue Opportunity</h3>
            <p className="text-sm text-gray-600">
              You have ${pipelineValue.toLocaleString()} in your pipeline. 
              Focus on moving deals through negotiation to close more business.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}