import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { reviewAPI } from '../../../client/src/services/api';
import { FileCode, Clock, TrendingUp, Loader, AlertCircle } from 'lucide-react';

const ReviewHistory = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await reviewAPI.getAll();
      setReviews(response.data.reviews);
    } catch (err) {
      setError('Failed to load review history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin text-purple-600" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Review History</h1>
        <p className="text-lg text-gray-600">
          View all your past code reviews and their analysis results
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <FileCode size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No reviews yet
          </h3>
          <p className="text-gray-600 mb-6">
            Upload your first code file to get started with AI-powered reviews
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition font-medium"
          >
            Upload Code
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              onClick={() => navigate(`/review/${review.id}`)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <FileCode className="text-purple-600" size={24} />
                    <h3 className="text-xl font-semibold text-gray-900">
                      {review.filename}
                    </h3>
                    <span className="text-sm text-gray-500 uppercase bg-gray-100 px-3 py-1 rounded-full">
                      {review.language}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{formatDate(review.created_at)}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <TrendingUp size={18} className="text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Overall Score:
                      </span>
                      <span
                        className={`text-lg font-bold px-3 py-1 rounded-full ${getScoreColor(
                          review.overall_score
                        )}`}
                      >
                        {review.overall_score}/10
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <div>
                        <span className="text-gray-600">Readability: </span>
                        <span className="font-semibold text-gray-900">
                          {review.readability_score}/10
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Modularity: </span>
                        <span className="font-semibold text-gray-900">
                          {review.modularity_score}/10
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Bugs Found: </span>
                        <span className="font-semibold text-red-600">
                          {review.bugs_count || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-4">
                  <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewHistory;