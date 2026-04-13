import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Route, 
  MapPin, 
  AlertCircle, 
  LogOut,
  Bell,
  Search,
  User
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/dashboard/customers', icon: Users, label: 'Customers' },
    { to: '/dashboard/packages', icon: Package, label: 'Packages' },
    { to: '/dashboard/routes', icon: Route, label: 'Route Optimization' },
    { to: '/dashboard/monitoring', icon: MapPin, label: 'Delivery Monitoring' },
    { to: '/dashboard/complaints', icon: AlertCircle, label: 'Complaints' },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-green-500 p-2 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg text-gray-900">DeliverGrid</h2>
              <p className="text-xs text-gray-500">Logistics Hub</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search deliveries, customers..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">administrator</p>
                </div>
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
