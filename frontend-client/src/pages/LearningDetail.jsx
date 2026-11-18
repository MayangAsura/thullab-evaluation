// src/pages/LearningDetail.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/layout/Header';
import { setCurrentLearning } from '../store/slices/learningSlice';
import { Clock, User, BarChart2, Play, FileText, Headphones, Video } from 'lucide-react';

export default function LearningDetail () {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentLearning } = useSelector((state) => state.learning);

  useEffect(() => {
    // Fetch learning detail by ID
    const fetchLearningDetail = async () => {
      // Mock data - replace with API call
      const mockData = {
        id: id,
        name: 'React Masterclass',
        level: 'Intermediate',
        totalHours: 24,
        completedHours: 12,
        speaker: 'John Doe',
        speakerName: 'John Doe',
        learnings: [
          {
            id: 1,
            name: 'Introduction to React',
            type: 'video',
            status: 'completed',
            duration: 45,
          },
          {
            id: 2,
            name: 'State Management',
            type: 'article',
            status: 'in-progress',
            duration: 30,
          },
          {
            id: 3,
            name: 'Hooks Deep Dive',
            type: 'audio',
            status: 'not-started',
            duration: 60,
          },
          {
            id: 4,
            name: 'React Router',
            type: 'video',
            status: 'not-started',
            duration: 50,
          },
          {
            id: 5,
            name: 'Final Evaluation',
            type: 'evaluation',
            status: 'not-started',
            duration: 90,
          },
          {
            id: 6,
            name: 'Advanced Patterns',
            type: 'module',
            status: 'not-started',
            duration: 120,
          },
        ],
      };
      dispatch(setCurrentLearning(mockData));
    };

    fetchLearningDetail();
  }, [id, dispatch]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5 text-blue-500" />;
      case 'audio':
        return <Headphones className="w-5 h-5 text-green-500" />;
      case 'article':
      case 'pdf':
        return <FileText className="w-5 h-5 text-orange-500" />;
      case 'evaluation':
        return <BarChart2 className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getActionButton = (learning) => {
    switch (learning.status) {
      case 'completed':
        return (
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" disabled>
            Completed ✓
          </button>
        );
      case 'in-progress':
        return (
          <button
            onClick={() => handleStartLearning(learning)}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Resume
          </button>
        );
      default:
        return (
          <button
            onClick={() => handleStartLearning(learning)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
          >
            <Play className="w-4 h-4 mr-1" />
            Start
          </button>
        );
    }
  };

  const handleStartLearning = (learning) => {
    switch (learning.type) {
      case 'evaluation':
        navigate(`/evaluations/${learning.id}`);
        break;
      case 'module':
        navigate(`/modules/${learning.id}`);
        break;
      default:
        // Handle video, audio, article, pdf
        navigate(`/modules/${learning.id}`);
    }
  };

  const progressPercentage = currentLearning
    ? (currentLearning.completedHours / currentLearning.totalHours) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {currentLearning && (
          <>
            {/* Class Information Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h1 className="text-2xl font-bold mb-4">{currentLearning.name}</h1>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <BarChart2 className="w-5 h-5 mr-2" />
                      <span>Level: {currentLearning.level}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2" />
                      <span>{currentLearning.totalHours} Hours Total</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <User className="w-5 h-5 mr-2" />
                      <span>Speaker: {currentLearning.speakerName}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Learning Progress</h3>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          {Math.round(progressPercentage)}%
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-gray-600">
                          {currentLearning.completedHours}/{currentLearning.totalHours} hours
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-3 text-xs flex rounded bg-blue-200">
                      <div
                        style={{ width: `${progressPercentage}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* My Learning Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">My Learning</h2>
              <div className="space-y-4">
                {currentLearning.learnings.map((learning, index) => (
                  <div
                    key={learning.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400 font-medium w-8">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {getTypeIcon(learning.type)}
                      <div>
                        <h3 className="font-medium">{learning.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">
                          {learning.type} • {learning.duration} min
                        </p>
                      </div>
                    </div>
                    {getActionButton(learning)}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

// export default LearningDetail;