import React, { useState } from 'react';
import { MapPin, Navigation, DollarSign, Clock, TrendingDown, Zap } from 'lucide-react';

interface RouteStop {
  id: string;
  address: string;
  customer: string;
  packages: number;
  estimatedTime: string;
  lat: number;
  lng: number;
}

const routeStops: RouteStop[] = [
  { id: 'S1', address: '123 Business Ave, NY', customer: 'Acme Corp', packages: 3, estimatedTime: '10:00 AM', lat: 40.7128, lng: -74.0060 },
  { id: 'S2', address: '456 Tech Street, NY', customer: 'TechStart', packages: 2, estimatedTime: '10:30 AM', lat: 40.7580, lng: -73.9855 },
  { id: 'S3', address: '789 Main St, NY', customer: 'Global Log', packages: 5, estimatedTime: '11:15 AM', lat: 40.7489, lng: -73.9680 },
  { id: 'S4', address: '321 Park Ave, NY', customer: 'Metro Sup', packages: 1, estimatedTime: '12:00 PM', lat: 40.7614, lng: -73.9776 },
  { id: 'S5', address: '654 Fifth Ave, NY', customer: 'Retail Plus', packages: 4, estimatedTime: '12:45 PM', lat: 40.7549, lng: -73.9840 },
];

type OptimizationMode = 'cost' | 'speed' | 'balanced';

