
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FundWiseLogo from '../FundWiseLogo';
import { authService } from '@/utils/auth';
import { useToast } from '@/hooks/use-toast';
import { LogOut, TrendingUp, DollarSign, PieChart, Activity } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const user = authService.getCurrentUser();
  const { toast } = useToast();

  const handleLogout = () => {
    authService.logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <FundWiseLogo className="w-8 h-8" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FundWise
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.name}</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Manage your financial portfolio and investments</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">$45,231.89</div>
              <p className="text-xs text-blue-600">+20.1% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Active Investments</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">12</div>
              <p className="text-xs text-green-600">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Portfolio Value</CardTitle>
              <PieChart className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">$38,542.12</div>
              <p className="text-xs text-purple-600">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">Monthly Return</CardTitle>
              <Activity className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">+8.2%</div>
              <p className="text-xs text-orange-600">Above market average</p>
            </CardContent>
          </Card>
        </div>

        {/* Welcome Message */}
        <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop&auto=format"
                  alt="Financial Success"
                  className="rounded-lg mx-auto max-w-sm opacity-80"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to your FundWise Dashboard! 🎉
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                You've successfully logged into FundWise! This is your financial command center where you can 
                monitor your investments, track portfolio performance, and make informed financial decisions. 
                Your journey to financial freedom starts here.
              </p>
              <div className="flex justify-center space-x-4">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Start Investing
                </Button>
                <Button variant="outline">
                  View Portfolio
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
