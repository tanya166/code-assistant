import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Code, Sparkles, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const featuresRef = useRef(null);

  if (token) {
    navigate('/dashboard');
    return null;
  }

  const handleLearnMore = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze your code for quality and best practices"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Bug Detection",
      description: "Identify potential bugs and security vulnerabilities before they reach production"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Feedback",
      description: "Get comprehensive code reviews in seconds, not hours or days"
    }
  ];

  const benefits = [
    "Improve code readability and maintainability",
    "Detect bugs and security issues early",
    "Learn best practices from AI recommendations",
    "Save time with automated reviews",
    "Track your code quality over time"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.href = '/'}>
              <Code className="w-8 h-8 text-slate-900" />
              <span className="text-xl font-bold text-slate-900">CodeReview</span>
            </div>
            <button
              onClick={() => navigate('/get-started')}
              className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-semibold"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-full text-sm font-semibold text-slate-900 mb-8">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Code Review Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Intelligent Code Reviews,
            <span className="block text-slate-700"> Instant Feedback</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Get instant, comprehensive code reviews powered by advanced AI. 
            Improve readability, catch bugs, and learn best practices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/get-started')}
              className="px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>Start Reviewing</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={handleLearnMore}
              className="px-8 py-4 bg-slate-100 text-slate-900 rounded-lg hover:bg-slate-200 transition-all font-semibold text-lg border-2 border-slate-200"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Code Preview */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-800 px-4 py-3 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-sm text-slate-300 font-mono">example.js</span>
            </div>
            <div className="p-6 bg-slate-900 font-mono text-sm">
              <div className="text-slate-400">
                <span className="text-blue-400">function</span> <span className="text-green-400">calculateTotal</span>(items) {'{'}
              </div>
              <div className="pl-4 text-slate-400">
                <span className="text-blue-400">return</span> items.reduce((sum, item) =&gt; sum + item.price, <span className="text-orange-400">0</span>);
              </div>
              <div className="text-slate-400">{'}'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why Choose CodeReview?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Transform your code review process with cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-900 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Everything You Need for Better Code
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Our comprehensive code review platform helps you write cleaner, 
                more maintainable code while catching issues before they become problems.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-slate-900 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-slate-600">Overall Score</span>
                    <span className="text-3xl font-bold text-slate-900">8.5/10</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900 w-4/5"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 font-medium">Readability</span>
                    <span className="font-bold text-slate-900">9/10</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-9/10"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 font-medium">Modularity</span>
                    <span className="font-bold text-slate-900">8/10</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-4/5"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 font-medium">Bugs Found</span>
                    <span className="font-bold text-red-600">2</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-1/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Improve Your Code?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of developers who trust CodeReview for their code analysis
          </p>
          <button
            onClick={() => navigate('/get-started')}
            className="px-8 py-4 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-all font-semibold text-lg inline-flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Code className="w-6 h-6 text-slate-900" />
              <span className="font-bold text-slate-900">CodeReview</span>
            </div>
            <p className="text-slate-600 text-sm">
              © 2025 CodeReview. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}