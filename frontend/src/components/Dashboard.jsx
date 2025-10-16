
import { useState } from 'react';
import { Upload, FileCode, Loader } from 'lucide-react';
import { reviewAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
      const response = await reviewAPI.upload(formData);
      navigate(`/review/${response.data.review.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Upload Your Code for Review
        </h1>
        <p className="text-lg text-slate-600">
          Get instant AI-powered feedback on readability, modularity, and potential bugs
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
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            {error}
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

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate('/history')}
            className="text-slate-900 hover:text-slate-700 font-medium"
          >
            View Review History →
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;