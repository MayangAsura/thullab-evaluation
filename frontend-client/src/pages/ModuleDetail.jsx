// src/pages/ModuleDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import { Clock, FileText, Headphones, Video } from 'lucide-react';

export default function ModuleDetail () {
  const { id } = useParams();
  const [module, setModule] = useState(null);

  useEffect(() => {
    // Fetch module data - Mock data
    const mockModule = {
      id: id,
      name: 'Introduction to React Hooks',
      level: 'Intermediate',
      type: 'video',
      duration: 45,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      content: 'This is the article content for the module...',
      pdfUrl: '/sample.pdf',
    };
    setModule(mockModule);

    getModule()

  }, [id]);

  const getModule = async () => {

    try {

      await axios.get(`${BASE_URL}/api/learnings/${id}`, {withCredentials: true})
                  .then(result => {
                    if(result.status === 200){
                      setModule(result.data.data)
                    }
                  })
                  .catch(error => {
                    toast.error('Failed, Failed to get module data.')
                  })

    } catch (error) {
      toast.error('Failed, Failed to get module data.')
    }

  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const secs = 0;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} UTC Jakarta`;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="w-5 h-5 text-blue-500" />;
      case 'audio':
        return <Headphones className="w-5 h-5 text-green-500" />;
      case 'article':
      case 'pdf':
        return <FileText className="w-5 h-5 text-orange-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const renderContent = () => {
    switch (module?.type) {
      case 'video':
        return (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={module.videoUrl}
              title={module.name}
              className="w-full h-96 rounded-lg"
              allowFullScreen
            />
          </div>
        );

      case 'audio':
        return (
          <div className="p-6">
            <audio controls className="w-full">
              <source src={module.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        );

      case 'article':
        return (
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="prose max-w-none">
              {module.content}
            </div>
          </div>
        );

      case 'pdf':
        return (
          <div className="p-6 max-h-96 overflow-y-auto">
            <embed
              src={module.pdfUrl}
              type="application/pdf"
              className="w-full h-96"
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (!module) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            {getTypeIcon(module.type)}
            <span className="text-sm font-semibold text-gray-500 uppercase">
              {module.type}
            </span>
          </div>

          <h1 className="text-2xl font-bold mb-4">{module.name}</h1>

          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>{formatDuration(module.duration)}</span>
            </div>
            <div>
              <span className="font-medium">Level:</span> {module.level}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// export default ModuleDetail;