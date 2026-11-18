// src/components/learning/ClassCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, User, Tag } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const ClassCard = ({ cls }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={cls.thumbnail} alt={cls.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{cls.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <Calendar className="w-4 h-4 mr-1" />
          {cls.registrationStart} – {cls.registrationEnd}
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <Tag className="w-4 h-4 mr-1" />
          Level: {cls.level}
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <Users className="w-4 h-4 mr-1" />
          Peserta: {cls.peserta} | Kuota: {cls.kuota}
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <User className="w-4 h-4 mr-1" />
          {cls.instructor}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-primary">
            {cls.isFree ? 'Gratis' : formatCurrency(cls.price, 'IDR')}
          </span>
          <Link
            to={`/public-class/${cls.id}`}
            className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-primary-600 text-sm font-medium"
          >
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;