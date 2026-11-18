// src/pages/OrderDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import { toast } from 'react-toastify';

const MyOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Dummy fetch
    const dummy = {
      id,
      classTitle: 'Belajar Machine Learning',
      price: 350000,
      status: 'pending',
      transactionDate: '2025-08-15T10:00:00',
      expireDate: '2025-08-16T10:00:00',   // after this, considered expired
      paymentUrl: 'https://app.midtrans.com/snap/v2/vt/...',
    };
    setOrder(dummy);
    // Check expiration
    if (new Date() > new Date(dummy.expireDate)) {
      setIsExpired(true);
      if (dummy.status === 'pending') {
        // Update status to canceled (call API)
        setOrder(prev => ({ ...prev, status: 'canceled' }));
      }
    }
  }, [id]);

  const handlePay = () => {
    if (order?.paymentUrl) {
      window.open(order.paymentUrl, '_blank');
    } else {
      toast.error('Link pembayaran tidak tersedia');
    }
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Detail Pesanan</h1>
          <div className="space-y-3">
            <div><span className="font-medium">ID Pesanan:</span> {order.id}</div>
            <div><span className="font-medium">Kelas:</span> {order.classTitle}</div>
            <div><span className="font-medium">Harga:</span> Rp {order.price.toLocaleString()}</div>
            <div><span className="font-medium">Tanggal Transaksi:</span> {new Date(order.transactionDate).toLocaleString()}</div>
            <div>
              <span className="font-medium">Batas Pembayaran:</span>{' '}
              {new Date(order.expireDate).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Status:</span>{' '}
              <span className={`font-bold ${
                order.status === 'success' ? 'text-green-600' :
                order.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {order.status}
              </span>
            </div>

            {order.status === 'pending' && !isExpired && (
              <button
                onClick={handlePay}
                className="mt-4 w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-600 font-semibold"
              >
                Bayar Sekarang
              </button>
            )}
            {isExpired && order.status === 'canceled' && (
              <p className="text-red-500 mt-2">Pesanan telah kadaluarsa dan dibatalkan.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderDetail;