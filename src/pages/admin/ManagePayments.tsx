import React, { useState } from 'react';
import { 
  DollarSign, 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  TrendingDown,
  CreditCard,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

// Mock payment data
const mockPayments = [
  {
    id: 'PAY001',
    appointmentId: 'APT001',
    patientName: 'John Doe',
    doctorName: 'Dr. Sarah Johnson',
    amount: 150,
    fee: 15,
    netAmount: 135,
    currency: 'USD',
    status: 'completed',
    method: 'credit_card',
    cardLast4: '4242',
    date: '2025-06-15',
    time: '10:30 AM',
    transactionId: 'txn_1234567890',
    refundable: true,
  },
  {
    id: 'PAY002',
    appointmentId: 'APT002',
    patientName: 'Emma Wilson',
    doctorName: 'Dr. Michael Chen',
    amount: 100,
    fee: 10,
    netAmount: 90,
    currency: 'USD',
    status: 'pending',
    method: 'credit_card',
    cardLast4: '5555',
    date: '2025-06-15',
    time: '2:45 PM',
    transactionId: 'txn_0987654321',
    refundable: false,
  },
  {
    id: 'PAY003',
    appointmentId: 'APT003',
    patientName: 'Robert Smith',
    doctorName: 'Dr. Emma Wilson',
    amount: 175,
    fee: 17.5,
    netAmount: 157.5,
    currency: 'USD',
    status: 'refunded',
    method: 'credit_card',
    cardLast4: '1111',
    date: '2025-06-14',
    time: '11:15 AM',
    transactionId: 'txn_1122334455',
    refundable: false,
    refundAmount: 175,
    refundDate: '2025-06-14',
  },
  {
    id: 'PAY004',
    appointmentId: 'APT004',
    patientName: 'Mary Johnson',
    doctorName: 'Dr. David Rodriguez',
    amount: 200,
    fee: 20,
    netAmount: 180,
    currency: 'USD',
    status: 'failed',
    method: 'credit_card',
    cardLast4: '9999',
    date: '2025-06-13',
    time: '3:20 PM',
    transactionId: 'txn_5566778899',
    refundable: false,
    failureReason: 'Insufficient funds',
  },
];

const ManagePayments: React.FC = () => {
  const [payments, setPayments] = useState(mockPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'completed' | 'pending' | 'refunded' | 'failed'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleRefund = (paymentId: string) => {
    if (window.confirm('Are you sure you want to process this refund?')) {
      setPayments(payments.map(payment => 
        payment.id === paymentId 
          ? { 
              ...payment, 
              status: 'refunded', 
              refundAmount: payment.amount,
              refundDate: new Date().toISOString().split('T')[0]
            } 
          : payment
      ));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'refunded':
        return <RefreshCw className="h-4 w-4" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Calculate stats
  const stats = {
    totalRevenue: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    totalFees: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.fee, 0),
    totalRefunds: payments.filter(p => p.status === 'refunded').reduce((sum, p) => sum + (p.refundAmount || 0), 0),
    pendingAmount: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    completedCount: payments.filter(p => p.status === 'completed').length,
    pendingCount: payments.filter(p => p.status === 'pending').length,
    refundedCount: payments.filter(p => p.status === 'refunded').length,
    failedCount: payments.filter(p => p.status === 'failed').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Payments</h1>
          <p className="text-gray-600">
            Monitor transactions, process refunds, and track revenue
          </p>
        </div>
        <Button leftIcon={<Download className="h-4 w-4" />}>
          Export Report
        </Button>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900">${stats.totalRevenue}</h3>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+12.5%</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Platform Fees</p>
              <h3 className="text-2xl font-bold text-gray-900">${stats.totalFees}</h3>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+8.2%</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending Amount</p>
              <h3 className="text-2xl font-bold text-gray-900">${stats.pendingAmount}</h3>
              <div className="flex items-center mt-1">
                <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm text-yellow-500">{stats.pendingCount} transactions</span>
              </div>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Refunds</p>
              <h3 className="text-2xl font-bold text-gray-900">${stats.totalRefunds}</h3>
              <div className="flex items-center mt-1">
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm text-red-500">{stats.refundedCount} refunds</span>
              </div>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <RefreshCw className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by patient, doctor, payment ID, or transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-5 w-5 text-gray-400" />}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<Filter className="h-4 w-4" />}
            >
              Filters
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="refunded">Refunded</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <select className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>Last 3 Months</option>
                  <option>Custom Range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount Range
                </label>
                <select className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                  <option>All Amounts</option>
                  <option>$0 - $100</option>
                  <option>$100 - $200</option>
                  <option>$200+</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Payments ({filteredPayments.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payment.id}</div>
                    <div className="text-sm text-gray-500">
                      •••• {payment.cardLast4}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {payment.patientName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {payment.appointmentId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {payment.doctorName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${payment.amount}
                    </div>
                    <div className="text-sm text-gray-500">
                      Fee: ${payment.fee}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      <span className="ml-1">
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </span>
                    {payment.status === 'failed' && payment.failureReason && (
                      <div className="text-xs text-red-600 mt-1">
                        {payment.failureReason}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(payment.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {payment.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {payment.refundable && payment.status === 'completed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRefund(payment.id)}
                        >
                          Refund
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        Details
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No payments found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                {stats.pendingCount}
              </h3>
              <p className="text-sm text-gray-500">Pending Payments</p>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" size="sm" className="w-full">
              Review Pending
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                {stats.failedCount}
              </h3>
              <p className="text-sm text-gray-500">Failed Payments</p>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" size="sm" className="w-full">
              Review Failed
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <RefreshCw className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                {stats.refundedCount}
              </h3>
              <p className="text-sm text-gray-500">Processed Refunds</p>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" size="sm" className="w-full">
              View Refunds
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePayments;