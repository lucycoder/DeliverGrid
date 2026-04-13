import React, { useState } from 'react';
import { AlertCircle, MessageSquare, Clock, CheckCircle, XCircle, User } from 'lucide-react';

interface TimelineEvent {
  id: string;
  type: 'created' | 'updated' | 'resolved' | 'comment';
  message: string;
  timestamp: string;
  user: string;
}

interface Complaint {
  id: string;
  ticketNumber: string;
  customer: string;
  subject: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  category: string;
  created: string;
  assignedTo: string;
  timeline: TimelineEvent[];
}

const mockComplaints: Complaint[] = [
  {
    id: 'C001',
    ticketNumber: 'TICKET-2026-001',
    customer: 'Acme Corporation',
    subject: 'Package delivered to wrong address',
    description: 'The package TRK-2026-001234 was delivered to a neighbor instead of our office. Please investigate and redeliver.',
    severity: 'high',
    status: 'in-progress',
    category: 'Delivery Error',
    created: '2026-02-16 09:30',
    assignedTo: 'Sarah Johnson',
    timeline: [
      { id: 'T1', type: 'created', message: 'Complaint created', timestamp: '2026-02-16 09:30', user: 'System' },
      { id: 'T2', type: 'updated', message: 'Assigned to Sarah Johnson', timestamp: '2026-02-16 09:45', user: 'Admin' },
      { id: 'T3', type: 'comment', message: 'Contacted driver, attempting redelivery', timestamp: '2026-02-16 10:15', user: 'Sarah Johnson' }
    ]
  },
  {
    id: 'C002',
    ticketNumber: 'TICKET-2026-002',
    customer: 'TechStart Inc',
    subject: 'Damaged package received',
    description: 'Package arrived with visible damage. Box was crushed and contents may be affected.',
    severity: 'critical',
    status: 'open',
    category: 'Damage',
    created: '2026-02-16 11:20',
    assignedTo: 'Mike Chen',
    timeline: [
      { id: 'T4', type: 'created', message: 'Complaint created', timestamp: '2026-02-16 11:20', user: 'System' },
      { id: 'T5', type: 'updated', message: 'Assigned to Mike Chen', timestamp: '2026-02-16 11:25', user: 'Admin' }
    ]
  },
  {
    id: 'C003',
    ticketNumber: 'TICKET-2026-003',
    customer: 'Global Logistics',
    subject: 'Late delivery complaint',
    description: 'Package was scheduled for delivery on Feb 15 but arrived on Feb 16. This caused delays in our operations.',
    severity: 'medium',
    status: 'resolved',
    category: 'Delay',
    created: '2026-02-15 14:00',
    assignedTo: 'John Martinez',
    timeline: [
      { id: 'T6', type: 'created', message: 'Complaint created', timestamp: '2026-02-15 14:00', user: 'System' },
      { id: 'T7', type: 'updated', message: 'Assigned to John Martinez', timestamp: '2026-02-15 14:15', user: 'Admin' },
      { id: 'T8', type: 'comment', message: 'Investigated route delay, weather conditions', timestamp: '2026-02-15 15:30', user: 'John Martinez' },
      { id: 'T9', type: 'resolved', message: 'Compensation applied, customer satisfied', timestamp: '2026-02-16 09:00', user: 'John Martinez' }
    ]
  },
  {
    id: 'C004',
    ticketNumber: 'TICKET-2026-004',
    customer: 'Metro Supplies',
    subject: 'Missing items in package',
    description: 'Package received but 2 items listed on the manifest were missing.',
    severity: 'high',
    status: 'in-progress',
    category: 'Missing Items',
    created: '2026-02-16 08:15',
    assignedTo: 'Emily Davis',
    timeline: [
      { id: 'T10', type: 'created', message: 'Complaint created', timestamp: '2026-02-16 08:15', user: 'System' },
      { id: 'T11', type: 'updated', message: 'Assigned to Emily Davis', timestamp: '2026-02-16 08:30', user: 'Admin' },
      { id: 'T12', type: 'comment', message: 'Checking warehouse records', timestamp: '2026-02-16 10:00', user: 'Emily Davis' }
    ]
  },
  {
    id: 'C005',
    ticketNumber: 'TICKET-2026-005',
    customer: 'Retail Plus',
    subject: 'Driver was unprofessional',
    description: 'Driver was rude during delivery and did not follow proper procedures.',
    severity: 'low',
    status: 'closed',
    category: 'Service Quality',
    created: '2026-02-14 16:30',
    assignedTo: 'Sarah Johnson',
    timeline: [
      { id: 'T13', type: 'created', message: 'Complaint created', timestamp: '2026-02-14 16:30', user: 'System' },
      { id: 'T14', type: 'updated', message: 'Assigned to Sarah Johnson', timestamp: '2026-02-14 16:45', user: 'Admin' },
      { id: 'T15', type: 'comment', message: 'Spoke with driver, provided additional training', timestamp: '2026-02-15 09:00', user: 'Sarah Johnson' },
      { id: 'T16', type: 'resolved', message: 'Issue resolved, customer apologized to', timestamp: '2026-02-15 14:00', user: 'Sarah Johnson' }
    ]
  },
];

