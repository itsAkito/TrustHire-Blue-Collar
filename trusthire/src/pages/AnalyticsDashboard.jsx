import React, { useState } from 'react';
import { Star, MessageSquare, Eye, TrendingUp } from 'lucide-react';

const AnalyticsDashboard = () => {
  const [selectedWorker, setSelectedWorker] = useState(null);

  // Mock analytics data
  const analyticsData = [
    {
      id: 1,
      name: 'Raj Kumar',
      role: 'Electrical Specialist',
      rating: 4.9,
      reviews: 28,
      views: 1250,
      comments: 145,
      trend: '+15%',
      recentReviews: [
        { author: 'Suresh Patel', rating: 5, comment: 'Excellent work quality', date: 'Feb 3' },
        { author: 'Priya Sharma', rating: 5, comment: 'Very professional', date: 'Feb 2' },
        { author: 'Amit Singh', rating: 4, comment: 'Good service', date: 'Feb 1' },
      ]
    },
    {
      id: 2,
      name: 'Priya Singh',
      role: 'Plumbing Expert',
      rating: 4.8,
      reviews: 34,
      views: 1890,
      comments: 201,
      trend: '+22%',
      recentReviews: [
        { author: 'Neha Gupta', rating: 5, comment: 'Reliable service', date: 'Feb 3' },
        { author: 'Vikram Kumar', rating: 5, comment: 'Punctual and professional', date: 'Feb 2' },
        { author: 'Isha Verma', rating: 4, comment: 'Good value for money', date: 'Jan 31' },
      ]
    },
    {
      id: 3,
      name: 'Amit Patel',
      role: 'Carpentry Expert',
      rating: 4.7,
      reviews: 42,
      views: 2100,
      comments: 267,
      trend: '+18%',
      recentReviews: [
        { author: 'Rajesh Kumar', rating: 5, comment: 'Amazing craftsmanship', date: 'Feb 3' },
        { author: 'Divya Sharma', rating: 4, comment: 'Good quality work', date: 'Feb 1' },
        { author: 'Karan Singh', rating: 5, comment: 'Exceeded expectations', date: 'Jan 30' },
      ]
    },
    {
      id: 4,
      name: 'Neha Patel',
      role: 'Painting Specialist',
      rating: 4.6,
      reviews: 19,
      views: 856,
      comments: 98,
      trend: '+12%',
      recentReviews: [
        { author: 'Anita Singh', rating: 5, comment: 'Best painter in town', date: 'Feb 2' },
        { author: 'Rohit Kumar', rating: 4, comment: 'Professional work', date: 'Jan 29' },
        { author: 'Sunita Verma', rating: 5, comment: 'High quality finish', date: 'Jan 28' },
      ]
    },
  ];

  return (
    <div className="space-y-8">
      {/* Analytics Overview */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Worker Analytics & Reviews</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Worker Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">Top Performers</h3>
            {analyticsData.map(worker => (
              <button
                key={worker.id}
                onClick={() => setSelectedWorker(worker)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedWorker?.id === worker.id
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-slate-700 bg-slate-800/40 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-white">{worker.name}</h4>
                    <p className="text-sm text-slate-400 mb-2">{worker.role}</p>
                    
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      <div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-white font-bold">{worker.rating}</span>
                        </div>
                        <p className="text-xs text-slate-400">{worker.reviews} reviews</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-blue-400" />
                          <span className="text-white font-bold">{worker.views}</span>
                        </div>
                        <p className="text-xs text-slate-400">views</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-cyan-400" />
                          <span className="text-white font-bold">{worker.comments}</span>
                        </div>
                        <p className="text-xs text-slate-400">comments</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    <span className="text-green-400 font-bold text-sm">{worker.trend}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detailed View */}
          <div>
            {selectedWorker ? (
              <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 space-y-4">
                <div className="text-center pb-4 border-b border-slate-700">
                  <h3 className="text-xl font-bold text-white">{selectedWorker.name}</h3>
                  <p className="text-cyan-400">{selectedWorker.role}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-slate-300 flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      Rating
                    </span>
                    <span className="text-white font-bold">{selectedWorker.rating} / 5.0</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-slate-300 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-cyan-400" />
                      Total Reviews
                    </span>
                    <span className="text-white font-bold">{selectedWorker.reviews}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-slate-300 flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-400" />
                      Profile Views
                    </span>
                    <span className="text-white font-bold">{selectedWorker.views}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <span className="text-slate-300 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      Growth
                    </span>
                    <span className="text-green-400 font-bold">{selectedWorker.trend}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <h4 className="font-semibold text-white mb-3">Recent Reviews</h4>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {selectedWorker.recentReviews.map((review, idx) => (
                      <div key={idx} className="p-3 bg-slate-700/30 rounded-lg text-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-white">{review.author}</span>
                          <span className="text-xs text-slate-400">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {Array(review.rating).fill(0).map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                        <p className="text-slate-300">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-8 flex items-center justify-center h-full">
                <p className="text-slate-400 text-center">Select a worker to view detailed analytics</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-cyan-400 mb-1">156</div>
          <p className="text-slate-400 text-sm">Total Reviews</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-1">6,096</div>
          <p className="text-slate-400 text-sm">Total Views</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-cyan-400 mb-1">711</div>
          <p className="text-slate-400 text-sm">Total Comments</p>
        </div>
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-400 mb-1">4.75</div>
          <p className="text-slate-400 text-sm">Avg Rating</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
