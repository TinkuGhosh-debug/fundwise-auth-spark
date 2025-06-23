
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, TrendingUp, Star, Filter } from 'lucide-react';
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

  const handleFundClick = (schemeCode: string) => {
    navigate(`/fund/${schemeCode}`);
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleSavedFunds = () => {
    navigate('/saved-funds');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
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
                  Saved Funds
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
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search mutual funds by name, fund house, or category..."
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

              {/* Feature Cards */}
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardHeader>
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto" />
                    <CardTitle className="text-center text-blue-800">Smart Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      Get detailed insights and performance analytics for every mutual fund
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100">
                  <CardHeader>
                    <Star className="w-8 h-8 text-purple-600 mx-auto" />
                    <CardTitle className="text-center text-purple-800">Save Favorites</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      Save and track your favorite mutual funds in one place
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border-2 border-cyan-200 hover:border-cyan-400 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-cyan-50 to-cyan-100">
                  <CardHeader>
                    <Filter className="w-8 h-8 text-cyan-600 mx-auto" />
                    <CardTitle className="text-center text-cyan-800">Advanced Filters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      Filter funds by category, performance, and investment goals
                    </CardDescription>
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
              
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {searchResults?.length || 0} funds found
              </Badge>
            </div>

            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Searching mutual funds...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">Failed to search mutual funds</p>
                <Button onClick={() => setShowResults(false)} variant="outline">
                  Try Again
                </Button>
              </div>
            )}

            {searchResults && (
              <div className="grid gap-4">
                {searchResults.map((fund, index) => (
                  <Card 
                    key={fund.schemeCode}
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] border-l-4 border-l-blue-500 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleFundClick(fund.schemeCode)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                            {fund.schemeName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Scheme Code: {fund.schemeCode}
                          </p>
                        </div>
                        <div className="ml-4">
                          <Button variant="outline" size="sm" className="hover:bg-blue-50">
                            View Details →
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
