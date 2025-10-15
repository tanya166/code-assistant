import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { reviewAPI } from '../services/api';
import {
  FileCode,
  TrendingUp,
  BookOpen,
  Package,
  Bug,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Loader,
  ArrowLeft,
} from 'lucide-react';

const ReviewReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReview();
  }, [id]);

  const fetchReview = async () => {
    try {
      const response = await reviewAPI.getById(id);
      setReview(response.data.review);
    } catch (err) {
      setError('Failed to load review');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-100 border-green-300';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100 border-yellow-300';
    return 'text-red-600 bg-red-100 border-red-300';
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <XCircle className="text-red-600" size={20} />;
      case 'medium':
        return <AlertTriangle className="text-yellow-600" size={20} />;
      case 'low':
        return <CheckCircle className="text-blue-600" size={20} />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-300';
      case 'medium':
        return 'bg-yellow-50 border-yellow-300';
      case 'low':
        return 'bg-blue-50 border-blue-300';
      default:
        return 'bg-gray-50 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin text-purple-600" size={48} />
      </div>
    );
  }

  if (error || !review) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error || 'Review not found'}
        </div>
      </div>
    );
  }

  const analysis = review.analysis_result;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/history')}
        className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 mb-6 font-medium"
      >
        <ArrowLeft size={20} />
        <span>Back to History</span>
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <FileCode className="text-purple-600" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{review.filename}</h1>
              <p className="text-gray-600 mt-1">
                Language: <span className="font-semibold uppercase">{review.language}</span>
              </p>
            </div>
          </div>
          <div className={`text-center px-6 py-4 rounded-xl border-2 ${getScoreColor(analysis.overallScore)}`}>
            <p className="text-sm font-medium mb-1">Overall Score</p>
            <p className="text-4xl font-bold">{analysis.overallScore}/10</p>
          </div>
        </div>

        {/* Summary */}
        {analysis.summary && (
          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-gray-800 leading-relaxed">{analysis.summary}</p>
          </div>
        )}
      </div>

      {/* Scores Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Readability */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="text-blue-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-900">Readability</h2>
            </div>
            <span className={`text-2xl font-bold px-4 py-2 rounded-lg ${getScoreColor(analysis.readability.score)}`}>
              {analysis.readability.score}/10
            </span>
          </div>

          {analysis.readability.issues && analysis.readability.issues.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Issues:</h3>
              <ul className="space-y-2">
                {analysis.readability.issues.map((issue, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.readability.suggestions && analysis.readability.suggestions.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Suggestions:</h3>
              <ul className="space-y-2">
                {analysis.readability.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modularity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Package className="text-indigo-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-900">Modularity</h2>
            </div>
            <span className={`text-2xl font-bold px-4 py-2 rounded-lg ${getScoreColor(analysis.modularity.score)}`}>
              {analysis.modularity.score}/10
            </span>
          </div>

          {analysis.modularity.issues && analysis.modularity.issues.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Issues:</h3>
              <ul className="space-y-2">
                {analysis.modularity.issues.map((issue, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.modularity.suggestions && analysis.modularity.suggestions.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Suggestions:</h3>
              <ul className="space-y-2">
                {analysis.modularity.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Potential Bugs */}
      {analysis.potentialBugs && analysis.potentialBugs.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Bug className="text-red-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">
              Potential Bugs ({analysis.potentialBugs.length})
            </h2>
          </div>

          <div className="space-y-4">
            {analysis.potentialBugs.map((bug, idx) => (
              <div key={idx} className={`border-2 rounded-lg p-4 ${getSeverityColor(bug.severity)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getSeverityIcon(bug.severity)}
                    <span className="font-semibold text-gray-900 uppercase text-sm">
                      {bug.severity} Severity
                    </span>
                  </div>
                  {bug.line && (
                    <span className="text-sm bg-white px-3 py-1 rounded-full font-mono">
                      Line {bug.line}
                    </span>
                  )}
                </div>
                <p className="text-gray-800 mb-2 font-medium">{bug.description}</p>
                {bug.suggestion && (
                  <div className="mt-2 pl-4 border-l-4 border-green-500">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Fix: </span>
                      {bug.suggestion}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Practices */}
      {analysis.bestPractices && analysis.bestPractices.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="text-green-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">Best Practices</h2>
          </div>

          <ul className="space-y-3">
            {analysis.bestPractices.map((practice, idx) => (
              <li key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-purple-600 mt-1">→</span>
                <span className="text-gray-800">{practice}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition font-medium"
        >
          Review Another File
        </button>
        <button
          onClick={() => navigate('/history')}
          className="px-6 py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-lg hover:bg-purple-50 transition font-medium"
        >
          View All Reviews
        </button>
      </div>
    </div>
  );
};

export default ReviewReport;