import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  Clock, 
  AlertTriangle, 
  DollarSign,
  Truck,
  CheckCircle,
  XCircle,
  MapPin
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const kpiData = [
  {
    label: 'Deliveries Today',
    value: '247',
    change: '+12%',
    trend: 'up',
    icon: Package,
    color: 'blue'
  },
  {
    label: 'Pending Deliveries',
    value: '43',
    change: '-8%',
    trend: 'down',
    icon: Clock,
    color: 'yellow'
  },
  {
    label: 'Failed Deliveries',
    value: '5',
    change: '+2%',
    trend: 'up',
    icon: AlertTriangle,
    color: 'red'
  },
  {
    label: 'Route Cost',
    value: '$3,847',
    change: '-5%',
    trend: 'down',
    icon: DollarSign,
    color: 'green'
  }
];

const chartData = [
  { name: 'Mon', deliveries: 45 },
  { name: 'Tue', deliveries: 52 },
  { name: 'Wed', deliveries: 49 },
  { name: 'Thu', deliveries: 63 },
  { name: 'Fri', deliveries: 58 },
  { name: 'Sat', deliveries: 47 },
  { name: 'Sun', deliveries: 41 },
];

const drivers = [
  { id: 1, name: 'John Martinez', status: 'active', deliveries: 12, location: 'Downtown' },
  { id: 2, name: 'Sarah Johnson', status: 'active', deliveries: 9, location: 'North District' },
  { id: 3, name: 'Mike Chen', status: 'break', deliveries: 7, location: 'East Side' },
  { id: 4, name: 'Emily Davis', status: 'active', deliveries: 11, location: 'West End' },
  { id: 5, name: 'Robert Wilson', status: 'offline', deliveries: 0, location: 'Central' },
];

const alerts = [
  { id: 1, type: 'warning', message: 'Delivery #D3847 is delayed by 15 minutes', time: '5 min ago' },
  { id: 2, type: 'error', message: 'Failed delivery attempt for #D3821', time: '12 min ago' },
  { id: 3, type: 'success', message: 'Route optimization completed successfully', time: '25 min ago' },
  { id: 4, type: 'info', message: 'New customer registered: Acme Corporation', time: '1 hour ago' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-sm text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  kpi.color === 'blue' ? 'bg-blue-50' :
                  kpi.color === 'yellow' ? 'bg-yellow-50' :
                  kpi.color === 'red' ? 'bg-red-50' :
                  'bg-green-50'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    kpi.color === 'blue' ? 'text-blue-600' :
                    kpi.color === 'yellow' ? 'text-yellow-600' :
                    kpi.color === 'red' ? 'text-red-600' :
                    'text-green-600'
                  }`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{kpi.change}</span>
                </div>
              </div>
              <p className="text-2xl text-gray-900 mb-1">{kpi.value}</p>
              <p className="text-sm text-gray-600">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Delivery Chart */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg text-gray-900 mb-4">Weekly Delivery Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorDeliveries" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="deliveries" 
                stroke="#2563eb" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorDeliveries)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Live Map Widget */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg text-gray-900 mb-4">Live Delivery Map</h3>
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-[300px] flex items-center justify-center border border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">5 Active Drivers</p>
              <p className="text-xs text-gray-500 mt-1">Real-time tracking</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Driver Status Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg text-gray-900 mb-4">Driver Status</h3>
          <div className="space-y-3">
            {drivers.map((driver) => (
              <div key={driver.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center text-white">
                    {driver.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{driver.name}</p>
                    <p className="text-xs text-gray-500">{driver.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-700">{driver.deliveries} deliveries</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    driver.status === 'active' ? 'bg-green-100 text-green-700' :
                    driver.status === 'break' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {driver.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg text-gray-900 mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                  alert.type === 'success' ? 'bg-green-100' :
                  alert.type === 'warning' ? 'bg-yellow-100' :
                  alert.type === 'error' ? 'bg-red-100' :
                  'bg-blue-100'
                }`}>
                  {alert.type === 'success' ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                   alert.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-yellow-600" /> :
                   alert.type === 'error' ? <XCircle className="w-4 h-4 text-red-600" /> :
                   <Package className="w-4 h-4 text-blue-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}