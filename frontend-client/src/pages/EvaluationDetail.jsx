// src/pages/EvaluationDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/layout/Header';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import {
  fetchEvaluation,
  submitEvaluation,
  setAnswer,
  resetEvaluation,
} from '../store/slices/evaluationSlice';

export default function EvaluationDetail () {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const {
    currentEvaluation: evaluation,
    answers,
    loading,
    submitting,
    error,
    submitSuccess,
    score,
  } = useSelector((state) => state.evaluation);

  useEffect(() => {
    dispatch(fetchEvaluation(id));

    return () => {
      dispatch(resetEvaluation());
    };
  }, [id, dispatch]);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const secs = 0;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} UTC Jakarta`;
  };

  const handleAnswer = (questionId, answer) => {
    dispatch(setAnswer({ questionId, answer }));
  };

  const handleNext = () => {
    if (currentQuestion < evaluation.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    dispatch(submitEvaluation({ evaluationId: id, answers }));
  };

  const isAllQuestionsAnswered = () => {
    if (!evaluation?.questions) return false;

    return evaluation.questions.every((q) => {
      const answer = answers[q.id];

      // Check if answer exists
      if (answer === undefined || answer === null || answer === '') {
        return false;
      }

      // For multiple-answer, check if at least one option is selected
      if (q.type === 'multiple-answer') {
        return Array.isArray(answer) && answer.length > 0;
      }

      // For pair-to-pair, check if all pairs are filled
      if (q.type === 'pair-to-pair') {
        return q.columnA.every((item) => answer[item.number] && answer[item.number].trim() !== '');
      }

      return true;
    });
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <label
                key={option.label}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  answers[question.id] === option.label
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question_${question.id}`}
                  value={option.label}
                  checked={answers[question.id] === option.label}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="sr-only"
                />
                <span className={`w-8 h-8 flex items-center justify-center rounded-full border-2 mr-3 ${
                  answers[question.id] === option.label
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300'
                }`}>
                  {option.label}
                </span>
                <span className="text-gray-700">{option.text}</span>
              </label>
            ))}
          </div>
        );

      case 'multiple-answer':
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-3">Select all that apply</p>
            {question.options.map((option) => (
              <label
                key={option.label}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  answers[question.id]?.includes(option.label)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={answers[question.id]?.includes(option.label) || false}
                  onChange={(e) => {
                    const currentAnswers = answers[question.id] || [];
                    let newAnswers;
                    if (e.target.checked) {
                      newAnswers = [...currentAnswers, option.label];
                    } else {
                      newAnswers = currentAnswers.filter((a) => a !== option.label);
                    }
                    handleAnswer(question.id, newAnswers);
                  }}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-3"
                />
                <span className="font-medium mr-2">{option.label}.</span>
                <span className="text-gray-700">{option.text}</span>
              </label>
            ))}
          </div>
        );

      case 'true-false':
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <label
                key={option.label}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  answers[question.id] === option.label
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question_${question.id}`}
                  value={option.label}
                  checked={answers[question.id] === option.label}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="sr-only"
                />
                <span className={`w-8 h-8 flex items-center justify-center rounded-full border-2 mr-3 ${
                  answers[question.id] === option.label
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300'
                }`}>
                  {option.label}
                </span>
                <span className="text-gray-700">{option.text}</span>
              </label>
            ))}
          </div>
        );

      case 'essay':
        return (
          <div className="space-y-2">
            <textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="Type your answer here..."
            />
            <p className="text-sm text-gray-500">
              {(answers[question.id] || '').length} characters
            </p>
          </div>
        );

      case 'pair-to-pair':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-700">Column A</h4>
                {question.columnA.map((item) => (
                  <div key={item.number} className="mb-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="font-medium">{item.number}.</span> {item.text}
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-gray-700">Column B</h4>
                {question.columnB.map((item) => (
                  <div key={item.label} className="mb-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="font-medium">{item.label}.</span> {item.text}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3 text-gray-700">Your Matching Answers</h4>
              <div className="grid grid-cols-1 gap-3">
                {question.columnA.map((item) => (
                  <div key={item.number} className="flex items-center space-x-3">
                    <span className="font-medium w-8">{item.number}</span>
                    <span className="text-gray-400">-</span>
                    <input
                      type="text"
                      value={answers[question.id]?.[item.number] || ''}
                      onChange={(e) => {
                        const currentPairs = answers[question.id] || {};
                        const value = e.target.value.toUpperCase().slice(0, 1);
                        handleAnswer(question.id, {
                          ...currentPairs,
                          [item.number]: value,
                        });
                      }}
                      className="w-20 p-2 border-2 border-gray-300 rounded-lg text-center focus:border-blue-500 focus:outline-none uppercase"
                      placeholder="?"
                      maxLength={1}
                    />
                    <span className="text-sm text-gray-500">
                      Match with letter from Column B
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Success page after submission
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Evaluation Submitted Successfully!
              </h1>
              {score !== null && (
                <div className="mb-6">
                  <p className="text-lg text-gray-600">Your Score:</p>
                  <p className="text-4xl font-bold text-blue-600">{score}%</p>
                </div>
              )}
              <button
                onClick={() => navigate('/')}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading evaluation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!evaluation) {
    return null;
  }

  const currentQ = evaluation.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Left Navigation - Question Numbers */}
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <div className="flex items-center mb-4">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {formatDuration(evaluation.duration)}
                </span>
              </div>
              <h3 className="font-semibold mb-4">Questions</h3>
              <div className="grid grid-cols-5 gap-2">
                {evaluation.questions.map((q, index) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center font-medium transition-all ${
                      index === currentQuestion
                        ? 'border-blue-500 bg-blue-500 text-white shadow-md scale-105'
                        : answers[q.id]
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:shadow'
                    }`}
                  >
                    {q.number}
                  </button>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Answered:</span>
                  <span className="font-semibold">
                    {Object.keys(answers).length}/{evaluation.questions.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Question */}
          <div className="flex-1 min-w-0">
            {/* Evaluation Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-2xl font-bold mb-2">{evaluation.name}</h1>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                Duration: {formatDuration(evaluation.duration)}
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    Question {currentQ.number} of {evaluation.questions.length}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 capitalize">
                    {currentQ.type.replace(/-/g, ' ')}
                  </span>
                </div>
                {answers[currentQ.id] && (
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                    Answered ✓
                  </span>
                )}
              </div>

              <h2 className="text-lg font-semibold mb-6 text-gray-800">
                {currentQ.question}
              </h2>

              <div className="mb-6">
                {renderQuestion(currentQ)}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestion === 0}
                  className="flex items-center px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>

                <span className="text-sm text-gray-500 self-center">
                  {currentQuestion + 1} / {evaluation.questions.length}
                </span>

                <button
                  onClick={handleNext}
                  disabled={currentQuestion === evaluation.questions.length - 1}
                  className="flex items-center px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                disabled={!isAllQuestionsAnswered() || submitting}
                onClick={handleSubmit}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                  isAllQuestionsAnswered()
                    ? 'bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </span>
                ) : (
                  `Submit Evaluation (${Object.keys(answers).length}/${evaluation.questions.length} answered)`
                )}
              </button>

              {!isAllQuestionsAnswered() && (
                <p className="text-center text-sm text-gray-500 mt-2">
                  Please answer all questions before submitting
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// export default EvaluationDetail;