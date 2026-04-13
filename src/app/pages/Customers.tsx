import React, { useState } from 'react';
import { Search, Plus, X, Mail, Phone, MapPin, Building2, Edit, Trash2 } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  totalOrders: number;
  status: 'active' | 'inactive';
}

const mockCustomers: Customer[] = [
  { id: 'C001', name: 'Acme Corporation', email: 'contact@acme.com', phone: '+1 (555) 123-4567', address: '123 Business Ave, NY', company: 'Acme Corp', totalOrders: 247, status: 'active' },
  { id: 'C002', name: 'TechStart Inc', email: 'hello@techstart.com', phone: '+1 (555) 234-5678', address: '456 Tech Street, CA', company: 'TechStart', totalOrders: 189, status: 'active' },
  { id: 'C003', name: 'Global Logistics', email: 'info@globallog.com', phone: '+1 (555) 345-6789', address: '789 Logistics Blvd, TX', company: 'Global Log', totalOrders: 423, status: 'active' },
  { id: 'C004', name: 'Metro Supplies', email: 'orders@metrosup.com', phone: '+1 (555) 456-7890', address: '321 Metro Way, FL', company: 'Metro Sup', totalOrders: 156, status: 'active' },
  { id: 'C005', name: 'Retail Plus', email: 'support@retailplus.com', phone: '+1 (555) 567-8901', address: '654 Retail Road, WA', company: 'Retail Plus', totalOrders: 98, status: 'inactive' },
  { id: 'C006', name: 'Express Distributors', email: 'hello@expressdist.com', phone: '+1 (555) 678-9012', address: '987 Express Lane, IL', company: 'Express Dist', totalOrders: 312, status: 'active' },
];

export default function Customers() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openDrawer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedCustomer(null), 300);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">Customers</h1>
          <p className="text-sm text-gray-600">Manage your customer database</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Plus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Sort by Name</option>
            <option>Sort by Orders</option>
            <option>Sort by Status</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm text-gray-700">Customer ID</th>
                <th className="text-left px-6 py-4 text-sm text-gray-700">Name</th>
                <th className="text-left px-6 py-4 text-sm text-gray-700">Contact</th>
                <th className="text-left px-6 py-4 text-sm text-gray-700">Company</th>
                <th className="text-left px-6 py-4 text-sm text-gray-700">Total Orders</th>
                <th className="text-left px-6 py-4 text-sm text-gray-700">Status</th>
                <th className="text-left px-6 py-4 text-sm text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.map((customer) => (
                <tr 
                  key={customer.id} 
                  className="hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => openDrawer(customer)}
                >
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div>{customer.email}</div>
                    <div className="text-xs text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.company}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{customer.totalOrders}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs ${
                      customer.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        onClick={(e) => { e.stopPropagation(); }}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        onClick={(e) => { e.stopPropagation(); }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      {isDrawerOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={closeDrawer}
          />
          <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {selectedCustomer && (
              <div className="h-full flex flex-col">
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl text-gray-900">Customer Details</h2>
                  <button 
                    onClick={closeDrawer}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Customer Info Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-500 rounded-xl flex items-center justify-center text-white text-2xl">
                        {selectedCustomer.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg text-gray-900">{selectedCustomer.name}</h3>
                        <p className="text-sm text-gray-600">{selectedCustomer.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-center">
                        <p className="text-2xl text-gray-900">{selectedCustomer.totalOrders}</p>
                        <p className="text-xs text-gray-600">Total Orders</p>
                      </div>
                      <div className="text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm ${
                          selectedCustomer.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {selectedCustomer.status}
                        </span>
                        <p className="text-xs text-gray-600 mt-1">Status</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h4 className="text-sm text-gray-700">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm text-gray-900">{selectedCustomer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm text-gray-900">{selectedCustomer.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="text-sm text-gray-900">{selectedCustomer.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Building2 className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="text-xs text-gray-500">Company</p>
                          <p className="text-sm text-gray-900">{selectedCustomer.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div className="space-y-4">
                    <h4 className="text-sm text-gray-700">Recent Orders</h4>
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm text-gray-900">Order #ORD{1000 + i}</p>
                            <p className="text-xs text-gray-500">{i} days ago</p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                            Delivered
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Drawer Actions */}
                <div className="p-6 border-t border-gray-200 flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Edit Customer
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
