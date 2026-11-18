// src/components/learning/LearningCard.jsx
import React from 'react';
import { Clock, User, BookOpen } from 'lucide-react';

export default function LearningCard ({ learning, completed, onClick }) {
  const progressPercentage = (learning.completedHours / learning.totalHours) * 100;

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      <img
        src={learning.thumbnail}
        alt={learning.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{learning.name}</h3>

        <div className="flex items-center mb-3">
          <img
            src={learning.speakerAvatar}
            alt={learning.speaker}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-sm text-gray-600">{learning.speaker}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Clock className="w-4 h-4 mr-1" />
          <span>{learning.totalHours} hours</span>
          <BookOpen className="w-4 h-4 ml-4 mr-1" />
          <span>{learning.learningCount} learnings</span>
        </div>

        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block text-blue-600">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>
          {completed ? (
            <p className="text-green-600">Completed ✓</p>
          ) : (
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${progressPercentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// export default LearningCard;