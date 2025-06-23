
import React, { useState } from 'react';
import WelcomeScreen from '@/components/auth/WelcomeScreen';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import Dashboard from '@/components/auth/Dashboard';
import { authService } from '@/utils/auth';
import { useToast } from '@/hooks/use-toast';

type AuthView = 'welcome' | 'login' | 'signup' | 'dashboard';

const Auth = () => {
  const [currentView, setCurrentView] = useState<AuthView>(() => {
    return authService.isAuthenticated() ? 'dashboard' : 'welcome';
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await authService.login(email, password);
      toast({
        title: "Welcome Back!",
        description: "You have successfully logged in to FundWise",
      });
      setCurrentView('dashboard');
    } catch (error) {
      throw error; // Let the form handle the error display
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      await authService.signup(email, password, name);
      toast({
        title: "Account Created!",
        description: "Welcome to FundWise! Your account has been created successfully",
      });
      setCurrentView('dashboard');
    } catch (error) {
      throw error; // Let the form handle the error display
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await authService.googleAuth();
      toast({
        title: "Welcome to FundWise!",
        description: "You have successfully signed in with Google",
      });
      setCurrentView('dashboard');
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "Unable to sign in with Google. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubAuth = async () => {
    setIsLoading(true);
    try {
      await authService.githubAuth();
      toast({
        title: "Welcome to FundWise!",
        description: "You have successfully signed in with GitHub",
      });
      setCurrentView('dashboard');
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "Unable to sign in with GitHub. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentView('welcome');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={() => setCurrentView('login')} />;
      
      case 'login':
        return (
          <AuthLayout 
            title="Welcome Back" 
            subtitle="Sign in to your FundWise account and continue your financial journey"
          >
            <LoginForm
              onSwitchToSignup={() => setCurrentView('signup')}
              onLogin={handleLogin}
              onGoogleAuth={handleGoogleAuth}
              onGithubAuth={handleGithubAuth}
              isLoading={isLoading}
            />
          </AuthLayout>
        );
      
      case 'signup':
        return (
          <AuthLayout 
            title="Join FundWise" 
            subtitle="Create your account and start building your financial future today"
          >
            <SignupForm
              onSwitchToLogin={() => setCurrentView('login')}
              onSignup={handleSignup}
              onGoogleAuth={handleGoogleAuth}
              onGithubAuth={handleGithubAuth}
              isLoading={isLoading}
            />
          </AuthLayout>
        );
      
      case 'dashboard':
        return <Dashboard onLogout={handleLogout} />;
      
      default:
        return <WelcomeScreen onGetStarted={() => setCurrentView('login')} />;
    }
  };

  return renderCurrentView();
};

export default Auth;
