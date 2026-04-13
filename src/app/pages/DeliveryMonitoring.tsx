import React, { useState } from 'react';
import { Truck, MapPin, Phone, Navigation, Package, CheckCircle, Clock } from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';

interface Driver {
  id: string;
  name: string;
  vehicle: string;
  phone: string;
  currentLocation: string;
  activeDeliveries: number;
  completedToday: number;
  status: 'active' | 'break' | 'offline';
  lat: number;
  lng: number;
  avatar: string;
}

interface Delivery {
  id: string;
  packageId: string;
  customer: string;
  address: string;
  status: 'pending' | 'picked-up' | 'in-transit' | 'delivered';
  progress: number;
  estimatedTime: string;
  driverId: string;
}

const drivers: Driver[] = [
  { id: 'D1', name: 'John Martinez', vehicle: 'VAN-001', phone: '+1 555-0101', currentLocation: 'Downtown', activeDeliveries: 3, completedToday: 12, status: 'active', lat: 40.7128, lng: -74.0060, avatar: 'JM' },
  { id: 'D2', name: 'Sarah Johnson', vehicle: 'VAN-002', phone: '+1 555-0102', currentLocation: 'North District', activeDeliveries: 2, completedToday: 9, status: 'active', lat: 40.7580, lng: -73.9855, avatar: 'SJ' },
  { id: 'D3', name: 'Mike Chen', vehicle: 'TRUCK-003', phone: '+1 555-0103', currentLocation: 'East Side', activeDeliveries: 0, completedToday: 7, status: 'break', lat: 40.7489, lng: -73.9680, avatar: 'MC' },
  { id: 'D4', name: 'Emily Davis', vehicle: 'VAN-004', phone: '+1 555-0104', currentLocation: 'West End', activeDeliveries: 4, completedToday: 11, status: 'active', lat: 40.7614, lng: -73.9776, avatar: 'ED' },
];

const deliveries: Delivery[] = [
  { id: 'DEL001', packageId: 'PKG-2026-001', customer: 'Acme Corp', address: '123 Business Ave', status: 'in-transit', progress: 65, estimatedTime: '15 min', driverId: 'D1' },
  { id: 'DEL002', packageId: 'PKG-2026-002', customer: 'TechStart', address: '456 Tech Street', status: 'in-transit', progress: 85, estimatedTime: '8 min', driverId: 'D1' },
  { id: 'DEL003', packageId: 'PKG-2026-003', customer: 'Global Log', address: '789 Logistics Blvd', status: 'picked-up', progress: 25, estimatedTime: '45 min', driverId: 'D2' },
  { id: 'DEL004', packageId: 'PKG-2026-004', customer: 'Metro Sup', address: '321 Metro Way', status: 'delivered', progress: 100, estimatedTime: 'Completed', driverId: 'D4' },
  { id: 'DEL005', packageId: 'PKG-2026-005', customer: 'Retail Plus', address: '654 Fifth Ave', status: 'in-transit', progress: 50, estimatedTime: '22 min', driverId: 'D4' },
];

export default function DeliveryMonitoring() {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'in-transit': return 'bg-blue-100 text-blue-700';
      case 'picked-up': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-gray-900 mb-2">Delivery Monitoring</h1>
        <p className="text-sm text-gray-600">Real-time tracking of deliveries and drivers</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <p className="text-2xl text-gray-900">48</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">In Transit</p>
          </div>
          <p className="text-2xl text-gray-900">9</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <p className="text-2xl text-gray-900">12</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Navigation className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600">Active Drivers</p>
          </div>
          <p className="text-2xl text-gray-900">3</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Real-time Map */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-gray-900">Live Tracking Map</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live</span>
            </div>
          </div>
          
          {/* Map Container */}
          <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-lg h-[600px] relative overflow-hidden border border-gray-200">
            <div className="absolute inset-0 p-8">
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}></div>

              {/* Driver Markers */}
              {drivers.map((driver, idx) => (
                <div
                  key={driver.id}
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${20 + idx * 20}%`,
                    top: `${30 + Math.sin(idx) * 20}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10
                  }}
                  onClick={() => setSelectedDriver(driver)}
                >
                  {/* Driver Avatar */}
                  <div className={`relative ${
                    driver.status === 'active' ? 'animate-pulse' : ''
                  }`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-500 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white">
                      {driver.avatar}
                    </div>
                    {driver.status === 'active' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                    <div className="bg-white rounded-lg shadow-xl p-4 whitespace-nowrap border border-gray-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Truck className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-900">{driver.name}</p>
                          <p className="text-xs text-gray-500">{driver.vehicle}</p>
                        </div>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-600">Active:</span>
                          <span className="text-gray-900">{driver.activeDeliveries} deliveries</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-600">Completed:</span>
                          <span className="text-gray-900">{driver.completedToday} today</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active deliveries indicator */}
                  {driver.activeDeliveries > 0 && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full shadow-lg">
                      {driver.activeDeliveries}
                    </div>
                  )}
                </div>
              ))}

              {/* Delivery Points */}
              {deliveries.filter(d => d.status !== 'delivered').map((delivery, idx) => (
                <div
                  key={delivery.id}
                  className="absolute"
                  style={{
                    left: `${30 + idx * 15}%`,
                    top: `${50 + Math.cos(idx) * 15}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 5
                  }}
                >
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drivers Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg text-gray-900 mb-4">Active Drivers</h3>
            <div className="space-y-3">
              {drivers.map((driver) => (
                <div
                  key={driver.id}
                  onClick={() => setSelectedDriver(driver)}
                  className={`p-3 rounded-lg cursor-pointer transition ${
                    selectedDriver?.id === driver.id
                      ? 'bg-blue-50 border-2 border-blue-200'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center text-white">
                      {driver.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{driver.name}</p>
                      <p className="text-xs text-gray-500">{driver.vehicle}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      driver.status === 'active' ? 'bg-green-100 text-green-700' :
                      driver.status === 'break' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-200 text-gray-700'
                    }`}>
                      {driver.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {driver.currentLocation}
                    </span>
                    <span className="text-blue-600">{driver.activeDeliveries} active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedDriver && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg text-gray-900 mb-4">Driver Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm text-gray-900">{selectedDriver.phone}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Completed Today</span>
                    <span className="text-sm text-gray-900">{selectedDriver.completedToday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Deliveries</span>
                    <span className="text-sm text-gray-900">{selectedDriver.activeDeliveries}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Deliveries */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg text-gray-900 mb-4">Active Deliveries</h3>
        <div className="space-y-4">
          {deliveries.map((delivery) => {
            const driver = drivers.find(d => d.id === delivery.driverId);
            return (
              <div key={delivery.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="w-4 h-4 text-blue-600" />
                      <p className="text-sm text-gray-900">{delivery.packageId}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(delivery.status)}`}>
                        {delivery.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{delivery.customer} - {delivery.address}</p>
                    {driver && (
                      <p className="text-xs text-gray-500 mt-1">
                        <Truck className="w-3 h-3 inline mr-1" />
                        {driver.name} ({driver.vehicle})
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">{delivery.estimatedTime}</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Progress</span>
                    <span className="text-xs text-gray-900">{delivery.progress}%</span>
                  </div>
                  <Progress.Root className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2">
                    <Progress.Indicator
                      className="bg-gradient-to-r from-blue-600 to-green-500 h-full transition-transform duration-500"
                      style={{ transform: `translateX(-${100 - delivery.progress}%)` }}
                    />
                  </Progress.Root>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
