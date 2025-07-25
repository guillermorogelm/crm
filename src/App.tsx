import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Package,
  BarChart3,
  Settings,
  Menu,
  X
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import LeadsManager from './components/LeadsManager';
import Pipeline from './components/Pipeline';
import Products from './components/Products';
import Invoices from './components/Invoices';
import Analytics from './components/Analytics';
import { Lead, Deal, Product, Invoice } from './types';
import { generateMockData } from './utils/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Initialize with mock data
  const mockData = generateMockData();
  const [leads, setLeads] = useState<Lead[]>(mockData.leads);
  const [deals, setDeals] = useState<Deal[]>(mockData.deals);
  const [products, setProducts] = useState<Product[]>(mockData.products);
  const [invoices, setInvoices] = useState<Invoice[]>(mockData.invoices);

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'leads', name: 'Leads & Clients', icon: Users },
    { id: 'pipeline', name: 'Sales Pipeline', icon: TrendingUp },
    { id: 'products', name: 'Products & Services', icon: Package },
    { id: 'invoices', name: 'Billing & Invoices', icon: FileText },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard leads={leads} deals={deals} invoices={invoices} />;
      case 'leads':
        return <LeadsManager leads={leads} setLeads={setLeads} />;
      case 'pipeline':
        return <Pipeline deals={deals} setDeals={setDeals} />;
      case 'products':
        return <Products products={products} setProducts={setProducts} />;
      case 'invoices':
        return <Invoices invoices={invoices} setInvoices={setInvoices} leads={leads} products={products} />;
      case 'analytics':
        return <Analytics leads={leads} deals={deals} invoices={invoices} />;
      default:
        return <Dashboard leads={leads} deals={deals} invoices={invoices} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">WebDev CRM</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center px-6 py-3 text-left transition-colors
                  ${activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">JD</span>
              </div>
              <span className="text-sm font-medium text-gray-700">John Doe</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;