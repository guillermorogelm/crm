import React, { useState } from 'react';
import { Plus, DollarSign, Calendar, User, Edit, Trash2 } from 'lucide-react';
import { Deal } from '../types';
import DealModal from './DealModal';

interface PipelineProps {
  deals: Deal[];
  setDeals: React.Dispatch<React.SetStateAction<Deal[]>>;
}

const stages = [
  { id: 'new-lead', name: 'New Lead', color: 'bg-gray-100' },
  { id: 'contacted', name: 'Contacted', color: 'bg-blue-100' },
  { id: 'quote-sent', name: 'Quote Sent', color: 'bg-yellow-100' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-orange-100' },
  { id: 'closed-won', name: 'Closed Won', color: 'bg-green-100' },
  { id: 'closed-lost', name: 'Closed Lost', color: 'bg-red-100' }
];

export default function Pipeline({ deals, setDeals }: PipelineProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null);

  const handleAddDeal = () => {
    setEditingDeal(null);
    setIsModalOpen(true);
  };

  const handleEditDeal = (deal: Deal) => {
    setEditingDeal(deal);
    setIsModalOpen(true);
  };

  const handleDeleteDeal = (dealId: string) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      setDeals(deals.filter(deal => deal.id !== dealId));
    }
  };

  const handleSaveDeal = (dealData: Partial<Deal>) => {
    if (editingDeal) {
      setDeals(deals.map(deal => 
        deal.id === editingDeal.id 
          ? { ...deal, ...dealData }
          : deal
      ));
    } else {
      const newDeal: Deal = {
        id: Date.now().toString(),
        leadId: dealData.leadId || '',
        leadName: dealData.leadName || '',
        stage: 'new-lead',
        value: dealData.value || 0,
        products: dealData.products || [],
        probability: dealData.probability || 50,
        closeDate: dealData.closeDate || new Date(),
        createdAt: new Date(),
        notes: dealData.notes || ''
      };
      setDeals([...deals, newDeal]);
    }
    setIsModalOpen(false);
  };

  const handleDragStart = (e: React.DragEvent, deal: Deal) => {
    setDraggedDeal(deal);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStage: Deal['stage']) => {
    e.preventDefault();
    if (draggedDeal && draggedDeal.stage !== newStage) {
      setDeals(deals.map(deal => 
        deal.id === draggedDeal.id 
          ? { ...deal, stage: newStage }
          : deal
      ));
    }
    setDraggedDeal(null);
  };

  const getDealsForStage = (stage: Deal['stage']) => {
    return deals.filter(deal => deal.stage === stage);
  };

  const getTotalValueForStage = (stage: Deal['stage']) => {
    return getDealsForStage(stage).reduce((sum, deal) => sum + deal.value, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Pipeline</h1>
          <p className="text-gray-600">Track your deals through the sales process</p>
        </div>
        <button
          onClick={handleAddDeal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Deal</span>
        </button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">
            ${deals.reduce((sum, deal) => sum + deal.value, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Pipeline Value</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">{deals.length}</div>
          <div className="text-sm text-gray-600">Total Deals</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">
            ${getTotalValueForStage('closed-won').toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Closed Won</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-blue-600">
            {deals.filter(d => d.stage !== 'closed-won' && d.stage !== 'closed-lost').length}
          </div>
          <div className="text-sm text-gray-600">Active Deals</div>
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 min-h-[600px]">
          {stages.map((stage) => {
            const stageDeals = getDealsForStage(stage.id as Deal['stage']);
            const stageValue = getTotalValueForStage(stage.id as Deal['stage']);
            
            return (
              <div
                key={stage.id}
                className={`${stage.color} rounded-lg p-4 min-h-[500px]`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id as Deal['stage'])}
              >
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                  <div className="text-sm text-gray-600">
                    {stageDeals.length} deals • ${stageValue.toLocaleString()}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, deal)}
                      className="bg-white p-3 rounded-lg shadow-sm border cursor-move hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">{deal.leadName}</h4>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleEditDeal(deal)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteDeal(deal.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-600 mb-2">
                        <DollarSign className="w-3 h-3 mr-1" />
                        ${deal.value.toLocaleString()}
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-600 mb-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(deal.closeDate).toLocaleDateString()}
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-600">
                        <User className="w-3 h-3 mr-1" />
                        {deal.probability}% probability
                      </div>
                      
                      {deal.products.length > 0 && (
                        <div className="mt-2 text-xs text-gray-500">
                          {deal.products.slice(0, 2).join(', ')}
                          {deal.products.length > 2 && ' ...'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deal Modal */}
      {isModalOpen && (
        <DealModal
          deal={editingDeal}
          onSave={handleSaveDeal}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}