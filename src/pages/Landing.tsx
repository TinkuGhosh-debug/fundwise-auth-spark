
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, TrendingUp, Star, Filter, Sparkles, BarChart3, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FundWiseLogo from '@/components/FundWiseLogo';
import { mutualFundsService } from '@/services/mutualFundsService';
import { authService } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [popularSearches] = useState([
    'SBI Bluechip Fund',
    'HDFC Top 100',
    'Axis Long Term Equity',
    'ICICI Prudential',
    'Mirae Asset',
    'Parag Parikh Flexi Cap'
  ]);
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ['mutualFunds', searchQuery],
    queryFn: () => mutualFundsService.searchFunds(searchQuery),
    enabled: showResults,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowResults(true);
    }
  };

  const handlePopularSearch = (query: string) => {
    setSearchQuery(query);
    setShowResults(true);
  };

  const handleFundClick = (schemeCode: string) => {
    navigate(`/fund/${schemeCode}`);
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleSavedFunds = () => {
    navigate('/saved-funds');
  };

  const handleFeatureClick = (feature: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    // For now, we'll show different search queries based on the feature
    switch (feature) {
      case 'analysis':
        setSearchQuery('large cap equity');
        setShowResults(true);
        break;
      case 'favorites':
        navigate('/saved-funds');
        break;
      case 'filters':
        setSearchQuery('ELSS tax saving');
        setShowResults(true);
        break;
    }
  };

  // Auto-search popular funds on load for demo
  useEffect(() => {
    if (!showResults && !searchQuery) {
      setTimeout(() => {
        setSearchQuery('SBI');
        setShowResults(true);
      }, 2000);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 animate-fade-in">
            <FundWiseLogo className="w-10 h-10" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FundWise
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="outline" onClick={handleSavedFunds} className="hover:scale-105 transition-transform">
                  <Star className="w-4 h-4 mr-2" />
                  Saved Funds ({JSON.parse(localStorage.getItem('savedFunds') || '[]').length})
                </Button>
                <Button variant="outline" onClick={() => navigate('/auth')}>
                  {user.name}
                </Button>
              </>
            ) : (
              <Button onClick={handleAuthClick} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        {!showResults && (
          <div className="text-center py-16 animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Discover Your Perfect Mutual Fund
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Search through thousands of mutual funds, analyze performance, and build your investment portfolio with FundWise
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Try searching: SBI Bluechip, HDFC Top 100, Large Cap Funds..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-24 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 hover:border-gray-300 transition-all duration-300 shadow-lg group-hover:shadow-xl"
                  />
                  <Button 
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-6"
                  >
                    Search
                  </Button>
                </div>
              </form>

              {/* Popular Searches */}
              <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <p className="text-gray-600 mb-4">Popular searches:</p>
                <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                  {popularSearches.map((search, index) => (
                    <Button
                      key={search}
                      variant="outline"
                      size="sm"
                      onClick={() => handlePopularSearch(search)}
                      className="hover:scale-105 transition-all duration-300 hover:bg-blue-50 animate-fade-in"
                      style={{ animationDelay: `${0.1 * index}s` }}
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Feature Cards */}
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card 
                  className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 cursor-pointer group"
                  onClick={() => handleFeatureClick('analysis')}
                >
                  <CardHeader>
                    <div className="relative">
                      <TrendingUp className="w-8 h-8 text-blue-600 mx-auto group-hover:scale-110 transition-transform" />
                      <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
                    </div>
                    <CardTitle className="text-center text-blue-800">Smart Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      Get detailed insights, NAV trends, and performance analytics for every mutual fund with AI-powered recommendations
                    </CardDescription>
                    <div className="mt-4 flex justify-center">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-200">
                        Try Analysis →
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  className="border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 cursor-pointer group"
                  onClick={() => handleFeatureClick('favorites')}
                >
                  <CardHeader>
                    <div className="relative">
                      <Star className="w-8 h-8 text-purple-600 mx-auto group-hover:scale-110 transition-transform" />
                      <Heart className="w-4 h-4 text-red-500 absolute -top-1 -right-1 animate-pulse" />
                    </div>
                    <CardTitle className="text-center text-purple-800">Save Favorites</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      Save and track your favorite mutual funds, get alerts on NAV changes, and build your personalized watchlist
                    </CardDescription>
                    <div className="mt-4 flex justify-center">
                      <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-200">
                        View Saved →
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card 
                  className="border-2 border-cyan-200 hover:border-cyan-400 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-cyan-50 to-cyan-100 cursor-pointer group"
                  onClick={() => handleFeatureClick('filters')}
                >
                  <CardHeader>
                    <div className="relative">
                      <Filter className="w-8 h-8 text-cyan-600 mx-auto group-hover:scale-110 transition-transform" />
                      <BarChart3 className="w-4 h-4 text-green-500 absolute -top-1 -right-1 animate-pulse" />
                    </div>
                    <CardTitle className="text-center text-cyan-800">Advanced Filters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      Filter funds by category, risk level, returns, fund house, and investment goals to find perfect matches
                    </CardDescription>
                    <div className="mt-4 flex justify-center">
                      <Button variant="ghost" size="sm" className="text-cyan-600 hover:bg-cyan-200">
                        Explore Filters →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {showResults && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowResults(false)}
                  className="hover:scale-105 transition-transform"
                >
                  ← Back to Search
                </Button>
                <h3 className="text-2xl font-bold text-gray-800">
                  Search Results for "{searchQuery}"
                </h3>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-lg px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100">
                  {searchResults?.length || 0} funds found
                </Badge>
                {user && (
                  <Button variant="outline" size="sm" onClick={handleSavedFunds}>
                    <Star className="w-4 h-4 mr-1" />
                    Saved ({JSON.parse(localStorage.getItem('savedFunds') || '[]').length})
                  </Button>
                )}
              </div>
            </div>

            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Searching mutual funds...</p>
                <p className="text-gray-500 text-sm mt-2">Finding the best investment options for you</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-red-600 mb-4">Failed to search mutual funds</p>
                  <p className="text-red-500 text-sm mb-4">Please check your internet connection and try again</p>
                  <Button onClick={() => setShowResults(false)} variant="outline">
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {searchResults && (
              <div className="grid gap-4">
                {searchResults.map((fund, index) => (
                  <Card 
                    key={fund.schemeCode}
                    className="hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] border-l-4 border-l-gradient-to-b from-blue-500 to-purple-500 animate-fade-in bg-gradient-to-r from-white to-blue-50/30 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleFundClick(fund.schemeCode)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-lg text-gray-800 line-clamp-2 group-hover:text-blue-700 transition-colors">
                              {fund.schemeName}
                            </h4>
                            <Badge variant="outline" className="text-xs bg-blue-50">
                              NAV
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Scheme Code: {fund.schemeCode}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Performance tracking
                            </span>
                            <span className="flex items-center">
                              <BarChart3 className="w-3 h-3 mr-1" />
                              Detailed analysis
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <Button variant="outline" size="sm" className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 group-hover:scale-105 transition-all">
                            View Details →
                          </Button>
                          <p className="text-xs text-gray-500 mt-2">Click to see NAV & save</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {searchResults.length === 0 && (
                  <div className="text-center py-12">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                      <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No mutual funds found</p>
                      <p className="text-gray-500 text-sm mb-4">Try searching with different keywords like fund house names or fund categories</p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Suggestions:</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {popularSearches.slice(0, 3).map((search) => (
                            <Button 
                              key={search}
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handlePopularSearch(search)}
                              className="text-blue-600 hover:bg-blue-50"
                            >
                              {search}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
