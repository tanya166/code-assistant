import { useState } from 'react';
import { Upload, FileCode, Loader, AlertCircle, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { reviewAPI } from '../services/api';

const GuestReview = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reviewResult, setReviewResult] = useState(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    const allowedExtensions = ['.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c', '.go', '.rs'];
    const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      setError('Please upload a valid code file (.js, .jsx, .ts, .tsx, .py, .java, .cpp, .c, .go, .rs)');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('codeFile', file);

    setLoading(true);
    setError('');

    try {
      const response = await reviewAPI.uploadGuest(formData);
      setReviewResult(response.data.review.analysis_result);
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze code');
    } finally {
      setLoading(false);
    }
  };

  if (reviewResult) {
    const analysis = reviewResult;
    
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Results Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-slate-100 p-3 rounded-lg">
                <FileCode className="text-slate-900" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Code Review Results</h1>
                <p className="text-slate-600 mt-1">Guest Analysis</p>
              </div>
            </div>
            <div className={`text-center px-6 py-4 rounded-xl border-2 ${
              analysis.overallScore >= 8 ? 'text-green-600 bg-green-50 border-green-200' :
              analysis.overallScore >= 6 ? 'text-yellow-600 bg-yellow-50 border-yellow-200' :
              'text-red-600 bg-red-50 border-red-200'
            }`}>
              <p className="text-sm font-medium text-slate-600 mb-1">Overall Score</p>
              <p className="text-4xl font-bold">{analysis.overallScore}/10</p>
            </div>
          </div>

          {analysis.summary && (
            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="text-slate-800 leading-relaxed">{analysis.summary}</p>
            </div>
          )}
        </div>

        {/* Scores Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Readability */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Readability</h2>
              <span className={`text-2xl font-bold px-3 py-1 rounded-lg border ${
                analysis.readability.score >= 8 ? 'text-green-600 bg-green-50 border-green-200' :
                analysis.readability.score >= 6 ? 'text-yellow-600 bg-yellow-50 border-yellow-200' :
                'text-red-600 bg-red-50 border-red-200'
              }`}>
                {analysis.readability.score}/10
              </span>
            </div>

            {analysis.readability.issues && analysis.readability.issues.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">Issues:</h3>
                <ul className="space-y-2">
                  {analysis.readability.issues.map((issue, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-slate-700 text-sm">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.readability.suggestions && analysis.readability.suggestions.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">Suggestions:</h3>
                <ul className="space-y-2">
                  {analysis.readability.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-slate-700 text-sm">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Modularity */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Modularity</h2>
              <span className={`text-2xl font-bold px-3 py-1 rounded-lg border ${
                analysis.modularity.score >= 8 ? 'text-green-600 bg-green-50 border-green-200' :
                analysis.modularity.score >= 6 ? 'text-yellow-600 bg-yellow-50 border-yellow-200' :
                'text-red-600 bg-red-50 border-red-200'
              }`}>
                {analysis.modularity.score}/10
              </span>
            </div>

            {analysis.modularity.issues && analysis.modularity.issues.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">Issues:</h3>
                <ul className="space-y-2">
                  {analysis.modularity.issues.map((issue, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-slate-700 text-sm">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.modularity.suggestions && analysis.modularity.suggestions.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">Suggestions:</h3>
                <ul className="space-y-2">
                  {analysis.modularity.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-slate-700 text-sm">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Potential Bugs */}
        {analysis.potentialBugs && analysis.potentialBugs.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Potential Bugs ({analysis.potentialBugs.length})
            </h2>

            <div className="space-y-4">
              {analysis.potentialBugs.map((bug, idx) => (
                <div key={idx} className={`border rounded-lg p-4 ${
                  bug.severity === 'high' ? 'bg-red-50 border-red-200' :
                  bug.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-semibold text-slate-900 uppercase text-xs">
                      {bug.severity} Severity
                    </span>
                    {bug.line && (
                      <span className="text-xs bg-white px-2 py-1 rounded font-mono text-slate-600">
                        Line {bug.line}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-800 mb-2 font-medium text-sm">{bug.description}</p>
                  {bug.suggestion && (
                    <div className="mt-3 pl-4 border-l-4 border-green-500">
                      <p className="text-sm text-slate-700">
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
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Best Practices</h2>

            <ul className="space-y-3">
              {analysis.bestPractices.map((practice, idx) => (
                <li key={idx} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-900 mt-0.5 font-semibold">→</span>
                  <span className="text-slate-800 text-sm">{practice}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Auth CTA */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-8 text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-3">Want to Save Your Reviews?</h3>
          <p className="text-slate-300 mb-6">
            Create an account to save, track, and compare all your code reviews
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-3 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition font-semibold inline-flex items-center space-x-2"
          >
            <LogIn size={20} />
            <span>Sign Up to Save Reviews</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              setReviewResult(null);
              setFile(null);
            }}
            className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition font-semibold"
          >
            Review Another File
          </button>
          <button
            onClick={() => navigate('/get-started')}
            className="px-6 py-3 bg-white text-slate-900 border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Try Code Review Free
        </h1>
        <p className="text-lg text-slate-600">
          Get instant AI-powered feedback on your code without signing up
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <div
          className={`relative border-3 border-dashed rounded-xl p-12 text-center transition-all ${
            dragActive
              ? 'border-slate-900 bg-slate-50'
              : 'border-slate-300 hover:border-slate-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleChange}
            accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.go,.rs"
          />

          {file ? (
            <div className="space-y-4">
              <FileCode size={64} className="mx-auto text-slate-900" />
              <div>
                <p className="text-lg font-semibold text-slate-900">{file.name}</p>
                <p className="text-sm text-slate-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Remove file
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload size={64} className="mx-auto text-slate-400" />
              <div>
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-slate-900 hover:text-slate-700 font-semibold"
                >
                  Click to upload
                </label>
                <span className="text-slate-600"> or drag and drop</span>
              </div>
              <p className="text-sm text-slate-500">
                Supported: .js, .jsx, .ts, .tsx, .py, .java, .cpp, .c, .go, .rs (max 5MB)
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center space-x-2">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!file || loading}
          className="mt-6 w-full flex justify-center items-center space-x-2 py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? (
            <>
              <Loader className="animate-spin" size={24} />
              <span>Analyzing Code...</span>
            </>
          ) : (
            <>
              <FileCode size={24} />
              <span>Analyze Code</span>
            </>
          )}
        </button>

        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-blue-900 text-sm">
            <span className="font-semibold">💡 Tip:</span> Results are temporary and will not be saved. 
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="ml-1 text-blue-700 hover:text-blue-900 font-semibold underline"
            >
              Create an account
            </button>
            {' '}to save and track your reviews.
          </p>
        </div>
      </form>
    </div>
  );
};

export default GuestReview;