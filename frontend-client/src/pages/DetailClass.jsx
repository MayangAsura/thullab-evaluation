// src/pages/DetailClass.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import { formatCurrency } from '../utils/formatCurrency';
import { toast } from 'react-toastify';
import { useAuth } from '../components/auth/AuthProvider';   // custom auth hook

const DetailClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    // Fetch class detail – dummy for now
    setClassData({
      id,
      title: 'Belajar Machine Learning untuk Pemula',
      thumbnail: 'https://picsum.photos/800/400',
      description: 'Pelajari dasar-dasar machine learning...',
      price: 350000,
      isFree: false,
      instructor: 'John Doe',
      level: 'Pemula',
      duration: '8 minggu',
      peserta: 'Umum',
      kuota: 50,
      registrationStart: '2025-09-01',
      registrationEnd: '2025-09-30',
      curriculum: ['Pengenalan', 'Supervised Learning', 'Unsupervised Learning', 'Proyek Akhir'],
    });
  }, [id]);

  const handlePurchase = () => {
    // if (!isAuthenticated) {
    //   toast.warning('Silakan login terlebih dahulu');
    //   navigate('/login');
    //   return;
    // }

    // Toast with actions
    toast.warning(
      <div>
        <p>Pastikan Data Akun Anda sudah benar</p>
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => navigate('/profile')}
            className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
          >
            Review Profile
          </button>
          <button
            onClick={() => proceedToPayment()}
            className="text-xs bg-green-500 text-white px-2 py-1 rounded"
          >
            OK
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false }
    );
  };

  const proceedToPayment = () => {
    // Midtrans Snap integration – replace with actual implementation
    window.snap.pay('SNAP_TOKEN_FROM_BACKEND', {
      onSuccess: function(result) {
        toast.success('Pembayaran berhasil!');
        navigate('/');
      },
      onPending: function(result) {
        toast.info('Pembayaran tertunda, silakan cek My Order');
        navigate('/my-orders');
      },
      onError: function(result) {
        toast.error('Pembayaran gagal');
      },
      onClose: function() {
        toast.info('Anda menutup popup pembayaran');
      }
    });
  };

  if (!classData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={classData.thumbnail} alt={classData.title} className="w-full h-64 object-cover" />
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-4">{classData.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-2">Deskripsi</h2>
                <p className="text-gray-600 mb-4">{classData.description}</p>
                <h2 className="text-xl font-semibold mb-2">Kurikulum</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {classData.curriculum.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-3">
                  <div><span className="font-medium">Instruktur:</span> {classData.instructor}</div>
                  <div><span className="font-medium">Level:</span> {classData.level}</div>
                  <div><span className="font-medium">Durasi:</span> {classData.duration}</div>
                  <div><span className="font-medium">Peserta:</span> {classData.peserta}</div>
                  <div><span className="font-medium">Kuota:</span> {classData.kuota}</div>
                  <div className="text-2xl font-bold text-primary mt-4">
                    {classData.isFree ? 'Gratis' : formatCurrency(classData.price, 'IDR')}
                  </div>
                  <button
                    onClick={classData.isFree ? () => navigate('/register-class') : handlePurchase}
                    className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-600 font-semibold"
                  >
                    {classData.isFree ? 'Daftar Sekarang' : 'Beli Sekarang'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailClass;