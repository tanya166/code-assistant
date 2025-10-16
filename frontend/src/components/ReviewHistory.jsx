import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { reviewAPI } from '../services/api';
import { FileCode, Clock, TrendingUp, Loader, AlertCircle, ArrowRight } from 'lucide-react';

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
    if (score >= 8) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
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
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader className="animate-spin text-slate-900" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Review History</h1>
        <p className="text-lg text-slate-600">
          Track all your code reviews and monitor your progress
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center space-x-2 mb-6">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-slate-200">
          <FileCode size={64} className="mx-auto text-slate-400 mb-4" />
          <h3 className="text-2xl font-semibold text-slate-900 mb-2">
            No reviews yet
          </h3>
          <p className="text-slate-600 mb-6 text-lg">
            Upload your first code file to get started with AI-powered analysis
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition font-semibold inline-flex items-center space-x-2"
          >
            <span>Upload Code</span>
            <ArrowRight size={20} />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              onClick={() => navigate(`/review/${review.id}`)}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer p-6 border border-slate-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <FileCode className="text-slate-700 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {review.filename}
                      </h3>
                      <span className="text-xs text-slate-500 uppercase bg-slate-100 px-2 py-1 rounded inline-block mt-1">
                        {review.language}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-slate-600 mb-4">
                    <Clock size={16} />
                    <span>{formatDate(review.created_at)}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${getScoreColor(review.overall_score)}`}>
                      <TrendingUp size={16} />
                      <span className="font-semibold">
                        {review.overall_score}/10
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <div>
                        <span className="text-slate-600">Readability: </span>
                        <span className="font-semibold text-slate-900">
                          {review.readability_score}/10
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-600">Modularity: </span>
                        <span className="font-semibold text-slate-900">
                          {review.modularity_score}/10
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-600">Bugs: </span>
                        <span className="font-semibold text-red-600">
                          {review.bugs_count || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="ml-4 flex-shrink-0 px-4 py-2 bg-slate-100 text-slate-900 rounded-lg hover:bg-slate-200 transition font-medium text-sm">
                  View →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewHistory;