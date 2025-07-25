import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Invoice, InvoiceItem, Lead, Product } from '../types';

interface InvoiceModalProps {
  invoice: Invoice | null;
  leads: Lead[];
  products: Product[];
  onSave: (invoiceData: Partial<Invoice>) => void;
  onClose: () => void;
}

export default function InvoiceModal({ invoice, leads, products, onSave, onClose }: InvoiceModalProps) {
  const [formData, setFormData] = useState({
    leadId: '',
    leadName: '',
    dueDate: new Date().toISOString().split('T')[0],
    items: [] as InvoiceItem[]
  });

  useEffect(() => {
    if (invoice) {
      setFormData({
        leadId: invoice.leadId,
        leadName: invoice.leadName,
        dueDate: new Date(invoice.dueDate).toISOString().split('T')[0],
        items: invoice.items
      });
    }
  }, [invoice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalAmount = formData.items.reduce((sum, item) => sum + item.total, 0);
    
    onSave({
      ...formData,
      amount: totalAmount,
      dueDate: new Date(formData.dueDate)
    });
  };

  const handleLeadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLead = leads.find(lead => lead.id === e.target.value);
    setFormData(prev => ({
      ...prev,
      leadId: e.target.value,
      leadName: selectedLead?.name || ''
    }));
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      productId: '',
      productName: '',
      quantity: 1,
      price: 0,
      total: 0
    };
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (itemId: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const updateItem = (itemId: string, field: keyof InvoiceItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value };
          
          // Auto-calculate total when quantity or price changes
          if (field === 'quantity' || field === 'price') {
            updatedItem.total = updatedItem.quantity * updatedItem.price;
          }
          
          // Auto-fill product details when product is selected
          if (field === 'productId') {
            const product = products.find(p => p.id === value);
            if (product) {
              updatedItem.productName = product.name;
              updatedItem.price = product.price;
              updatedItem.total = updatedItem.quantity * product.price;
            }
          }
          
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const totalAmount = formData.items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {invoice ? 'Edit Invoice' : 'Create New Invoice'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client *
              </label>
              <select
                value={formData.leadId}
                onChange={handleLeadChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a client</option>
                {leads.map(lead => (
                  <option key={lead.id} value={lead.id}>
                    {lead.name} - {lead.email}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date *
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Invoice Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Invoice Items</h3>
              <button
                type="button"
                onClick={addItem}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center space-x-1 hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-3 items-end p-3 bg-gray-50 rounded-lg">
                  <div className="col-span-4">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Product/Service
                    </label>
                    <select
                      value={item.productId}
                      onChange={(e) => updateItem(item.id, 'productId', e.target.value)}
                      className="w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select product or enter custom</option>
                      {products.filter(p => p.isActive).map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name} - ${product.price}
                        </option>
                      ))}
                    </select>
                    {!item.productId && (
                      <input
                        type="text"
                        placeholder="Custom service name"
                        value={item.productName}
                        onChange={(e) => updateItem(item.id, 'productName', e.target.value)}
                        className="w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 mt-1"
                      />
                    )}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                      min="1"
                      className="w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      className="w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Total
                    </label>
                    <div className="px-2 py-1 text-sm bg-gray-100 rounded">
                      ${item.total.toFixed(2)}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="w-full bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {formData.items.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No items added yet. Click "Add Item" to get started.
              </div>
            )}
          </div>

          {/* Total */}
          {formData.items.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex justify-end">
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    Total: ${totalAmount.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formData.items.length === 0 || !formData.leadId}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {invoice ? 'Update Invoice' : 'Create Invoice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}