
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Star, TrendingUp, Calendar, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import FundWiseLogo from '@/components/FundWiseLogo';
import { mutualFundsService } from '@/services/mutualFundsService';
import { authService } from '@/utils/auth';

const FundDetails = () => {
  const { schemeCode } = useParams<{ schemeCode: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const user = authService.getCurrentUser();

  const { data: fundDetails, isLoading, error } = useQuery({
    queryKey: ['fundDetails', schemeCode],
    queryFn: () => mutualFundsService.getFundDetails(schemeCode!),
    enabled: !!schemeCode,
  });

  const handleSaveFund = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save mutual funds",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    // Get existing saved funds
    const savedFunds = JSON.parse(localStorage.getItem('savedFunds') || '[]');
    
    if (fundDetails) {
      const fundToSave = {
        schemeCode: fundDetails.meta.scheme_code,
        schemeName: fundDetails.meta.scheme_name,
        fundHouse: fundDetails.meta.fund_house,
        category: fundDetails.meta.scheme_category,
        currentNav: fundDetails.data[0]?.nav || 'N/A',
        savedAt: new Date().toISOString()
      };

      // Check if already saved
      const isAlreadySaved = savedFunds.some((fund: any) => fund.schemeCode === schemeCode);
      
      if (!isAlreadySaved) {
        savedFunds.push(fundToSave);
        localStorage.setItem('savedFunds', JSON.stringify(savedFunds));
        setIsSaved(true);
        
        toast({
          title: "Fund Saved!",
          description: "Added to your saved mutual funds",
        });
      } else {
        toast({
          title: "Already Saved",
          description: "This fund is already in your saved list",
        });
      }
    }
  };

  // Check if fund is already saved
  React.useEffect(() => {
    if (schemeCode && user) {
      const savedFunds = JSON.parse(localStorage.getItem('savedFunds') || '[]');
      const isAlreadySaved = savedFunds.some((fund: any) => fund.schemeCode === schemeCode);
      setIsSaved(isAlreadySaved);
    }
  }, [schemeCode, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading fund details...</p>
        </div>
      </div>
    );
  }

  if (error || !fundDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load fund details</p>
          <Button onClick={() => navigate('/')} variant="outline">
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  const latestNav = fundDetails.data[0];
  const previousNav = fundDetails.data[1];
  const navChange = latestNav && previousNav ? 
    (parseFloat(latestNav.nav) - parseFloat(previousNav.nav)).toFixed(4) : null;
  const navChangePercent = latestNav && previousNav ? 
    (((parseFloat(latestNav.nav) - parseFloat(previousNav.nav)) / parseFloat(previousNav.nav)) * 100).toFixed(2) : null;

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
          
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Fund Header */}
          <Card className="mb-8 border-2 border-blue-200 animate-fade-in">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2 text-gray-800">
                    {fundDetails.meta.scheme_name}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">{fundDetails.meta.scheme_category}</Badge>
                    <Badge variant="outline">{fundDetails.meta.scheme_type}</Badge>
                  </div>
                </div>
                
                <Button 
                  onClick={handleSaveFund}
                  className={`${
                    isSaved 
                      ? 'bg-yellow-500 hover:bg-yellow-600' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  } transition-all duration-300 hover:scale-105`}
                >
                  <Star className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? 'Saved' : 'Save Fund'}
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Fund Info Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Basic Info */}
            <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Building2 className="w-5 h-5 mr-2" />
                  Fund Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Fund House</p>
                  <p className="font-semibold">{fundDetails.meta.fund_house}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Scheme Code</p>
                  <p className="font-semibold">{fundDetails.meta.scheme_code}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="font-semibold">{fundDetails.meta.scheme_start_date}</p>
                </div>
              </CardContent>
            </Card>

            {/* Current NAV */}
            <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Current NAV
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  ₹{latestNav?.nav || 'N/A'}
                </div>
                {navChange && navChangePercent && (
                  <div className={`flex items-center text-sm ${
                    parseFloat(navChange) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {parseFloat(navChange) >= 0 ? '+' : ''}{navChange} ({navChangePercent}%)
                    <span className="text-gray-500 ml-2">vs previous day</span>
                  </div>
                )}
                <div className="text-sm text-gray-600 mt-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  As on {latestNav?.date}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* NAV History */}
          <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle>Recent NAV History</CardTitle>
              <CardDescription>Latest NAV values for the past few days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Date</th>
                      <th className="text-right py-2">NAV (₹)</th>
                      <th className="text-right py-2">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fundDetails.data.slice(0, 10).map((nav, index) => {
                      const prevNav = fundDetails.data[index + 1];
                      const change = prevNav ? (parseFloat(nav.nav) - parseFloat(prevNav.nav)).toFixed(4) : null;
                      
                      return (
                        <tr key={nav.date} className="border-b hover:bg-gray-50">
                          <td className="py-2">{nav.date}</td>
                          <td className="text-right py-2 font-semibold">{nav.nav}</td>
                          <td className={`text-right py-2 ${
                            change ? (parseFloat(change) >= 0 ? 'text-green-600' : 'text-red-600') : ''
                          }`}>
                            {change ? (parseFloat(change) >= 0 ? '+' : '') + change : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FundDetails;
