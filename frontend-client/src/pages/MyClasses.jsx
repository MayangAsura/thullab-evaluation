// src/pages/MyOrders.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';

const MyClasses = () => {
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
        <h1 className="text-2xl font-bold mb-6">My Classes</h1>
        <div className="grid grid-cols-1 gap-4">
          {orders.map(order => (
            <Link
              key={order.id}
              to={`/my-orders/${order.id}`}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                 <div key={item.id} className="bg-white rounded-lg p-6 shadow-md">
                   <div className="flex justify-between items-center">
                     <div>
                       <h3 className="font-semibold text-lg">{item.name}</h3>
                       <p className="text-gray-600">Speaker: {item.speaker}</p>
                     <p className="text-green-600">Completed ✓</p>
                     </div>
                    <span className="text-sm text-gray-500">{item.completedDate}</span>
                   </div>
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

export default MyClasses;