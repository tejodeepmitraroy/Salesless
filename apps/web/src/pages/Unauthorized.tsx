
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

const Unauthorized = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <ShieldAlert className="h-16 w-16 text-red-500 mx-auto mb-4" />
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        
        <p className="text-gray-600 mb-6">
          {user 
            ? `Sorry, your account (${user.role}) doesn't have permission to access this page.` 
            : "You need to be logged in to access this page."}
        </p>
        
        <div className="flex flex-col space-y-2">
          <Button asChild variant="default">
            <Link to="/" className="flex items-center justify-center">
              <Home className="mr-2 h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link to="/login" className="flex items-center justify-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </Button>
          
          {user && (
            <Button 
              variant="ghost" 
              onClick={logout}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
