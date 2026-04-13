import React, { useState } from 'react';
import { Plus, Package, Search, Filter, Eye } from 'lucide-react';

interface Good {
  id: string;
  name: string;
  quantity: number;
  weight: string;
  value: string;
}

interface PackageItem {
  id: string;
  trackingNumber: string;
  customer: string;
  origin: string;
  destination: string;
  goods: Good[];
  status: 'pending' | 'in-transit' | 'delivered' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created: string;
  estimatedDelivery: string;
}

const mockPackages: PackageItem[] = [
  {
    id: 'P001',
    trackingNumber: 'TRK-2026-001234',
    customer: 'Acme Corporation',
    origin: 'Warehouse A, NY',
    destination: '123 Business Ave, NY',
    goods: [
      { id: 'G1', name: 'Electronics Kit', quantity: 5, weight: '2.5 kg', value: '$1,250' },
      { id: 'G2', name: 'Accessories Bundle', quantity: 10, weight: '1.0 kg', value: '$300' }
    ],
    status: 'in-transit',
    priority: 'high',
    created: '2026-02-16',
    estimatedDelivery: '2026-02-17'
  },
  {
    id: 'P002',
    trackingNumber: 'TRK-2026-001235',
    customer: 'TechStart Inc',
    origin: 'Warehouse B, CA',
    destination: '456 Tech Street, CA',
    goods: [
      { id: 'G3', name: 'Office Supplies', quantity: 20, weight: '5.0 kg', value: '$400' }
    ],
    status: 'pending',
    priority: 'medium',
    created: '2026-02-16',
    estimatedDelivery: '2026-02-18'
  },
  {
    id: 'P003',
    trackingNumber: 'TRK-2026-001236',
    customer: 'Global Logistics',
    origin: 'Warehouse A, NY',
    destination: '789 Logistics Blvd, TX',
    goods: [
      { id: 'G4', name: 'Industrial Parts', quantity: 15, weight: '12.0 kg', value: '$2,800' },
      { id: 'G5', name: 'Safety Equipment', quantity: 8, weight: '3.5 kg', value: '$600' }
    ],
    status: 'delivered',
    priority: 'urgent',
    created: '2026-02-15',
    estimatedDelivery: '2026-02-16'
  },
  {
    id: 'P004',
    trackingNumber: 'TRK-2026-001237',
    customer: 'Metro Supplies',
    origin: 'Warehouse C, FL',
    destination: '321 Metro Way, FL',
    goods: [
      { id: 'G6', name: 'Food Supplies', quantity: 50, weight: '25.0 kg', value: '$1,500' }
    ],
    status: 'failed',
    priority: 'low',
    created: '2026-02-15',
    estimatedDelivery: '2026-02-16'
  },
];

export default function Packages() {
  const [packages] = useState<PackageItem[]>(mockPackages);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);

  const filteredPackages = packages.filter(pkg =>
    pkg.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'in-transit': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-blue-100 text-blue-700';
      case 'low': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">Packages</h1>
          <p className="text-sm text-gray-600">Manage packages and track deliveries</p>
        </div>
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          Create Package
        </button>
      </div>

      {/* Create Package Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg text-gray-900 mb-4">Create New Package</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Customer</label>
              <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Select customer</option>
                <option>Acme Corporation</option>
                <option>TechStart Inc</option>
                <option>Global Logistics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Priority</label>
              <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Medium</option>
                <option>Low</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Origin</label>
              <input 
                type="text" 
                placeholder="Enter origin address"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Destination</label>
              <input 
                type="text" 
                placeholder="Enter destination address"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Estimated Delivery</label>
              <input 
                type="date" 
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Goods List */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm text-gray-700">Goods List</h4>
              <button className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition">
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-2 text-gray-700">Item Name</th>
                    <th className="text-left px-4 py-2 text-gray-700">Quantity</th>
                    <th className="text-left px-4 py-2 text-gray-700">Weight</th>
                    <th className="text-left px-4 py-2 text-gray-700">Value</th>
                    <th className="text-left px-4 py-2 text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3">
                      <input 
                        type="text" 
                        placeholder="Item name"
                        className="w-full px-2 py-1 bg-white border border-gray-200 rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input 
                        type="number" 
                        placeholder="Qty"
                        className="w-20 px-2 py-1 bg-white border border-gray-200 rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input 
                        type="text" 
                        placeholder="kg"
                        className="w-24 px-2 py-1 bg-white border border-gray-200 rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input 
                        type="text" 
                        placeholder="$"
                        className="w-24 px-2 py-1 bg-white border border-gray-200 rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-red-600 hover:bg-red-50 px-2 py-1 rounded text-sm">Remove</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button 
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Create Package
            </button>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by tracking number or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm hover:bg-gray-100 transition">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            {/* Package Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-900">{pkg.trackingNumber}</h3>
                  <p className="text-xs text-gray-500">{pkg.customer}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(pkg.status)}`}>
                  {pkg.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(pkg.priority)}`}>
                  {pkg.priority}
                </span>
              </div>
            </div>

            {/* Package Details */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Origin:</span>
                <span className="text-gray-900">{pkg.origin}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Destination:</span>
                <span className="text-gray-900">{pkg.destination}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Est. Delivery:</span>
                <span className="text-gray-900">{pkg.estimatedDelivery}</span>
              </div>
            </div>

            {/* Goods Summary */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <h4 className="text-xs text-gray-700 mb-2">Goods ({pkg.goods.length} items)</h4>
              <div className="space-y-1">
                {pkg.goods.slice(0, 2).map((good) => (
                  <div key={good.id} className="flex justify-between text-xs">
                    <span className="text-gray-600">{good.name} x{good.quantity}</span>
                    <span className="text-gray-900">{good.weight}</span>
                  </div>
                ))}
                {pkg.goods.length > 2 && (
                  <p className="text-xs text-blue-600">+{pkg.goods.length - 2} more items</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <button 
              onClick={() => setSelectedPackage(pkg)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm"
            >
              <Eye className="w-4 h-4" />
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Package Detail Modal */}
      {selectedPackage && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setSelectedPackage(null)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl text-gray-900">Package Details</h2>
                  <button 
                    onClick={() => setSelectedPackage(null)}
                    className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <Plus className="w-5 h-5 rotate-45" />
                  </button>
                </div>

                {/* Full Package Info */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Tracking Number</p>
                      <p className="text-sm text-gray-900">{selectedPackage.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Customer</p>
                      <p className="text-sm text-gray-900">{selectedPackage.customer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Status</p>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs ${getStatusColor(selectedPackage.status)}`}>
                        {selectedPackage.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Priority</p>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs ${getPriorityColor(selectedPackage.priority)}`}>
                        {selectedPackage.priority}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm text-gray-700 mb-3">Goods List</h4>
                    <table className="w-full text-sm">
                      <thead className="border-b border-gray-200">
                        <tr>
                          <th className="text-left py-2 text-gray-700">Item</th>
                          <th className="text-left py-2 text-gray-700">Qty</th>
                          <th className="text-left py-2 text-gray-700">Weight</th>
                          <th className="text-left py-2 text-gray-700">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedPackage.goods.map((good) => (
                          <tr key={good.id} className="border-b border-gray-100">
                            <td className="py-2 text-gray-900">{good.name}</td>
                            <td className="py-2 text-gray-600">{good.quantity}</td>
                            <td className="py-2 text-gray-600">{good.weight}</td>
                            <td className="py-2 text-gray-900">{good.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
