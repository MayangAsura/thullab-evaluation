// src/pages/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLearnings } from '../store/slices/learningSlice';
import Header from '../components/layout/Header';
import BannerSlider from '../components/layout/BannerSlider';
import TabNavigation from '../components/layout/TabNavigation';
import LearningCard from '../components/learning/LearningCard';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('in-progress');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inProgress_, setInProgress] = useState([
    {
      name: "JavaScript Datatype",
      learning_hours: 800,

    }
  ])
  const [completed_, setCompleted] = useState([
    {
      name: "JavaScript Introduction",
      completedDate: new Date().toISOString(),
      speaker: "Sufyan"
    }
  ])
  const [skills_, setSkills] = useState([
    {
      name: "javascript basic",
      description: "Learn JavaScript for basic",
      achieved: true
    }
  ])
  const [certificates_, setCertificates] = useState([])
  const { inProgress, completed, skills, certificates, loading } = useSelector(
    (state) => state.learning
  );

  useEffect(() => {
    dispatch(fetchLearnings(activeTab));
  }, [activeTab, dispatch]);

  const tabs = [
    { id: 'in-progress', label: 'In Progress' },
    { id: 'completed', label: 'Complete' },
    { id: 'skills', label: 'Skills' },
    { id: 'certificates', label: 'Certificates' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'in-progress':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgress_.map((learning) => (
              <LearningCard
                key={learning.id}
                learning={learning}
                onClick={() => navigate(`/learning/${learning.id}`)}
              />
            ))}
          </div>
        );
      case 'completed':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* space-y-4 */}
            {completed_.map((item) => (
              <LearningCard
                key={item.id}
                learning={item}
                completed
                onClick={() => navigate(`/learning/${item.id}`)}
              />
            ))}
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-4">
            {skills_.map((skill) => (
              <div key={skill.id} className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{skill.name}</h3>
                    <p className="text-gray-600">{skill.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={skill.achieved}
                      readOnly
                      className="w-5 h-5"
                    />
                    <span className="text-sm text-gray-600">
                      {skill.achieved ? 'Achieved' : 'Not Achieved'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'certificates':
        return (
          <div className="space-y-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{cert.name}</h3>
                    <p className="text-gray-600">Published: {cert.publishedAt}</p>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />
      <BannerSlider />
      <main className="container mx-auto px-4 py-8">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div className="mt-8">
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            renderContent()
          )}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;