// src/pages/MyOrders.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Dummy orders – replace with Supabase fetch
    setOrders([
      {
        id: 'INV-001',
        classTitle: 'Belajar Machine Learning',
        price: 350000,
        status: 'pending',
        transactionDate: '2025-08-15',
        expireDate: '2025-08-16',
        paymentUrl: '#',
        thumbnail: 'https://picsum.photos/100',
      },
      {
        id: 'INV-002',
        classTitle: 'Kelas Tahsin',
        price: 0,
        status: 'success',
        transactionDate: '2025-08-10',
        expireDate: '2025-08-11',
        paymentUrl: null,
        thumbnail: 'https://picsum.photos/100',
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <div className="grid grid-cols-1 gap-4">
          {orders.map(order => (
            <Link
              key={order.id}
              to={`/my-orders/${order.id}`}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img src={order.thumbnail} alt={order.classTitle} className="w-16 h-16 rounded object-cover" />
                <div>
                  <h3 className="font-semibold">{order.classTitle}</h3>
                  <p className="text-sm text-gray-500">{order.id}</p>
                  <p className="text-sm">
                    Status:{' '}
                    <span className={`font-medium ${
                      order.status === 'success' ? 'text-green-600' :
                      order.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {order.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{order.price ? `Rp ${order.price.toLocaleString()}` : 'Gratis'}</p>
                <p className="text-xs text-gray-500">{order.transactionDate}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;