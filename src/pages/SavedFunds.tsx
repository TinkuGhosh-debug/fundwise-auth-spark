
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Trash2, TrendingUp, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import FundWiseLogo from '@/components/FundWiseLogo';
import { authService } from '@/utils/auth';

interface SavedFund {
  schemeCode: string;
  schemeName: string;
  fundHouse: string;
  category: string;
  currentNav: string;
  savedAt: string;
}

const SavedFunds = () => {
  const [savedFunds, setSavedFunds] = useState<SavedFund[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Load saved funds from localStorage
    const saved = JSON.parse(localStorage.getItem('savedFunds') || '[]');
    setSavedFunds(saved);
  }, [user, navigate]);

  const handleRemoveFund = (schemeCode: string) => {
    const updatedFunds = savedFunds.filter(fund => fund.schemeCode !== schemeCode);
    setSavedFunds(updatedFunds);
    localStorage.setItem('savedFunds', JSON.stringify(updatedFunds));
    
    toast({
      title: "Fund Removed",
      description: "Removed from your saved mutual funds",
    });
  };

  const handleViewDetails = (schemeCode: string) => {
    navigate(`/fund/${schemeCode}`);
  };

  if (!user) {
    return null;
  }

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
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
            <Button variant="outline" onClick={() => navigate('/auth')}>
              {user.name}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Your Saved Mutual Funds
            </h2>
            <p className="text-xl text-gray-600">
              Track and manage your favorite mutual fund investments
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 animate-fade-in">
              <CardHeader className="text-center">
                <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-blue-800">Total Saved</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-blue-900">{savedFunds.length}</p>
                <p className="text-sm text-blue-700">Mutual Funds</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-purple-800">Categories</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-purple-900">
                  {new Set(savedFunds.map(fund => fund.category)).size}
                </p>
                <p className="text-sm text-purple-700">Different Types</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-cyan-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="text-center">
                <Badge className="w-8 h-8 text-cyan-600 mx-auto mb-2 flex items-center justify-center">₹</Badge>
                <CardTitle className="text-cyan-800">Portfolio</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-cyan-900">Active</p>
                <p className="text-sm text-cyan-700">Tracking</p>
              </CardContent>
            </Card>
          </div>

          {/* Saved Funds List */}
          {savedFunds.length === 0 ? (
            <Card className="text-center py-12 animate-fade-in">
              <CardContent>
                <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Saved Funds Yet</h3>
                <p className="text-gray-500 mb-6">Start building your portfolio by saving mutual funds</p>
                <Button onClick={() => navigate('/')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Discover Mutual Funds
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {savedFunds.map((fund, index) => (
                <Card 
                  key={fund.schemeCode}
                  className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-yellow-500 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-lg text-gray-800 mr-4 line-clamp-2">
                            {fund.schemeName}
                          </h4>
                          <div className="text-right">
                            <p className="text-xl font-bold text-green-600">₹{fund.currentNav}</p>
                            <p className="text-sm text-gray-500">Current NAV</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary">{fund.category}</Badge>
                          <Badge variant="outline">{fund.fundHouse}</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600">
                            Saved on {new Date(fund.savedAt).toLocaleDateString()}
                          </p>
                          
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewDetails(fund.schemeCode)}
                              className="hover:bg-blue-50"
                            >
                              View Details
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRemoveFund(fund.schemeCode)}
                              className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedFunds;