export default function RouteOptimization() {
  const [mode, setMode] = useState<OptimizationMode>('balanced');
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => setIsOptimizing(false), 2000);
  };

  const getEstimates = () => {
    switch (mode) {
      case 'cost':
        return { distance: '38 km', duration: '2h 45m', cost: '$285', fuel: '3.2 L' };
      case 'speed':
        return { distance: '45 km', duration: '1h 50m', cost: '$356', fuel: '4.1 L' };
      case 'balanced':
      default:
        return { distance: '41 km', duration: '2h 15m', cost: '$312', fuel: '3.6 L' };
    }
  };

  const estimates = getEstimates();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-gray-900 mb-2">Route Optimization</h1>
        <p className="text-sm text-gray-600">Optimize delivery routes for efficiency and cost savings</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="xl:col-span-2 space-y-6">
          {/* Optimization Options */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg text-gray-900 mb-4">Optimization Mode</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button
                onClick={() => setMode('cost')}
                className={`p-4 rounded-lg border-2 transition ${
                  mode === 'cost'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <DollarSign className={`w-6 h-6 mb-2 mx-auto ${mode === 'cost' ? 'text-blue-600' : 'text-gray-600'}`} />
                <p className={`text-sm ${mode === 'cost' ? 'text-blue-900' : 'text-gray-900'}`}>Lowest Cost</p>
                <p className="text-xs text-gray-500 mt-1">Minimize expenses</p>
              </button>
              <button
                onClick={() => setMode('speed')}
                className={`p-4 rounded-lg border-2 transition ${
                  mode === 'speed'
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Zap className={`w-6 h-6 mb-2 mx-auto ${mode === 'speed' ? 'text-green-600' : 'text-gray-600'}`} />
                <p className={`text-sm ${mode === 'speed' ? 'text-green-900' : 'text-gray-900'}`}>Fastest Route</p>
                <p className="text-xs text-gray-500 mt-1">Quickest delivery</p>
              </button>
              <button
                onClick={() => setMode('balanced')}
                className={`p-4 rounded-lg border-2 transition ${
                  mode === 'balanced'
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <TrendingDown className={`w-6 h-6 mb-2 mx-auto ${mode === 'balanced' ? 'text-purple-600' : 'text-gray-600'}`} />
                <p className={`text-sm ${mode === 'balanced' ? 'text-purple-900' : 'text-gray-900'}`}>Balanced</p>
                <p className="text-xs text-gray-500 mt-1">Best of both</p>
              </button>
            </div>
            <button
              onClick={handleOptimize}
              disabled={isOptimizing}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition disabled:opacity-50"
            >
              {isOptimizing ? 'Optimizing...' : 'Optimize Route'}
            </button>
          </div>

          {/* Map Display */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-gray-900">Route Map</h3>
              <span className="text-sm text-gray-600">{routeStops.length} stops</span>
            </div>
            <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-lg h-[500px] relative overflow-hidden border border-gray-200">
              {/* Mock Map with Route Visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full p-8">
                  {/* Route Line */}
                  <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                    <defs>
                      <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                    {routeStops.map((stop, idx) => {
                      if (idx === routeStops.length - 1) return null;
                      const x1 = `${(idx / (routeStops.length - 1)) * 80 + 10}%`;
                      const y1 = `${20 + Math.sin(idx) * 15 + idx * 12}%`;
                      const x2 = `${((idx + 1) / (routeStops.length - 1)) * 80 + 10}%`;
                      const y2 = `${20 + Math.sin(idx + 1) * 15 + (idx + 1) * 12}%`;
                      return (
                        <line
                          key={`line-${idx}`}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="url(#routeGradient)"
                          strokeWidth="3"
                          strokeDasharray="8,4"
                        />
                      );
                    })}
                  </svg>
                  
                  {/* Stops */}
                  {routeStops.map((stop, idx) => (
                    <div
                      key={stop.id}
                      className="absolute"
                      style={{
                        left: `${(idx / (routeStops.length - 1)) * 80 + 10}%`,
                        top: `${20 + Math.sin(idx) * 15 + idx * 12}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 2
                      }}
                    >
                      <div className="relative group">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                          idx === 0 ? 'bg-green-500' : 
                          idx === routeStops.length - 1 ? 'bg-red-500' : 
                          'bg-blue-600'
                        }`}>
                          <span className="text-white text-sm">{idx + 1}</span>
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                          <div className="bg-white rounded-lg shadow-lg p-3 whitespace-nowrap border border-gray-200">
                            <p className="text-sm text-gray-900">{stop.customer}</p>
                            <p className="text-xs text-gray-500">{stop.address}</p>
                            <p className="text-xs text-blue-600 mt-1">{stop.packages} packages</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Route Stops List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg text-gray-900 mb-4">Route Stops</h3>
            <div className="space-y-3">
              {routeStops.map((stop, idx) => (
                <div key={stop.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    idx === 0 ? 'bg-green-500' : 
                    idx === routeStops.length - 1 ? 'bg-red-500' : 
                    'bg-blue-600'
                  }`}>
                    <span className="text-white text-sm">{idx + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{stop.customer}</p>
                    <p className="text-xs text-gray-500">{stop.address}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm text-gray-900">{stop.estimatedTime}</p>
                    <p className="text-xs text-gray-500">{stop.packages} packages</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cost Estimate Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg text-gray-900 mb-4">Route Estimates</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Navigation className="w-5 h-5 text-blue-600" />
                  <p className="text-sm text-gray-700">Total Distance</p>
                </div>
                <p className="text-2xl text-gray-900">{estimates.distance}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-gray-700">Estimated Time</p>
                </div>
                <p className="text-2xl text-gray-900">{estimates.duration}</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                  <p className="text-sm text-gray-700">Estimated Cost</p>
                </div>
                <p className="text-2xl text-gray-900">{estimates.cost}</p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-orange-600" />
                  <p className="text-sm text-gray-700">Fuel Consumption</p>
                </div>
                <p className="text-2xl text-gray-900">{estimates.fuel}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg text-gray-900 mb-4">Optimization Savings</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Distance Saved</span>
                <span className="text-sm text-green-600">-8.2 km</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Time Saved</span>
                <span className="text-sm text-green-600">-35 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cost Saved</span>
                <span className="text-sm text-green-600">-$48</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Fuel Saved</span>
                <span className="text-sm text-green-600">-0.9 L</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-900">Efficiency Gain</span>
                <span className="text-lg text-green-600">+18%</span>
              </div>
            </div>
          </div>

          <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition">
            Apply & Start Route
          </button>
        </div>
      </div>
    </div>
  );
}
