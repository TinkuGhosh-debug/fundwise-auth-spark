
import React from 'react';
import FundWiseLogo from '../FundWiseLogo';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Shield, DollarSign } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s' }} />
      <div className="absolute top-40 right-32 w-16 h-16 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '5s' }} />
      <div className="absolute bottom-32 left-32 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '3s', animationDuration: '6s' }} />
      <div className="absolute top-1/2 right-20 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '4.5s' }} />

      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/20 animate-fade-in">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <FundWiseLogo className="w-24 h-24 hover:scale-110 transition-transform duration-500" />
            </div>

            {/* Welcome Text */}
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4 animate-fade-in">
              Welcome to FundWise
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Your intelligent fintech partner for smarter investments, seamless transactions, and financial growth. 
              Join thousands of users who trust FundWise for their financial journey.
            </p>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 hover:scale-105 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Smart Investing</h3>
                <p className="text-sm text-gray-600">AI-powered investment recommendations tailored to your goals</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 hover:scale-105 transition-transform duration-300">
                <Shield className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Bank-Level Security</h3>
                <p className="text-sm text-gray-600">256-bit encryption and multi-factor authentication</p>
              </div>
              
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-2xl border border-cyan-200 hover:scale-105 transition-transform duration-300">
                <DollarSign className="w-8 h-8 text-cyan-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Zero Fees</h3>
                <p className="text-sm text-gray-600">No hidden charges, transparent pricing structure</p>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 animate-fade-in"
              style={{ animationDelay: '0.6s' }}
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* Trust Indicators */}
            <div className="mt-8 flex justify-center items-center space-x-8 text-gray-500 text-sm animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>FDIC Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span>SEC Regulated</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span>SOC 2 Compliant</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="mt-8 animate-fade-in" style={{ animationDelay: '1s' }}>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format"
                alt="Financial Technology Dashboard"
                className="rounded-2xl shadow-lg mx-auto max-w-md opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
