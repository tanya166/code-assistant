
import { useNavigate } from 'react-router-dom';
import { Code, LogIn, UserPlus, ArrowLeft } from 'lucide-react';

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Code className="w-12 h-12 text-slate-800" />
            <span className="text-3xl font-bold text-slate-900">CodeReview</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-3">Welcome</h2>
          <p className="text-lg text-slate-600">Choose an option to continue</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/login')}
            className="w-full py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
          >
            <LogIn size={24} />
            <span>Sign In</span>
          </button>
          
          <button
            onClick={() => navigate('/register')}
            className="w-full py-4 bg-white text-slate-900 rounded-xl hover:bg-slate-50 transition-all font-semibold text-lg border-2 border-slate-200 flex items-center justify-center space-x-3"
          >
            <UserPlus size={24} />
            <span>Create Account</span>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;