export default function Complaints() {
  const [complaints] = useState<Complaint[]>(mockComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredComplaints = filterStatus === 'all'
    ? complaints
    : complaints.filter(c => c.status === filterStatus);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'open': return 'bg-yellow-100 text-yellow-700';
      case 'closed': return 'bg-gray-200 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'created': return <AlertCircle className="w-4 h-4 text-blue-600" />;
      case 'updated': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'comment': return <MessageSquare className="w-4 h-4 text-purple-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">Complaints Management</h1>
          <p className="text-sm text-gray-600">Track and resolve customer complaints</p>
        </div>
        <div className="flex gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-sm text-gray-600">Open</p>
          </div>
          <p className="text-2xl text-gray-900">{complaints.filter(c => c.status === 'open').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
          <p className="text-2xl text-gray-900">{complaints.filter(c => c.status === 'in-progress').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Resolved</p>
          </div>
          <p className="text-2xl text-gray-900">{complaints.filter(c => c.status === 'resolved').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <XCircle className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-sm text-gray-600">Closed</p>
          </div>
          <p className="text-2xl text-gray-900">{complaints.filter(c => c.status === 'closed').length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Complaint Cards */}
        <div className="space-y-4">
          {filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              onClick={() => setSelectedComplaint(complaint)}
              className={`bg-white rounded-xl shadow-sm border cursor-pointer transition hover:shadow-md ${
                selectedComplaint?.id === complaint.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100'
              }`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm text-gray-900">{complaint.ticketNumber}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs border ${getSeverityColor(complaint.severity)}`}>
                        {complaint.severity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{complaint.customer}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                </div>

                {/* Subject */}
                <h4 className="text-base text-gray-900 mb-2">{complaint.subject}</h4>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{complaint.description}</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{complaint.created}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <User className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-700">{complaint.assignedTo}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline View */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
          {selectedComplaint ? (
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg text-gray-900">Complaint Details</h2>
                  <button
                    onClick={() => setSelectedComplaint(null)}
                    className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                {/* Complaint Info Card */}
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base text-gray-900">{selectedComplaint.ticketNumber}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(selectedComplaint.severity)}`}>
                      {selectedComplaint.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{selectedComplaint.subject}</p>
                  <p className="text-xs text-gray-600 mb-3">{selectedComplaint.description}</p>
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500">Customer</p>
                      <p className="text-sm text-gray-900">{selectedComplaint.customer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="text-sm text-gray-900">{selectedComplaint.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Assigned To</p>
                      <p className="text-sm text-gray-900">{selectedComplaint.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs ${getStatusColor(selectedComplaint.status)}`}>
                        {selectedComplaint.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-sm text-gray-700 mb-4">Activity Timeline</h3>
                <div className="space-y-4 relative">
                  {/* Timeline Line */}
                  <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-200"></div>

                  {selectedComplaint.timeline.map((event, idx) => (
                    <div key={event.id} className="relative flex gap-3">
                      <div className="relative z-10 flex-shrink-0 w-6 h-6 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
                        {getTimelineIcon(event.type)}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-900 mb-1">{event.message}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">{event.user}</p>
                            <p className="text-xs text-gray-500">{event.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                    Add
                  </button>
                </div>
                <div className="flex gap-3 mt-3">
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm">
                    Resolve
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm">
                    Close
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Select a complaint to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
