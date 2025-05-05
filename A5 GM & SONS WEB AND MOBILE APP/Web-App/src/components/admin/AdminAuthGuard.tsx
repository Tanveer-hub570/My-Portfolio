
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Outlet } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Lock } from 'lucide-react';

const AdminAuthGuard = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access admin area.",
        variant: "destructive",
      });
      navigate('/login');
    } else if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this area.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, navigate, toast]);

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Lock className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold text-center">Admin Area</h1>
        <p className="text-muted-foreground">You need admin privileges to access this area.</p>
      </div>
    );
  }

  return <Outlet />;
};

export default AdminAuthGuard;
